function removeItem(itemId, listId) {
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + listId + "')/items(" + itemId + ")",
        type: "POST",
        contentType: "application/json;odata=verbose",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },

        success: function (sender, args) {
            console.log("hello remove item");
        },
        error: onError
    });
}


function addItem(listId, itemData) {
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + listId + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(itemData),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (sender, args) {
            location.reload();
        },
        error: onError
    });
}

// Display error messages. 
function onError(error) {
    console.log(error.responseText);
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
