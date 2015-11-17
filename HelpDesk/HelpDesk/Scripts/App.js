'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

// Этот код, запускаемый после готовности модели DOM, создает объект контекста, который требуется для использования объектной модели SharePoint
$(document).ready(function () {
    getUserName();
});

// Эта функция подготавливает, загружает и затем выполняет запрос SharePoint для получения сведений о текущих пользователях
function getUserName() {
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// Эта функция выполняется, если приведенный выше вызов был успешным
// Она заменяет содержимое элемента message именем пользователя
function onGetUserNameSuccess() {
    $('#message').text('Hello ' + user.get_title());
}

// Эта функция выполняется при сбое приведенного выше вызова
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}

function handleClick() {
    var text = $("#2").val();
    console.log(text);
    alert(text);
}

function processSendEmails(parameters) {
    var from = 'M_Zabiyakin@rivs.ru',
        to = 'M_Zabiyakin@rivs.ru',
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
        success: function (data) {
            alert('Email Sent Successfully');
        },
        error: function (err) {
            alert('Error in sending Email: ' + JSON.stringify(err));
        }
    });
}

function getEmailCurrentUser(parameters) {
    console.log(user.get_email());
    alert(user.get_email());
}

function sendEmailAnother(from, to, body, subject) {

    var siteurl = _spPageContextInfo.webServerRelativeUrl;

    var urlTemplate = siteurl + "/_api/SP.Utilities.Utility.SendEmail";
    console.log(urlTemplate.toString());
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': from,
                'To': { 'results': [to] },
                'Body': body,
                'Subject': subject
            }
        }
      ),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            alert("Eposten ble sendt");
        },
        error: function (err) {
            alert(err.responseText);
            debugger;
        }
    });
}

function anotherAttempt(parameters) {
    var siteurl = _spPageContextInfo.webServerRelativeUrl;

    var urlTemplate = siteurl + "/_api/SP.Utilities.Utility.SendEmail";
    console.log(urlTemplate.toString());

    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'Body': 'Hello',
                'To': { 'results': ['M_Zabiyakin@rivs.ru'] },
                'Subject': "From REST API"
            }
        }),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            alert("Successful");
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
