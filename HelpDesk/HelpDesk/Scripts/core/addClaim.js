function addClaim(itemData) {
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
        success: function (data) {
            var jsonObject = JSON.parse(data.body.toString());
            executeHandler("Заявка Отправлена!");
            if (!$("#panelSendClaims").is(":visible")) {
                displayClaimsCurrentUser(listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", btnNewClaim, TableClaims.New, "Author", listFieldsNewClaimsTable, tooltipBtnNewClaim, statusClaim[0]);
            }
            else {
                //todo move to file "addRowToTableClaims"
                var rowIndex = 0;
                $("#tableSend tbody").prepend("<tr id=\"" + "row" + rowIndex + "\">\n                            <td>" + rowIndex + "</td>\n                            <td>" + moment().format("L") + "</td>\n                            <td>" + moment().format("HH:mm") + "</td>\n                            <td>" + $("#discription").val() + "</td>\n                            <td>" + $("#urgentlyValue").val() + "</td>\n                            <td>" + $("#category option:selected").text() + "</td>\n                            <td>" + fileName + "</td> \n                            <td>" + statusClaim[0] + "</td>\n                            <td>" + " " + "</td> \n                            <td id=\"buttoncell" + rowIndex + listIdNewClaims + "\" class=\"hint--bottom-left hint--info\" data-hint=\"" + tooltipBtnNewClaim + "\"< /td>\n                        </tr>");
                assignCallbackClaimButton(listIdNewClaims, btnNewClaim, rowIndex, null, TableClaims.New, jsonObject.d.ID);
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
        $("#pressButtonSupport").show();
        $("#supportForm").hide();
        //   $("#discription").val(" ");
    }
}
function getItemData(urgently, category, discription, fileId, comment) {
    var item = {
        "__metadata": {
            "type": "SP.Data.ListListItem",
            "Discription": "",
            "urgently": "",
            "category": "",
            "AttachFileNew": ""
        },
        "Discription": comment + discription,
        "urgently": urgently,
        "category": category,
        "AttachFileNewId": fileId
    };
    return item;
}
