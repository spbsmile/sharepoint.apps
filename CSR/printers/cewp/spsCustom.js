$(document).ready(function () {
    //todo settings threshold callback refactor
    function RecordVersionCollection(arrayData, itemId, fieldName) {
        $().SPServices({
            operation: "GetVersionCollection",
            async: false,
            strlistID: settings().listId,
            strlistItemID: itemId,
            strFieldName: fieldName,
            completefunc: function (xData, Status) {
                $(xData.responseText).find("Version").each(function (i) {
                    arrayData.push({
                        value: $(this).attr(fieldName),
                        timeUpdate: moment($(this).attr("Modified")).format('LLL')
                    });
                    if (i >= settings().threshold) {
                        return false;
                    }
                });
            }
        });
    }

    
    var thisUserID = $().SPServices.SPGetCurrentUser({
        fieldName: "ID",
        debug: false
    });

});
