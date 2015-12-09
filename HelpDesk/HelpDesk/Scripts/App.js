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

$(document).ready(function () {

    itemType = GetItemTypeForListName(listName);
    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var scriptbase = hostweburl + "/_layouts/15/";
    
    SP.SOD.registerSod('sp.requestExecutor.js', '/_layout/15/sp.requestExecutor.js');
    SP.SOD.executeFunc('sp.requestExecutor.js', 'SP.RequestExecutor', function () {
        $.getScript(scriptbase + "SP.RequestExecutor.js",
        function () {
            $.getScript(scriptbase + "SP.js",
                function() { $.getScript(scriptbase + "SP.RequestExecutor.js") } 
            );
        }
    );

    });

    CallClientOM();

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
            "Data": moment().format('LLL'),
            "Time": moment().format('h:mm'),
            "kkId": 1
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
            error: function (error) {
                console.log("error" + JSON.stringify(error));
            }
        });
    });
});

function CallClientOM() {
    context = new SP.ClientContext.get_current();
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
    console.log('request failed ' + args.get_message() + '\n' + args.get_stackTrace());
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