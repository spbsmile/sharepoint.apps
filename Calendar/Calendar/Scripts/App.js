///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/sharepoint/SharePoint.d.ts" />
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
function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}
