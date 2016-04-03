/*

function addRow(tableId, indexRow, date, time, discription, urgently, category, file, statusClaim, tooltipText, listId) {

    var rowIndex = i + 1;
    $(tableId).append(`<tr id="${`row${rowIndex}`}">
                    <td>${rowIndex}</td>
                    <td>${isTableNewClaims ? r.DateTextVersionField : r.Date}</td>
                    <td>${r.Time}</td>
                    <td>${r.Discription}</td>
                    <td>${r.urgently}</td>
                    <td>${r.category}</td>
                    <td>N/A</td>
                    <td>${statusClaim}</td>
                    <td id="buttoncell${rowIndex}${listId}" class="hint--bottom-left hint--info" data-hint="${tooltipText}"</td>
                </tr>`);
    assignCallbackClaimButton(listId, buttonHtml, rowIndex, r, isTableNewClaims, null);

}
*/
/*
$("#tableSend tbody").prepend(`<tr>
                            <td>0</td>
                            <td>${moment().format("LL")}</td>
                            <td>${moment().format("HH:mm")}</td>
                            <td>${$("#discription").val()}</td>
                            <td>${$("#urgentlyValue").val()}</td>
                            <td>${$("#category").val()}</td>
                            <td>${"N/A"}</td>
                            <td>${statusClaim[0]}</td>
                            <td id="buttoncell${jsonObject.d.ID}${listIdNewClaims}" class="hint--bottom-left hint--info" data- hint="${tooltipBtnNewClaim}"< /td>
                        </tr>`);

//var dat = [];
//dat.id = jsonObject.d.ID;
assignCallbackClaimButton(listIdNewClaims, btnNewClaim, 0, null, true);
*/

/*
function assignCallbackClaimButton(listId, buttonHtml, rowIndex, data, isTableNewClaims, newId) {
    var button = $(buttonHtml);
    button.click(
        ((rowSelectorId, data) => () => {
            if (isTableNewClaims) {
                recallClaim(rowSelectorId, newId);
            } else {
                reopenClaim(rowSelectorId, getItemData(data.urgently, data.category, data.Discription, null, "Дополнение к описанию: Переоткрытие Заявки"));
            }
        })(`row${rowIndex}`, data)
    );
    button.appendTo(`#buttoncell${rowIndex}${listId}`);
}
*/