$(document).ready(function () {

    $("#dialogstatistics").dialog({
        resizable: false,
        modal: true,
        width: 600,
        autoOpen: false
    });

    $("#openstatistics").click(function () {
        addDataStatistics();
        $("#dialogstatistics").dialog("open");
    });

    function addDataStatistics() {
        addToSelectAllCartriges();
    }

    //todo may be csom
    function addToSelectAllCartriges() {
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                var items = data.d.results;
                var cartridgesData = [];
                var cartridgeInternalField = "OData__x041a__x0430__x0440__x0442__x04";
                //todo id
                console.log(items)
                
                for (var i = 0; i < items.length; i++) {
                    if ($.inArray(items[i][cartridgeInternalField], cartridgesData) === -1 && items[i][cartridgeInternalField] != null) {
                        cartridgesData.push({
                            name:items[i][cartridgeInternalField],
                            //todo id
                            id: 1  
                        });
                    }
                }
                
                for (var i = 0; i < cartridgesData.length; i++) {
                   AddToTableCartridgeStatistics(cartridgesData.id, cartridgesData.name);
                }
            }, error: onQueryFailed
        });
    }

    // проходить по полю количество , сравнивать с предыдущим, если уменьшилось, считать что действие - выдано 
    function AddToTableCartridgeStatistics(itemId, nameCartridge) {
        $().SPServices({
            operation: "GetVersionCollection",
            async: false,
            strlistID: settings().listId,
            strlistItemID: itemId,
            strFieldName: settings().catridgeCountFieldName,
            completefunc: function (xData, Status) {
                //todo hack
                var prevValue = 100;
                var countAddedAction = 0;
                var countReplacedAction = 0;

                $(xData.responseText).find("Version").each(function (i) {
                    //todo check isAfter '2016-01-01' 
                    if (moment($(this).attr("Modified")).isAfter(moment().format('DD-MM-YYYY'))) {
                        var currentValue = $(this).attr(settings().catridgeCountFieldName);
                        if (+prevValue > +currentValue){
                             countReplacedAction++;  
                        }else{
                            countAddedAction++;
                        }
                        prevValue = parseInt(currentValue); 
                        console.log(moment($(this).attr("Modified")).format('LLL') + " isAfter");
                    }
                    else {
                        console.log(moment($(this).attr("Modified")).format('LLL') + " isBefore");
                    }
                });
                
                $('#tbodyStatistiscMonth').append("<tr><td>" + nameCartridge + "</td><td>" + countReplacedAction + "</td><td>" + countAddedAction +  "</td></tr>");
            }
        });
    }
});