/**
 * Created by Administrator on 07.02.2016.
 */

function clickVersionButton(itemID, cartrigeName) {
    var cartridgeCountStorage = [];
    var actionStorage = [];
    var whogiveStorage = [];
    var commentStoage = [];

    if ($("#dialogText" + itemID).length === 0) {
        jQuery("#modalWindow" + itemID).append('<div id ="dialogText' + itemID + '\";</div>');
    }
    jQuery("#dialogText" + itemID).append('<table border="1"> <caption>История изменений:</caption> <thead><tr><th>Дата</th><th>Действие</th><th>Количество</th><th>Кто выдал</th><th>Комментарий</th></tr></thead> <tbody id="table' + itemID + '\"></tbody></table>');
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    RecordVersionCollection(cartridgeCountStorage, itemID, settings().catridgeCountFieldName);
    RecordVersionCollection(actionStorage, itemID, settings().actionFieldName);
    RecordVersionCollection(whogiveStorage, itemID, settings().whogiveFieldName);
    RecordVersionCollection(commentStoage, itemID, settings().commentFieldName);

    for (var i = 0; i <= settings().threshold - 1; i++) {
        var localAction;
        if (i == 0 && actionStorage[i] === undefined) {
            localAction = "Добавлен";
        } else {
            localAction = actionStorage[i] === undefined ? "Замена" : actionStorage[i].value;
        }
        if (cartridgeCountStorage[i] == undefined) {
            if (i == 0) {
                jQuery("#dialogText" + itemID).remove();
            }
            break;
        }
        var person = (whogiveStorage[i] === undefined || whogiveStorage[i].value === undefined) ? "  " : whogiveStorage[i].value;
        var comment = (commentStoage[i] === undefined || commentStoage[i].value === undefined) ? "  " : commentStoage[i].value;
        //(moment($(this).attr("Modified")) > moment("2016-01-11T10:04:24Z"))
        $('#table' + itemID).append("<tr><td>" + cartridgeCountStorage[i].timeUpdate + "</td><td>" + localAction + "</td><td>" + cartridgeCountStorage[i].value + "</td><td>" + person + "</td><td>" + comment + "</td></tr>");
    }

    $(function () {
        $("#modalWindow" + itemID).dialog({
            title: 'Картридж: ' + cartrigeName,
            width: 600,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                $("#dialogText" + itemID).remove();
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


