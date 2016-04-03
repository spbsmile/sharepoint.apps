//отозвать заявку из списка новых заявок или из списка принятых заявок
// отправлять заявку в список выполненных с пометкой пользователя
function recallClaim(rowId, itemId) {
    removeRow(rowId, "#panelSendClaims", "#tableSend");
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
    /*
    (new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl)).executeAsync(
        {
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
            success(data) {
               
            },
            error(data) {
               
            }
        }
    );*/
}
