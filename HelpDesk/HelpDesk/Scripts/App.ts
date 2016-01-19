///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/sharepoint/SharePoint.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/jqueryui/jqueryui.d.ts" />
///<reference path="typings/jquery.validation/jquery.validation.d.ts" />

"use strict";

var context = null;
var web = null;
var currentUser = null;
var currentUserTitle = null;
var currentUserLogin = null;
var currentUserId = null;

var listName = "Tickets";
var listGuid = "4f71156b-0221-45e8-8166-7ccca783813f";
var itemType: string;

var appWebUrl: string, hostWebUrl: string;

$(document).ready(() => {

    itemType = getItemTypeForListName(listName);
    hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    appWebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    var scriptbase = hostWebUrl + "/_layouts/15/";

    SP.SOD.registerSod("sp.requestExecutor.js", "/_layout/15/sp.requestExecutor.js");
    SP.SOD.executeFunc("sp.requestExecutor.js", "SP.RequestExecutor", () => {
        $.getScript(scriptbase + "SP.RequestExecutor.js",
            () => {
                $.getScript(scriptbase + "SP.js",
                    () => { $.getScript(scriptbase + "SP.RequestExecutor.js") }
                );
            }
        );

    });

    $("#supportForm").hide();
    $("#pressButtonSupport").click(() => {
        $("#pressButtonSupport").hide();
        $("#supportForm").show();
    });

   // moment.locale(window.navigator.userLanguage || window.navigator.language);
    defineCurrentUser();

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
        if (!$('#dialogform').valid()) return;
        if ((<HTMLInputElement>$('#getFile').get(0)).files.length === 0) {
             addItem(null);    
        } else {
            uploadFileaddItem();
        }
    });
});


function addItem(itemIDlkf) {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    var item = {
        "__metadata": {
            "type": itemType,
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
        "Time": time,//moment().format("h:mm"),
        "kkId": currentUserId,
        "attachfileId": itemIDlkf
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
        success(sender, args) {
            //alert("Сообщение успешно отправлено");
            $("#modalDialog").dialog(
            {
                title: "Сообщение успешно отправлено",
                modal: true,
                resizable: false,
                width:400
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
    var serverRelativeUrlToFolder = '/sites/testdev/DocLib/';

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

function defineCurrentUser() {
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