/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/sharepoint/SharePoint.d.ts" />
/// <reference path="../typings/moment/moment.d.ts" />
/// <reference path="../typings/moment-timezone/moment-timezone.d.ts" />
/// <reference path="IsCurrentUserMemberOfGroup.ts" />
/// <reference path="getCurrentUser.ts" />
/// <reference path="addClaim.ts" />
/// <reference path="../core/utils.ts" />
/// <reference path="displayClaimsCurrentUser.ts" />
/// <reference path="logs.ts" />
/// <reference path="uploadFile.ts" />
/// <reference path="recallClaim.ts" />
/// <reference path="../typings/jqueryui/jqueryui.d.ts" />
/// <reference path="../typings/jquery.validation/jquery.validation.d.ts" />
/// <reference path="../typings/bootstrap/bootstrap.d.ts" />
"use strict";
var context = null;
var web = null;
var currentUserId = null;
var listIdNewClaims = "416125a4-154d-48ef-8403-d0e448c221ec";
var listIdAcceptedClaims = "96b8b010-bc84-42d4-a6b7-c2d584e4b87f";
var listIdResolvedClaims = "ba62ba90-6c45-44dd-b236-2b2e37d01fbe";
//var itemType: string;
var tooltipBtnResolvedClaim = "Если проблема повторно обнаруженна";
var tooltipBtnNewClaim = "Если Вы сами справились с задачей";
var btnNewClaim = '<input type="button"  value="Отозвать Заявку">';
var btnResolvedClaim = '<input type="button"  value="Переоткрыть Заявку" >';
var listFieldsNewClaimsTable = "/Title,ID,DateTextVersionField,Discription,Time,urgently,category";
var listFieldsAcceptedClaimsTable = "/Title,ID,DateCreate,Discription,TimeCreate,Priority,Category,Author/Title";
var listFieldsResolvedClaimsTable = "/Title,ID,Date,Discription,Time,urgently,category,Author/Title";
var statusClaim = ["Принята", "В Работе", "Выполнена"];
var fileName = " ";
var TableClaims;
(function (TableClaims) {
    TableClaims[TableClaims["New"] = 0] = "New";
    TableClaims[TableClaims["Accepted"] = 1] = "Accepted";
    TableClaims[TableClaims["Resolved"] = 2] = "Resolved";
})(TableClaims || (TableClaims = {}));
//var appWebUrl: string, hostWebUrl: string;
var context;
$(document).ready(function () {
    //hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    //appWebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    //SP.SOD.registerSod("moment.min.js", "../Scripts/moment.min.js");
    //SP.SOD.registerSod("moment-with-locales.min.js", "../Scripts/moment-with-locales.min.js");
    //SP.SOD.registerSod("moment-timezone.min.js", "../Scripts/moment-timezone.min.js");
    //SP.SOD.registerSodDep("moment-with-locales.min.js", "moment.min.js");
    //SP.SOD.registerSodDep("moment-timezone.min.js", "moment-with-locales.min.js");
    //$.getScript(hostWebUrl + "/_layouts/15/" + "SP.RequestExecutor.js");
    context = SP.ClientContext.get_current();
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        var currentUser = context.get_web().get_currentUser();
        context.load(currentUser);
        context.executeQueryAsync(function () {
            currentUserId = currentUser.get_id();
            displayClaimsCurrentUser(listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", btnNewClaim, TableClaims.New, "Author", listFieldsNewClaimsTable, tooltipBtnNewClaim, statusClaim[0]);
            displayClaimsCurrentUser(listIdAcceptedClaims, "#panelSendClaims", "#tbodySendClaims", btnNewClaim, TableClaims.Accepted, "Author0", listFieldsAcceptedClaimsTable, tooltipBtnNewClaim, statusClaim[1]);
            displayClaimsCurrentUser(listIdResolvedClaims, "#panelResolvedClaims", "#tbodyResolvedClaims", btnResolvedClaim, TableClaims.Resolved, "Author0", listFieldsResolvedClaimsTable, tooltipBtnResolvedClaim, statusClaim[2]);
        }, function () {
            console.log("fail get current user");
        });
    }, "sp.js");
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
        //processSendEmails("d");
        $("#modalSendClaim").modal();
        if ($("#getFile").get(0).files.length === 0) {
            addClaim(getItemData($("#urgentlyValue").val(), $("#category option:selected").text(), $("#discription").val(), null, ""));
        }
        else {
            uploadFileaddItem();
        }
    });
    $("#pressButtonSupport").click(function () {
        $("#pressButtonSupport").hide();
        $("#supportForm").show();
    });
    allHideDescription();
});
//todo open dialog
function reopenClaim(rowSelectorId, itemData) {
    removeRow(rowSelectorId, "#panelResolvedClaims", "#tableResolved");
    addClaim(itemData);
}
$(document).on('change', '#category', function () {
    var id = $("#category").val();
    allHideDescription();
    $("#" + id).show();
});
//temp hack. 
function allHideDescription() {
    for (var i = 1; i <= 6; i++) {
        $("#" + i).hide();
    }
}
function removeRow(rowId, panelId, tableId) {
    $("#" + rowId).remove();
    if ($(tableId + " tr").length === 1) {
        $(panelId).hide();
    }
}
/*

function processSendEmails(parameters) {
    var from = 'M_Zabiyakin@rivs.ru',
        to = 'm_laberko@rivs.ru',
        body = 'Hello World Body',
        subject = 'Hello World Subject';

    sendEmails(from, to, body, subject);
}

function sendEmails(from, to, body, subject) {
    var siteurl = _spPageContextInfo.webServerRelativeUrl;
    var urlTemplate = siteurl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': {
                    'type': 'SP.Utilities.EmailProperties'
                },
                'From': from,
                'To': {
                    'results': [to]
                },
                'Body': body,
                'Subject': subject
            }
        }),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success(data) {
            alert('Email Sent Successfully');
        },
        error(err) {
            alert('Error in sending Email: ' + JSON.stringify(err));
        }
    });
}

*/
