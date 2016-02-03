/**
 * Created by M_Zabiyakin on 02.02.2016.
 */

$(document).ready(function () {

    $("#dialog2").dialog({
        resizable: false,
        modal: true,
        width: 600,
        buttons: [{ text: "Добавить", click: addDataToList }],
        autoOpen: false
    });

    $("#opendialogaddDevice").click(function () {
        if ($('#mySelect').has('option').length <= 0) {
            addToSelectAllDevice('#mySelect');
        }
        $("#dialog2").dialog("open");
    });

    function addDataToList() {
        //if (!$('#dialogform').valid()) return;
        var selectedValue = $("#mySelect option:selected").text();
        var clientContext = new SP.ClientContext(settings().siteUrl);
        var list = clientContext.get_web().get_lists().getById(settings().listId);

        var caml = queryByUniqueTitle("Title", selectedValue);
        var collListItems = list.getItems(caml);

        clientContext.load(collListItems);

        clientContext.executeQueryAsync(function () {
                var enumerator = collListItems.getEnumerator();
                while (enumerator.moveNext()) {
                    console.log("update add " + parseInt($("#countinput").val()) );
                    var item = enumerator.get_current();
                    item.set_item(settings().remainFieldName, (item.get_item(settings().remainFieldName) + parseInt($("#countinput").val())));
                    item.set_item(settings().actionFieldName, "Принято " + parseInt($("#countinput").val()) + " едениц");
                    item.set_item(settings().getoutFieldName, 0);
                    item.set_item(settings().commentFieldName, "_");  
                    //todo rename to itpersonal
                    item.set_item(settings().whogiveFieldName, currentUserId);
                    item.set_item(settings().reseivedFieldName, currentUserId);
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

    //renames !!!
    function addToSelectAllDevice(idSelector) {
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                var items = data.d.results;
                var cartridgesData = [];
                for (var i = 0; i < items.length; i++) {
                    if ($.inArray(items[i]["Title"], cartridgesData) === -1 && items[i]["Title"] != null) {
                        cartridgesData.push(items[i]["Title"]);
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

