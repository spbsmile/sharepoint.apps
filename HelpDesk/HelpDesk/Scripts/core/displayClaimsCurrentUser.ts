function displayClaimsCurrentUser(listId, panelId, tableId, buttonHtml, typeTable, fieldAuthor, fields, tooltipText, statusClaim) {




    (new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl)).executeAsync({
        url: appWebUrl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + listId + "')/items?$select=" + "AttachFileNew/Title," + fieldAuthor + fields + "&$expand=" + "AttachFileNew," + fieldAuthor + "&$filter=" + fieldAuthor + "/Id eq " + currentUserId + "&@target='http://devsp/support'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success(data) {
            var jsonObject = JSON.parse(data.body.toString());
            var results = jsonObject.d.results;
            if (results.length > 0) $(panelId).show();
            
            for (var i = 0; i < results.length; i++) {
                var r = results[i];
                var rowIndex = i + 1;
                $(tableId).append(`<tr id="${`row${rowIndex}`}">
                    <td>${rowIndex}</td>
                    <td>${typeTable === TableClaims.New ? r.DateTextVersionField : typeTable === TableClaims.Accepted ? r.DateCreate : r.Date}</td> 
                    <td>${typeTable === TableClaims.New ? r.Time : typeTable === TableClaims.Accepted ? r.TimeCreate : r.Time}</td> 
                    <td>${r.Discription}</td>
                    <td>${typeTable === TableClaims.New ? r.urgently : typeTable === TableClaims.Accepted ? r.Priority : r.urgently}</td> 
                    <td>${typeTable === TableClaims.New ? r.category : typeTable === TableClaims.Accepted ? r.Category : r.category}</td> 
                    <td>${(r.AttachFileNew === undefined || r.AttachFileNew["Title"] === undefined) ? "  " : r.AttachFileNew["Title"]}                  
                    <td>${statusClaim}</td>
                    <td id="buttoncell${rowIndex}${listId}" class="hint--bottom-left hint--info" data-hint="${tooltipText}"</td>
                </tr>`);
                assignCallbackClaimButton(listId, buttonHtml, rowIndex, r, typeTable, r.ID);
            }
            console.log(jsonObject);
        },
        error: onError
    });
}

function assignCallbackClaimButton(listId, buttonHtml, rowIndex, data, typeTable, newId) {
    var button = $(buttonHtml);
    button.click(
        ((rowSelectorId, data) => () => {
            if (typeTable === TableClaims.New) {
                recallClaim(rowSelectorId, newId);
            } else {
                reopenClaim(rowSelectorId, getItemData(data.urgently, data.category, data.Discription, null, "Дополнение к описанию: Переоткрытие Заявки"));
            }
        })(`row${rowIndex}`, data)
    );
    button.appendTo(`#buttoncell${rowIndex}${listId}`);
}