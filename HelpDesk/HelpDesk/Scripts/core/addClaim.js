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
            //$("#panelSendClaims").is(":visible"); 
            if (!$("#panelSendClaims").is(":visible")) {
                displayClaimsCurrentUser(listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", btnNewClaim, TableClaims.New, "kk", listFieldsNewClaimsTable, tooltipBtnNewClaim, statusClaim[0]);
            }
            else {
                //todo move to file "addRowToTableClaims"
                var rowIndex = 0;
                $("#tableSend tbody").prepend("<tr>\n                            <td>" + rowIndex + "</td>\n                            <td>" + moment().format("LL") + "</td>\n                            <td>" + moment().format("HH:mm") + "</td>\n                            <td>" + $("#discription").val() + "</td>\n                            <td>" + $("#urgentlyValue").val() + "</td>\n                            <td>" + $("#category").val() + "</td>\n                            <td> </td>\n                            <td>" + statusClaim[0] + "</td>\n                            <td id=\"buttoncell" + rowIndex + listIdNewClaims + "\" class=\"hint--bottom-left hint--info\" data-hint=\"" + tooltipBtnNewClaim + "\"< /td>\n                        </tr>");
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
