/**
 * Created by Administrator on 07.02.2016.
 */
$(document).ready(function () {

    function clickVersionButton(itemID, cartrigeName) {
        var cartridgeCountStorage = [];
        var actionStorage = [];
        var whogiveStorage = [];
        var commentStoage = [];

        if ($("#dialogText" + itemID).length === 0) {
            jQuery("#modalWindow" + itemID).append('<div id ="dialogText' + itemID + '\";</div>');
        }
        jQuery("#dialogText" + itemID).append('<table border="1"> <caption>������� ���������:</caption> <thead><tr><th>����</th><th>��������</th><th>����������</th><th>��� �����</th><th>�����������</th></tr></thead> <tbody id="table' + itemID + '\"></tbody></table>');
        moment.locale(window.navigator.userLanguage || window.navigator.language);
        RecordVersionCollection(cartridgeCountStorage, itemID, settings().catridgeCountFieldName);
        RecordVersionCollection(actionStorage, itemID, settings().actionFieldName);
        RecordVersionCollection(whogiveStorage, itemID, settings().whogiveFieldName);
        RecordVersionCollection(commentStoage, itemID, settings().commentFieldName);

        for (var i = 0; i <= settings().threshold - 1; i++) {
            var localAction;
            if (i == 0 && actionStorage[i] === undefined) {
                localAction = "��������";
            } else {
                localAction = actionStorage[i] === undefined ? "������" : actionStorage[i].value;
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
                title: '��������: ' + cartrigeName,
                width: 600,
                modal: true,
                resizable: false,
                close: function (event, ui) {
                    $("#dialogText" + itemID).remove();
                }
            });
        });
    }
});

