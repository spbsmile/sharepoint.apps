/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/sharepoint/SharePoint.d.ts" />
/// <reference path="typings/moment/moment.d.ts" />
/// <reference path="typings/moment-timezone/moment-timezone.d.ts" />
/// <reference path="IsCurrentUserMemberOfGroup.ts" />
/// <reference path="getCurrentUser.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/jquery.validation/jquery.validation.d.ts" />
/// <reference path="typings/bootstrap/bootstrap.d.ts" />
"use strict";
var context = null;
var web = null;
var currentUserId = null;
var listIdNewClaims = "416125a4-154d-48ef-8403-d0e448c221ec";
var listIdAcceptedClaims = "96b8b010-bc84-42d4-a6b7-c2d584e4b87f";
var listIdResolvedClaims = "ba62ba90-6c45-44dd-b236-2b2e37d01fbe";
var itemType;
var tooltipBtnResolvedClaim = "Если проблема повторно обнаруженна";
var tooltipBtnNewClaim = "Если Вы сами справились с задачей";
var btnNewClaim = '<input type="button"  value="Отозвать Заявку">';
var btnResolvedClaim = '<input type="button"  value="Переоткрыть Заявку" >';
var listFieldsNewClaimsTable = "/Title,ID,DateTextVersionField,Discription,Time,urgently";
var listFieldsAcceptedClaimsTable = "/Title,ID,DateCreate,Discription,TimeCreate,Priority";
var listFieldsResolvedClaimsTable = "/Title,ID,Date,Discription,Time,urgently";
var statusClaim = ["Принята", "В Работе", "Выполнена"];
var appWebUrl, hostWebUrl;
var context;
$(document).ready(function () {
    hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    appWebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    SP.SOD.registerSod("moment.min.js", "../Scripts/moment.min.js");
    SP.SOD.registerSod("moment-with-locales.min.js", "../Scripts/moment-with-locales.min.js");
    SP.SOD.registerSod("moment-timezone.min.js", "../Scripts/moment-timezone.min.js");
    SP.SOD.registerSodDep("moment-with-locales.min.js", "moment.min.js");
    SP.SOD.registerSodDep("moment-timezone.min.js", "moment-with-locales.min.js");
    $.getScript(hostWebUrl + "/_layouts/15/" + "SP.RequestExecutor.js");
    context = SP.ClientContext.get_current();
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        var currentUser = context.get_web().get_currentUser();
        context.load(currentUser);
        context.executeQueryAsync(function () {
            currentUserId = currentUser.get_id();
            displayDataToTable(listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", btnNewClaim, true, "kk", listFieldsNewClaimsTable, tooltipBtnNewClaim, statusClaim[0]);
            displayDataToTable(listIdAcceptedClaims, "#panelSendClaims", "#tbodySendClaims", btnNewClaim, true, "Author0", listFieldsAcceptedClaimsTable, tooltipBtnNewClaim, statusClaim[1]);
            displayDataToTable(listIdResolvedClaims, "#panelResolvedClaims", "#tbodyResolvedClaims", btnResolvedClaim, false, "Author0", listFieldsResolvedClaimsTable, tooltipBtnResolvedClaim, statusClaim[2]);
        }, function OnFailure(sender, args) {
            console.log("fail get current user");
        });
    }, "SP.RequestExecutor.js");
    SP.SOD.loadMultiple(["moment.min.js", "moment-with-locales.min.js", "moment-timezone.min.js"], function () {
        moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
        moment.locale(window.navigator.userLanguage || window.navigator.language);
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
        $("#myModal").modal();
        if ($("#getFile").get(0).files.length === 0) {
            addItem(getItemData($("#urgentlyValue").val(), $("#category").val(), $("#discription").val(), null, ""));
        }
        else {
            uploadFileaddItem();
        }
    });
    $("#pressButtonSupport").click(function () {
        $("#pressButtonSupport").hide();
        $("#supportForm").show();
    });
});
function displayDataToTable(listId, panelId, tableId, buttonHtml, isTableNewClaims, fieldAuthor, fields, tooltipText, statusClaim) {
    (new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl)).executeAsync({
        url: appWebUrl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listId + "')/items?$select=" + fieldAuthor + fields + "&$expand=" + fieldAuthor + "&$filter=" + fieldAuthor + "/Id eq " + currentUserId + "&@target='http://devsp/support'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var jsonObject = JSON.parse(data.body.toString());
            var results = jsonObject.d.results;
            if (results.length > 0)
                $(panelId).show();
            for (var i = 0; i < results.length; i++) {
                var r = results[i];
                $(tableId).append("<tr id=\"" + "row" + i + "\">\n                    <td>" + (i + 1) + "</td>\n                    <td>" + (isTableNewClaims ? r.DateTextVersionField : r.Date) + "</td>\n                    <td>" + r.Time + "</td>\n                    <td>" + r.Discription + "</td>\n                    <td>" + r.urgently + "</td>\n                    <td>" + r.category + "</td>\n                    <td>N/A</td>\n                    <td>" + statusClaim + "</td>\n                    <td id=\"buttoncell" + i + listId + "\" class=\"hint--bottom-left hint--info\" data-hint=\"" + tooltipText + "\"</td>\n                </tr>");
                var button = $(buttonHtml);
                button.click((function (rowSelectorId, r) { return function () {
                    if (isTableNewClaims) {
                        recallClaim(rowSelectorId, r.ID);
                    }
                    else {
                        reopenClaim(rowSelectorId, getItemData(r.urgently, r.category, r.Discription, null, "Дополнение к описанию: Переоткрытие Заявки"));
                    }
                }; })("row" + i, r));
                button.appendTo("#buttoncell" + i + listId);
            }
            console.log(jsonObject);
        },
        error: onError
    });
}
//todo open dialog
function reopenClaim(rowSelectorId, itemData) {
    removeRow(rowSelectorId, "#panelResolvedClaims", "#tableResolved");
    addItem(itemData);
}
//отозвать заявку из списка новых заявок или из списка принятых заявок
// отправлять заявку в список выполненных с пометкой пользователя
function recallClaim(rowId, itemId) {
    removeRow(rowId, "#panelSendClaims", "#tableSend");
    function removeItem() {
        (new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl)).executeAsync({
            url: appWebUrl +
                "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listIdNewClaims + "')/items(" + itemId + ")?@target='" +
                "http://devsp/support" + "'",
            method: "POST",
            headers: {
                "ACCEPT": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function () {
                console.log("suc remove item");
            },
            error: onError
        });
    }
}
function removeRow(rowId, panelId, tableId) {
    $("#" + rowId).remove();
    if ($(tableId + " tr").length === 0) {
        $(panelId).hide();
    }
}
function addItem(itemData) {
    (new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl)).executeAsync({
        url: appWebUrl +
            "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listIdNewClaims + "')/items?@target='" +
            "http://devsp/support" + "'",
        method: "POST",
        body: JSON.stringify(itemData),
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success: function () {
            executeHandler("Заявка Отправлена!");
            if ($("#panelSendClaims").prop("hidden") === "true") {
                displayDataToTable(listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", btnNewClaim, true, "kk", listFieldsNewClaimsTable, tooltipBtnNewClaim, statusClaim[0]);
            }
            else {
                $("#tableSend tbody").prepend("<tr>\n                            <td>0</td>\n                            <td>" + moment().format("LL") + "</td>\n                            <td>" + moment().format("HH:mm") + "</td>\n                            <td>" + $("#discription").val() + "</td>\n                            <td>" + $("#urgentlyValue").val() + "</td>\n                            <td>" + $("#category").val() + "</td>\n                            <td>" + "N/A" + "</td>\n                            <td>" + statusClaim[0] + "</td>\n                        </tr>");
            }
        },
        error: function (data) {
            executeHandler(data.body.toString());
            onError(data);
        }
    });
    function executeHandler(message) {
        $("#loader").hide();
        $("#msgResultLoader").show();
        $("#msgResultLoader").text(message);
    }
}
function getItemData(urgently, category, discription, fileId, comment) {
    var item = {
        "__metadata": {
            "type": "SP.Data.ListListItem",
            "Discription": "",
            "urgently": "",
            "category": "",
            "DateTextVersionField": "",
            "Time": "",
            "kk": "",
            "AttachFileNew": ""
        },
        "Discription": comment + discription,
        "urgently": urgently,
        "category": category,
        "DateTextVersionField": moment().format("L"),
        "Time": moment().format("HH:mm"),
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
    var serverRelativeUrlToFolder = "/support/DocLib/";
    // Get test values from the file input and text input page controls.
    // The display name must be unique every time you run the example.
    var fileInput = $("#getFile");
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
                console.log("file uploaded and updated");
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
        fileListItemUri = fileListItemUri.replace(hostWebUrl, "{0}");
        fileListItemUri = fileListItemUri.replace("_api/Web", "_api/sp.appcontextsite(@target)/web");
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
