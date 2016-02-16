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

var itemType: string;

var appWebUrl: string, hostWebUrl: string;

$(document).ready(() => {

    hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    appWebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    var scriptbase = hostWebUrl + "/_layouts/15/";
    SP.SOD.registerSod("sp.requestExecutor.js", "/_layout/15/sp.requestExecutor.js");
    SP.SOD.registerSod("moment.min.js", "../Scripts/moment.min.js");
    SP.SOD.registerSod("moment-with-locales.min.js", "../Scripts/moment-with-locales.min.js");
    SP.SOD.registerSod("moment-timezone.min.js", "../Scripts/moment-timezone.min.js");
    SP.SOD.registerSodDep("moment-with-locales.min.js", "moment.min.js");
    SP.SOD.registerSodDep("moment-timezone.min.js", "moment-with-locales.min.js");
    $.getScript(scriptbase + "SP.RequestExecutor.js");

    context = SP.ClientContext.get_current();
    web = context.get_web();

    $("#pressButtonSupport").click(() => {
        $("#pressButtonSupport").hide();
        $("#supportForm").show();
    });

    getCurrentUser(context, user => {
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

    $("#sendTicket").click(() => {
        //if (!$('#dialogform').valid()) return;
        if ((<HTMLInputElement>$('#getFile').get(0)).files.length === 0) {
            addItem(getItemData($("#urgentlyValue").val(), $("#category").val(), $("#discription").val(), null, ""));  
            //(urgently, category, discription, fileId, comment)   
        } else {
            uploadFileaddItem();
        }
    });

    SP.SOD.executeOrDelayUntilScriptLoaded(() => {
        showTable(listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", '<input type="button"  value="Отозвать Заявку" >', true, "kk", '/Title,Discription,Time');
        showTable(listIdResolvedClaims, "#panelResolvedClaims", "#tbodyResolvedClaims", '<input type="button"  value="Переоткрыть Заявку" >', false, "Author0", "/Title,Date,Discription,Time");
    }, "SP.RequestExecutor.js");

    SP.SOD.loadMultiple(["moment.min.js", "moment-with-locales.min.js", "moment-timezone.min.js"],
        () => { 
            moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
            moment.locale(window.navigator.userLanguage || window.navigator.language);
            console.log(moment().format("LLL"));
        });
});


function showTable(listId, panelId, tableId, buttonHtml, isTableNewClaims, fieldAuthor,fields) {
    var executor = new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl);

    executor.executeAsync({
        url: appWebUrl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listId + "')/items?$select=" + fieldAuthor + fields + "&$expand=" + fieldAuthor + "&$filter=" + fieldAuthor +"/Id eq 1&@target='http://devsp/support'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success(data) {
            var jsonObject = JSON.parse(data.body.toString());
            var results = jsonObject.d.results; 
            if (results.length > 0) { $(panelId).show(); }
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var rowId = "row" + i;
                $(tableId).append(`<tr id="${rowId}"><td>${i + 1}</td><td>${result.Date}</td><td>${result.Time}</td><td>${result.Discription}</td><td>${result.urgently}</td><td>${result.category}</td><td>N/A</td><td id="buttoncell${i}${listId}"></td></tr>`);
                var button = $(buttonHtml);
                button.click(
                    ((id, r) => () => {
                        if (isTableNewClaims) {
                            recallClaim();
                        } else {
                            reopenClaim(id, getItemData(r.urgently, r.category, r.Discription, null, "Переоткрытие Заявки"));    
                        }
                    })(rowId, result)
                );
                button.appendTo('#buttoncell' + i + listId);
            }
            console.log(jsonObject);
        },
        error: onError
    });
}

function reopenClaim(rowId, itemData) {
    //todo reopen with comment and atach file too
    var id = "#" + rowId;
    console.log(id);
    $(id).remove();
    //$('#tabId tbody').find('tr').length;
   /* if ("#tbodyResolvedClaims") {
        $("#panelResolvedClaims").hide();
    } */
    addItem(itemData);
}

function recallClaim() {
    
}

function removeItem() {
    
}

function addItem(itemData) {

    var executor = new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl);
    var url = appWebUrl +
        "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listIdNewClaims + "')/items?@target='" +
        "http://devsp/support" + "'";
 
    executor.executeAsync(
        {
            url: url,
            method: "POST",
            body: JSON.stringify(itemData),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            },
            success() {
                $("#panelSendClaims").show();
                $("#tableSend tbody").prepend("<tr><td>" + "0" + "</td><td>" + moment().format("LLL") + "</td><td>" + moment().format("h:mm") + "</td><td>" + $("#discription").val() + "</td><td>" + $("#urgentlyValue").val() + "</td><td>" + $("#category").val() + "</td></tr>");
                $("#modalDialog").dialog(
                {
                    title: "Сообщение успешно отправлено",
                    modal: true,
                    resizable: false,
                    width: 400
                });
            },
            error: onError
        }
    );
}

function getItemData(urgently, category, discription, fileId, comment) {
    var item = {
        "__metadata": {
            "type": "SP.Data.ListListItem",
            "Discription": "",
            "urgently": "",
            "category": "",
            "Data": "",
            "Time": "",
            "kk": "",
            "AttachFileNew": ""
        },
        "Discription": comment + discription,
        "urgently": urgently,
        "category": category,
        "Data": moment().format("LLL"),
        "Time": moment().format("h:mm"),
        "kkId": currentUserId,
        "AttachFileNewId": fileId
    };
    return item;
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
    getFile.done(arrayBuffer => {

        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer);
        addFile.done((file, status, xhr) => {

            // Get the list item that corresponds to the uploaded file.
            var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
            //getItem.
            getItem.done((listItem, status, xhr) => {
                console.log('file uploaded and updated');
                addItem(getItemData($("#urgentlyValue").val(), $("#category").val(), $("#discription").val(), listItem.d.ID, ""));
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
      
        reader.onloadend = e => {
            deferred.resolve(e.returnValue);
        }
        reader.onerror = e => {
            deferred.reject(e.returnValue);
        }
        reader.readAsArrayBuffer((<HTMLInputElement>fileInput[0]).files[0]);
        return deferred.promise();
    }

    // Add the file to the file collection in the Shared Documents folder.
    function addFileToFolder(arrayBuffer) {

        // Get the file name from the file input control on the page.
        var parts = (<HTMLInputElement>fileInput[0]).value.split("\\");
        var fileName = parts[parts.length - 1];

        // Construct the endpoint.
        var fileCollectionEndpoint = String.format(
            "{0}/_api/sp.appcontextsite(@target)/web/getfolderbyserverrelativeurl('{1}')/files" +
            "/add(overwrite=true, url='{2}')?@target='{3}'",
            appWebUrl, serverRelativeUrlToFolder, fileName, hostWebUrl);

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

        var listItemAllFieldsEndpoint = String.format(fileListItemUri + "?@target='{1}'",
            appWebUrl, hostWebUrl);

        // Send the request and return the response.
        return jQuery.ajax({
            url: listItemAllFieldsEndpoint,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" }
        });
    }
}

function onQueryFailed(sender: any, args: any);
function onQueryFailed(sender, args) {
    console.log(`request failed ${args.get_message()}\n${args.get_stackTrace()}`);
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
    return `SP.Data.${name.charAt(0).toUpperCase()}${name.split(" ").join("").slice(1)}ListItem`;
}