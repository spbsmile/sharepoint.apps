﻿function addClaim(itemData) {

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
                var jsonObject = JSON.parse(data.body.toString());
                executeHandler("Заявка Отправлена!");

                if (!$("#panelSendClaims").is(":visible")) {
                    displayClaimsCurrentUser(listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", btnNewClaim, TableClaims.New, "Author", listFieldsNewClaimsTable, tooltipBtnNewClaim, statusClaim[0]);
                } else {
                    //todo move to file "addRowToTableClaims"
                    var rowIndex = 0;
                    $("#tableSend tbody").prepend(`<tr id="${`row${rowIndex}`}">
                            <td>${rowIndex}</td>
                            <td>${moment().format("L")}</td>
                            <td>${moment().format("HH:mm")}</td>
                            <td>${$("#discription").val()}</td>
                            <td>${$("#urgentlyValue").val()}</td>
                            <td>${$("#category option:selected").text()}</td>
                            <td>${fileName}</td> 
                            <td>${statusClaim[0]}</td>
                            <td>${" "}</td> 
                            <td id="buttoncell${rowIndex}${listIdNewClaims}" class="hint--bottom-left hint--info" data-hint="${tooltipBtnNewClaim}"< /td>
                        </tr>`);
                    assignCallbackClaimButton(listIdNewClaims, btnNewClaim, rowIndex, null, TableClaims.New, jsonObject.d.ID);
                }
            },
            error(data) {
                executeHandler(data.body.toString());
                onError(data);
            }
        }
    );

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
            "AttachFileNew": ""
        },
        "Discription": comment + discription,
        "urgently": urgently,
        "category": category,
        "DateTextVersionField": moment().format("L"),
        "Time": moment().format("HH:mm"),
        "AttachFileNewId": fileId
    };
    return item;
}