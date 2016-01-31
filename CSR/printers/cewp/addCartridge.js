/**
 * Created by Administrator on 31.01.2016.
 */

$("#dialog2").dialog({
    resizable: false,
    modal: true,
    buttons: [{text: "Добавить", click: addDataToList}],
    autoOpen: false
});

$("#opener2").click(function () {
    if ($('#mySelect').has('option').length <= 0) {
        addItemsDataToDialog();
    }
    $("#dialog2").dialog("open");
});

function addDataToList() {
    if (!$('#dialogform').valid()) return;
    var selectedValue = $("#mySelect option:selected").text();
    var clientContext = new SP.ClientContext(siteUrl);
    var list = clientContext.get_web().get_lists().getById(listId);

    var caml = queryByUniqueTitle(catridgeFieldName, selectedValue);
    var collListItems = list.getItems(caml);

    clientContext.load(collListItems);

    clientContext.executeQueryAsync(function () {
            var enumerator = collListItems.getEnumerator();
            while (enumerator.moveNext()) {
                var item = enumerator.get_current();
                item.set_item(catridgeCountFieldName, (item.get_item(catridgeCountFieldName) + parseInt($("#countinput").val())));
                item.set_item(actionFieldName, "Привезено " + parseInt($("#countinput").val()) + " картриджей");
                item.update();
            }
            clientContext.executeQueryAsync(function () {
                    console.log("success get count");
                },
                onQueryFailed);
            document.location.reload();
        },
        onQueryFailed);

    $("#dialog2").dialog("close");
}

function addItemsDataToDialog() {
    $.ajax({
        url: "http://server-sp-it/sites/wiki/" + "/_api/web/lists(guid'" + listId + "')/items",
        method: "GET",
        headers: {"Accept": "application/json; odata=verbose"},
        success: function (data) {
            var items = data.d.results;
            var cartridgesData = [];
            var cartridgeInternalField = "OData__x041a__x0430__x0440__x0442__x04";
            for (var i = 0; i < items.length; i++) {
                if ($.inArray(items[i][cartridgeInternalField], cartridgesData) === -1 && items[i][cartridgeInternalField] != null) {
                    cartridgesData.push(items[i][cartridgeInternalField]);
                }
            }
            $.each(cartridgesData, function (key, value) {
                $('#mySelect')
                    .append($("<option></option>")
                        .attr("value", key)
                        .text(value));
            });
        }, error: onQueryFailed
    });
}
