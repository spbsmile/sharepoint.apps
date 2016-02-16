function clickViewHistory(itemID, itemName) {
    var getOutFeildsStorage = [];
    var resievedFeildsStorage = [];
    var whogiveStorage = [];
    var commentStorage = [];
    var actionStorage = [];
    var remainStorage = [];

    if ($("#dialogTextHistory" + itemID).length === 0) {
        $("#mdViewHistory" + itemID).append('<div id ="dialogTextHistory' + itemID + '\";</div>');
    }
    jQuery("#dialogTextHistory" + itemID).append('<table border="1"> <thead><tr><th>Дата</th><th>Получатели</th><th>Количество выданных</th><th>ИТ сотрудник</th><th>Комментарий</th><th>На складе</th><th>Действие</th></tr></thead> <tbody id="table' + itemID + '\"></tbody></table>');
    RecordVersionCollection(getOutFeildsStorage, itemID, settings().getoutFieldName);
    RecordVersionCollection(resievedFeildsStorage, itemID, settings().reseivedFieldName);
    RecordVersionCollection(whogiveStorage, itemID, settings().whogiveFieldName);
    RecordVersionCollection(commentStorage, itemID, settings().commentFieldName);
    RecordVersionCollection(actionStorage, itemID, settings().actionFieldName);
    RecordVersionCollection(remainStorage, itemID, settings().remainFieldName);

    for (var i = 0; i <= settings().threshold - 1; i++) {
        // (moment($(this).attr("Modified")) > moment("2016-01-11T10:04:24Z"))
        if (getOutFeildsStorage[i] == undefined && actionStorage[i] == undefined) {
            if (i == 0) {
                jQuery("#dialogTextHistory" + itemID).remove();
            }
            break;
        }
        var personResieved = (resievedFeildsStorage[i] === undefined || resievedFeildsStorage[i].value === undefined) ? "  " : resievedFeildsStorage[i].value;
        var personIt = (whogiveStorage[i] === undefined || whogiveStorage[i].value === undefined) ? "  " : whogiveStorage[i].value;
        var comment = (commentStorage[i] === undefined || commentStorage[i].value === undefined) ? "  " : commentStorage[i].value;
        var action = (actionStorage[i] === undefined || actionStorage[i].value === undefined) ? "  " : actionStorage[i].value;
        var timeUpdate = (getOutFeildsStorage[i] === undefined || getOutFeildsStorage[i].value === undefined) ? actionStorage[i].timeUpdate : getOutFeildsStorage[i].timeUpdate;
        var countGetOut = (getOutFeildsStorage[i] === undefined || getOutFeildsStorage[i].value === undefined) ? " " : getOutFeildsStorage[i].value;
        $('#table' + itemID).append("<tr><td>" + timeUpdate + "</td><td>" + personResieved + "</td><td>" + countGetOut + "</td><td>" + personIt + "</td><td>" + comment + "</td><td>" + remainStorage[i].value + "</td><td>" + action + "</td></tr>");
    }

    $(function () {
        $("#mdViewHistory" + itemID).dialog({
            title: 'История выдачи: ' + itemName,
            width: 600,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                $("#dialogTextHistory" + itemID).remove();
            }
        });
    });
}

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
