/**
 * Created by Administrator on 31.01.2016.
 */

$(document).ready(function () {

    $("#dialog2").dialog({
        resizable: false,
        modal: true,
        buttons: [{ text: "Добавить", click: addDataToList }],
        autoOpen: false
    });

    $("#opener2").click(function () {
        if ($('#mySelect').has('option').length <= 0) {
            addToSelectAllCartriges('#mySelect');
        }
        $("#dialog2").dialog("open");
    });

    function addDataToList() {
        if (!$('#dialogform').valid()) return;
        var selectedValue = $("#mySelect option:selected").text();
        var clientContext = new SP.ClientContext(settings().siteUrl);
        var list = clientContext.get_web().get_lists().getById(settings().listId);

        var caml = queryByUniqueTitle(settings().catridgeFieldName, selectedValue);
        var collListItems = list.getItems(caml);

        clientContext.load(collListItems);

        clientContext.executeQueryAsync(function () {
            var enumerator = collListItems.getEnumerator();
            while (enumerator.moveNext()) {
                var item = enumerator.get_current();
                item.set_item(settings().catridgeCountFieldName, (item.get_item(settings().catridgeCountFieldName) + parseInt($("#countinput").val())));
                item.set_item(settings().actionFieldName, "Привезено " + parseInt($("#countinput").val()) + " картриджей");
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

    function addToSelectAllCartriges(idSelector) {
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
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
                    $(idSelector)
                        .append($("<option></option>")
                            .attr("value", key)
                            .text(value));
                });
            }, error: onQueryFailed
        });
    }

});  
