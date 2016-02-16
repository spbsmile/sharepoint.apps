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

    $("#addCartridgeId").click(function () {
        if ($('#mySelect').has('option').length <= 0) {
            addToSelectAllCartriges('#mySelect', false);
        }
        $("#dialog2").dialog("open");
    });

    function addDataToList() {
      
     	var isColorSelected = $("#isColorSelected option:selected").text();
      
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
                 if(isColorSelected === "Да" && item.get_item("IsColor") != "Да" || isColorSelected === "Нет" && item.get_item("IsColor") === "Да"){
                                 continue;
                }
                item.set_item(settings().catridgeCountFieldName, (item.get_item(settings().catridgeCountFieldName) + parseInt($("#countinput").val())));
                item.set_item(settings().actionFieldName, "Привезено " + parseInt($("#countinput").val()) + " картриджей");
                item.set_item(settings().whogiveFieldName, currentUserId);
                item.set_item(settings().commentFieldName, "_");
                item.update();
            }
            clientContext.executeQueryAsync(function () {
                console.log("success get count");
                document.location.reload();
            },
                onQueryFailed);
        },
            onQueryFailed);
        $("#dialog2").dialog("close");
    }

    function addToSelectAllCartriges(idSelector, isColor) {
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                var items = data.d.results;
                var cartridgesData = [];
                var cartridgeInternalField = "OData__x041a__x0430__x0440__x0442__x04";
                for (var i = 0; i < items.length; i++) {
                  if(!isColor && items[i]["IsColor"] || isColor && !items[i]["IsColor"]){  
                                 continue;
                  }         
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
  
  	$('#isColorSelected').change(function () {
    		$('#mySelect')
    			.find('option')
    			.remove()
    			.end()
			;
            if ($('#isColorSelected').val() == 'Да') {
                addToSelectAllCartriges('#mySelect', true);
            } else {
                addToSelectAllCartriges('#mySelect',false);
            }
        }); 

});  
