"use strict";

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

    $("#sendTicket").click(function () {
      
        var item = {
            "__metadata": { "type": itemType },
            "Title": "вапв",
            "Discription": $("#discription").val(),
            "urgently": $("#urgentlyValue").val(),
            "category": $("#category").val(),
             "Data" : moment().format('LLL')
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
            success: function (data) {
                alert("Сообщение успешно отправлено");
                console.log("y");
            },
            error: function(data) {
                console.log("sfsd");
            }
        });
    });
});

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