///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/sharepoint/SharePoint.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/moment-timezone/moment-timezone.d.ts" />
///<reference path="IsCurrentUserMemberOfGroup.ts" />
///<reference path="getCurrentUser.ts" />
///<reference path="typings/jqueryui/jqueryui.d.ts" />
///<reference path="typings/jquery.validation/jquery.validation.d.ts" />
"use strict";
var context = null;
var web = null;
var currentUserId = null;
var listIdNewClaims = "416125a4-154d-48ef-8403-d0e448c221ec";
var listIdAcceptedClaims = "96b8b010-bc84-42d4-a6b7-c2d584e4b87f";
var listIdResolvedClaims = "ba62ba90-6c45-44dd-b236-2b2e37d01fbe";
var itemType;
var appWebUrl, hostWebUrl;
$(document).ready(function () {
    hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    console.log(hostWebUrl + " hostWebUrl");
    appWebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    console.log(appWebUrl + " appWebUrl");
    var scriptbase = hostWebUrl + "/_layouts/15/";
    console.log(scriptbase);
    SP.SOD.registerSod("sp.requestExecutor.js", "/_layout/15/sp.requestExecutor.js");
    console.log("after registerSod");
    $.getScript(scriptbase + "SP.RequestExecutor.js");
    context = SP.ClientContext.get_current();
    web = context.get_web();
    $("#pressButtonSupport").click(function () {
        $("#pressButtonSupport").hide();
        $("#supportForm").show();
    });
    getCurrentUser(context, function (user) {
        currentUserId = user.get_id();
    });
    $("#dialogform").validate({
        rules: {
            pswd: {
                required: true
            }
        },
        messages: {
            pswd: {
                required: "Описание обязательно для заполнения"
            }
        }
    });
    $("#sendTicket").click(function () {
        //if (!$('#dialogform').valid()) return;
        if ($('#getFile').get(0).files.length === 0) {
            addItem(null);
        }
        else {
            uploadFileaddItem();
        }
    });
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        showTable(listIdNewClaims, "#panelSendClaims", "#tbodySendClaims");
        //showTable(listIdAcceptedClaims, "#panelAcceptedClaims", "#tbodyAcceptedClaims");
        showTable(listIdResolvedClaims, "#panelResolvedClaims", "#tbodyResolvedClaims");
    }, 'SP.RequestExecutor.js');
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        moment.locale(window.navigator.userLanguage || window.navigator.language);
        moment().tz("Europe/Moscow").format();
    }, 'moment.js');
});
function showTable(listId, panelId, tableId) {
    var executor = new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl);
    executor.executeAsync({
        url: appWebUrl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listId + "')/items?$select=Author0/Title,Date,Discription,Time &$expand=Author0&$filter=Author0/Id eq 1&@target='http://devsp/support' ",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var jsonObject = JSON.parse(data.body.toString());
            var results = jsonObject.d.results;
            if (results.length > 0) {
                $(panelId).show();
            }
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                $(tableId).append("<tr><td>" + (i + 1) + "</td><td>" + result.Date + "</td><td>" + result.Time + "</td><td>" + result.Discription + "</td><td>" + result.urgently + "</td><td>" + result.category + "</td></tr>");
            }
            console.log(jsonObject);
        },
        error: onError
    });
}
function addItem(fileId) {
    var executor = new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl);
    var item = {
        "__metadata": {
            "type": "SP.Data.ListListItem",
            "Discription": "",
            "urgently": "",
            "category": "",
            "Data": "",
            "Time": "",
            "kk": "",
            "attachfile": ""
        },
        "Discription": $("#discription").val(),
        "urgently": $("#urgentlyValue").val(),
        "category": $("#category").val(),
        "Data": moment().format("LLL"),
        "Time": moment().format("h:mm"),
        "kkId": currentUserId,
        "attachfileId": fileId
    };
    var url = appWebUrl +
        "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listIdNewClaims + "')/items?@target='" +
        "http://devsp/support" + "'";
    executor.executeAsync({
        url: url,
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success: function () {
            $("#panelSendClaims").show();
            $("#tableSend tbody").prepend("<tr><td>" + "0" + "</td><td>" + moment().format("LLL") + "</td><td>" + moment().format("h:mm") + "</td><td>" + $("#discription").val() + "</td><td>" + $("#urgentlyValue").val() + "</td><td>" + $("#category").val() + "</td></tr>");
            $("#modalDialog").dialog({
                title: "Сообщение успешно отправлено",
                modal: true,
                resizable: false,
                width: 400
            });
        },
        error: onError
    });
}
// Display error messages. 
function onError(error) {
    console.log(error.responseText);
}
// Upload the file.
// You can upload files up to 2 GB with the REST API.
function uploadFileaddItem() {
    // Define the folder path for this example.
    var serverRelativeUrlToFolder = '/support/DocLib/';
    // Get test values from the file input and text input page controls.
    // The display name must be unique every time you run the example.
    var fileInput = $('#getFile');
    // Initiate method calls using jQuery promises.
    // Get the local file as an array buffer.
    var getFile = getFileBuffer();
    getFile.done(function (arrayBuffer) {
        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer);
        addFile.done(function (file, status, xhr) {
            // Get the list item that corresponds to the uploaded file.
            var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
            //getItem.
            getItem.done(function (listItem, status, xhr) {
                console.log('file uploaded and updated');
                addItem(listItem.d.ID);
                console.log(listItem.d.ID + " id ");
            });
            getItem.fail(onError);
        });
        addFile.fail(onError);
    });
    getFile.fail(onError);
    // Get the local file as an array buffer.
    function getFileBuffer() {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.returnValue);
        };
        reader.onerror = function (e) {
            deferred.reject(e.returnValue);
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);
        return deferred.promise();
    }
    // Add the file to the file collection in the Shared Documents folder.
    function addFileToFolder(arrayBuffer) {
        // Get the file name from the file input control on the page.
        var parts = fileInput[0].value.split("\\");
        var fileName = parts[parts.length - 1];
        // Construct the endpoint.
        var fileCollectionEndpoint = String.format("{0}/_api/sp.appcontextsite(@target)/web/getfolderbyserverrelativeurl('{1}')/files" +
            "/add(overwrite=true, url='{2}')?@target='{3}'", appWebUrl, serverRelativeUrlToFolder, fileName, hostWebUrl);
        // Send the request and return the response.
        // This call returns the SharePoint file.
        return jQuery.ajax({
            url: fileCollectionEndpoint,
            type: "POST",
            data: arrayBuffer,
            processData: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-length": arrayBuffer.byteLength
            }
        });
    }
    // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    function getListItem(fileListItemUri) {
        // Construct the endpoint.
        // The list item URI uses the host web, but the cross-domain call is sent to the
        // add-in web and specifies the host web as the context site.
        fileListItemUri = fileListItemUri.replace(hostWebUrl, '{0}');
        fileListItemUri = fileListItemUri.replace('_api/Web', '_api/sp.appcontextsite(@target)/web');
        var listItemAllFieldsEndpoint = String.format(fileListItemUri + "?@target='{1}'", appWebUrl, hostWebUrl);
        // Send the request and return the response.
        return jQuery.ajax({
            url: listItemAllFieldsEndpoint,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" }
        });
    }
}
function onQueryFailed(sender, args) {
    console.log("request failed " + args.get_message() + "\n" + args.get_stackTrace());
}
function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}
// Get List Item Type metadata
function getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}
