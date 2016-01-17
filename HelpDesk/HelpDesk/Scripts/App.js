///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/sharepoint/SharePoint.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
"use strict";
var context = null;
var web = null;
var currentUser = null;
var currentUserTitle = null;
var currentUserLogin = null;
var currentUserId = null;
var listName = "Tickets";
var listGuid = "4f71156b-0221-45e8-8166-7ccca783813f";
var itemType;
var appWebUrl, hostWebUrl;
$(document).ready(function () {
    itemType = GetItemTypeForListName(listName);
    hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    appWebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    var scriptbase = hostWebUrl + "/_layouts/15/";
    SP.SOD.registerSod("sp.requestExecutor.js", "/_layout/15/sp.requestExecutor.js");
    SP.SOD.executeFunc("sp.requestExecutor.js", "SP.RequestExecutor", function () {
        $.getScript(scriptbase + "SP.RequestExecutor.js", function () {
            $.getScript(scriptbase + "SP.js", function () { $.getScript(scriptbase + "SP.RequestExecutor.js"); });
        });
    });
    callClientOm();
    $("#sendTicket").click(function () {
        var item = {
            "__metadata": {
                "type": itemType,
                "Discription": "",
                "urgently": "",
                "category": "",
                "Data": "",
                "Time": "",
                "kk": ""
            },
            "Discription": $("#discription").val(),
            "urgently": $("#urgentlyValue").val(),
            "category": $("#category").val(),
            "Data": moment().format("LLL"),
            "Time": moment().format("h:mm"),
            "kkId": currentUserId
        };
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + listGuid + "')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (sender, args) {
                alert("Сообщение успешно отправлено");
                console.log("succes");
            },
            error: onQueryFailed
        });
    });
});
// Upload the file.
// You can upload files up to 2 GB with the REST API.
function uploadFile() {
    // Define the folder path for this example.
    var serverRelativeUrlToFolder = '/testlib';
    // Get test values from the file input and text input page controls.
    // The display name must be unique every time you run the example.
    var fileInput = $('#getFile');
    var newName = $('#displayName').val();
    // Initiate method calls using jQuery promises.
    // Get the local file as an array buffer.
    var getFile = getFileBuffer();
    getFile.done(function (arrayBuffer) {
        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer);
        addFile.done(function (file, status, xhr) {
            // Get the list item that corresponds to the uploaded file.
            var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
            getItem.done(function (listItem, status, xhr) {
                // Change the display name and title of the list item.
                var changeItem = updateListItem(listItem.d.__metadata);
                changeItem.done(function (data, status, xhr) {
                    alert('file uploaded and updated');
                });
                changeItem.fail(onError);
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
    // Change the display name and title of the list item.
    function updateListItem(itemMetadata) {
        // Construct the endpoint.
        // Specify the host web as the context site.
        var listItemUri = itemMetadata.uri.replace('_api/Web', '_api/sp.appcontextsite(@target)/web');
        var listItemEndpoint = String.format(listItemUri + "?@target='{0}'", hostWebUrl);
        // Define the list item changes. Use the FileLeafRef property to change the display name. 
        // For simplicity, also use the name as the title.
        // The example gets the list item type from the item's metadata, but you can also get it from the
        // ListItemEntityTypeFullName property of the list.
        var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}'}}", itemMetadata.type, newName, newName);
        // Send the request and return the promise.
        // This call does not return response content from the server.
        return jQuery.ajax({
            url: listItemEndpoint,
            type: "POST",
            data: body,
            headers: {
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose",
                "content-length": body.length,
                "IF-MATCH": itemMetadata.etag,
                "X-HTTP-Method": "MERGE"
            }
        });
    }
}
// Display error messages. 
function onError(error) {
    alert(error.responseText);
}
function callClientOm() {
    context = SP.ClientContext.get_current();
    web = context.get_web();
    currentUser = web.get_currentUser();
    context.load(currentUser);
    context.executeQueryAsync(onQuerySucceeded, onQueryFailed);
}
function onQuerySucceeded(sender, args) {
    currentUserTitle = currentUser.get_title();
    currentUserLogin = currentUser.get_loginName();
    currentUserId = currentUser.get_id();
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
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}
