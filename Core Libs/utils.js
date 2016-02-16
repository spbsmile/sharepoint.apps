

// get all items by rest , apply filter, add values to select tag 
// todo implåment filter by callback 
// often use for 
function addToSelectAllCartriges(idSelector, isColor) {
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                var items = data.d.results;
                var cartridgesData = [];
				//todo headline this field
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

// change state by select tag
//todo implement to common function 
$('#isColorSelected').change(function () {
    		$('#mySelect')
    			.find('option')
    			.remove()
    			.end()
			;
            if ($('#isColorSelected').val() == 'Äà') {
                addToSelectAllCartriges('#mySelect', true);
            } else {
                addToSelectAllCartriges('#mySelect',false);
            }
}); 
