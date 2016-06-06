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

var context;

var subcategory = {
    '1': [{
        main: "Установить программу",
        faq: "Напишите название программы." + +" По возможности укажите сайт разработчика программы." +
        " Если у вас есть дистрибутив нужной программы, укажите где он расположен.",
        tip: 'Некоторые программы вы можете установить самостоятельно. Инструкция, как это сделать, находится в нашей базе знаний' + '<a href="\\server-sc\IT\Самостоятельная установка ПО.docx">Самостоятельная установка ПО.docx</a>' + '- РАЗМЕСТИТЬ НА САЙТЕ'
    }, {
        main: "Обновить ПО",
        faq: "Напишите названия программ, которые необходимо обновить.",
        tip: ""
    }, {
        main: "Не запускается программа",
        faq: "Напишите название неработающей программы. Если при запуске возникает ошибка, приложите к заявке скриншот к ней.",
        tip: ""
    }, {
        main: "Другое",
        faq: "Опишите проблему.",
        tip: ""
    }],
    '2': [{
        main: "Не работает гарнитура",
        faq: "",
        tip: ""
    }, {
        main: "Не работает мышь/клавиатура",
        faq: "",
        tip: ""
    }, {
        main: "Другое",
        faq: "Опишите проблему.",
        tip: ""
    }],
    '3': [{
        main: "Не печатает принтер",
        faq: "Укажите, пожалуйста, модель принтера.",
        tip: ""
    }, {
        main: "Проблемы при сканировании/копировании",
        faq: "Укажите, пожалуйста, модель принтера.",
        tip: ""
    }, {
        main: "Застряла бумага",
        faq: "Укажите, пожалуйста, модель принтера.",
        tip: ""
    }, {
        main: "Заменить картридж",
        faq: "Укажите, пожалуйста, модель принтера.",
        tip: ""
    }, {
        main: "Подключить принтер",
        faq: "Укажите, пожалуйста, номер кабинета в котором находится принтер и его название.",
        tip: "Вы можете самостоятельно устанавливать принтеры. Для этого в проводнике зайдите на сервер печати своего филиала" +
        " -Железноводская: \\server-it" +
        "- Липовая: \\server-storrpr1" +
        "- Уральская: \\server-sc-asu" +
        "Затем выберите нужный принтер и дважды щелкните на нем. Принтер установится на Ваш компьютер."
    }, {
        main: "Другое",
        faq: "Опишите проблему.",
        tip: ""
    }],
    '4': [{
        main: "Предоставить доступ в интернет",
        faq: "Для предоставления доступа в интернет приложите к заявке скан подписанной служебной записки на интернет на имя генерального директора.",
        tip: ""
    }, {
        main: "Не открывается сайт",
        faq: "Напишите адрес неработающего сайта",
        tip: ""
    }, {
        main: "Другое",
        faq: "Опишите проблему.",
        tip: ""
    }],
    '5': [{
        main: "Не открывается MS Outlook",
        faq: "",
        tip: ""
    }, {
        main: "Не приходят письма",
        faq: "Если вы уверены, что вам было отправлено письмо, напишите email с котрого оно было отправлено и примерное время отправления.",
        tip: ""
    }, {
        main: "Не отправляются письма",
        faq: "",
        tip: ""
    }, {
        main: "Другое",
        faq: "",
        tip: ""
    }
    ],
    '6': [{
        main: "Не открывается Skype For Business",
        faq: "Напишите текст ошибки или приложите скриншот к ней.",
        tip: ""
    }, {
        main: "Не дозвониться по номеру …",
        faq: "Напишите номер телефона по которому вы не можете дозвониться.",
        tip: "Попробуйте набрать этот номер с мобильного телефона. Возможно, что линия занята или телефон выключен."
    }, {
        main: "Другое",
        faq: "",
        tip: ""
    }
    ],
    '7': [{
        main: "Не открывается файл",
        faq: "Укажите путь к файлу, который вы не можете открыть.",
        tip: ""
    }, {
        main: "Нет доступа к файлу",
        faq: "Укажите путь к файлу, который вы не можете открыть.",
        tip: ""
    }, {
        main: "Нет доступа к папке",
        faq: "Укажите путь к папке, которую вы не можете открыть.",
        tip: ""
    }],
    '8': [{
        main: "",
        faq: "",
        tip: ""
    }]
}

$(document).ready(function () {

    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        context = SP.ClientContext.get_current();
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
    /*  $("#dialogform").validate({
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
     }); */
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
    //number category
    var id = $("#category").val();
//remove
    $('#subcategory')
        .find('option')
        .remove()
        .end()
    ;

    var items = subcategory[id];

//add
    $.each(items, function (i, item) {
        $('#subcategory').append($('<option>', {
            value: i,
            text: item.main
        }));
    });

    //processSendEmails();
    // allHideDescription();
    $("#mainHelper").show();
    $("#mainHelper").text(items[0].main);
    $("#mainFaq").text(items[0].faq);
    $("#mainTips").text(items[0].tip);// + "\n" + items[0].faq);
});

$(document).on('change', '#subcategory', function () {
    //number category
    var idCat = $("#category").val();
    var idSubCar = $("#subcategory").val();
    console.log(idSubCar + " id sub categ");

    var items = subcategory[idCat];

    //processSendEmails();
    //allHideDescription();
    //$("#" + idCat).show();
    //  $("#" + idCat).text(items[idSubCar].main + "\n" + items[idSubCar].faq);

    $("#mainHelper").text(items[idSubCar].main);
    $("#mainFaq").text(items[idSubCar].faq);
    $("#mainTips").innerHTML(items[idSubCar].tip);

});


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
 var urlTemplate = "http://intranet/" + "/_api/SP.Utilities.Utility.SendEmail";
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
 success: function (data) {
 alert("Successful");
 },
 error: function (err) {
 alert(err.responseText);
 }
 });
 }
 */

