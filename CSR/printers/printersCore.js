function clickReplaceButton(itemID, cartridgesName, cartridgesCount) {

    if (cartridgesCount >= 1) {
        if ($("#dialogTextReplace" + itemID).length == 0) {
            $("#modalReplaceWindow" + itemID).append('<div id ="dialogTextReplace' + itemID + '\";</div>');
        }
        jQuery("#dialogTextReplace" + itemID).append('<label>���� ������:</label> <div> <input name="users" id="users" value="" /> �����������:<textarea id="comment" rows="4" name="text"></textarea>');
        $("input[name='users']").pickSPUser();
        var clientContext = new SP.ClientContext(settings.getSiteUrl);
        var list = clientContext.get_web().get_lists().getById(settings.getListId);
        isClosed = true;

        $(function () {
            $("#modalReplaceWindow" + itemID).dialog({
                buttons: [
                    {
                        text: "��������",
                        click: function () {

                            isClosed = false;
                            GetCurrentUser(clientContext, function(user) {
                                currentUserId = user.id;
                            })

                            var caml = queryByUniqueTitle(settingsgetCatridgeFieldName, cartridgesName);
                            var collListItems = list.getItems(caml);

                            clientContext.load(collListItems);

                            clientContext.executeQueryAsync(function () {
                                    var enumerator = collListItems.getEnumerator();
                                    while (enumerator.moveNext()) {
                                        var item = enumerator.get_current();
                                        item.set_item(settingsgetCatridgeCountFieldName, cartridgesCount - 1);
                                        item.set_item(settings.getActionFieldName, "������");
                                        item.set_item(settings.getCommentFieldName, $("#comment").val() + "�����: " + $("#users").val());
                                        item.set_item(settings.getWhogiveFieldName, currentUserId);
                                        if (item.get_id() == itemID) {
                                            // item.set_item(replaceDateFieldName,  $.now().toString());
                                        }
                                        item.update();
                                    }
                                    clientContext.executeQueryAsync(function () {
                                            console.log("success set count");
                                            document.location.reload();
                                        },
                                        onQueryFailed);
                                },
                                onQueryFailed);
                        }
                    }
                ],
                title: '�������� ��������: ' + cartridgesName,
                width: 600,
                modal: true,
                resizable: false,
                close: function (event, ui) {
                    $("#dialogTextReplace" + itemID).remove();
                    console.log("inside close dialogTextReplace");
                    if(!isClosed){
                        document.location.reload();
                    }
                }
            });
        });
    }
}

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
    RecordVersionCollection(cartridgeCountStorage, itemID, settingsgetCatridgeCountFieldName);
    RecordVersionCollection(actionStorage, itemID, settings.getActionFieldName);
    RecordVersionCollection(whogiveStorage, itemID, settings.getWhogiveFieldName);
    RecordVersionCollection(commentStoage, itemID, settings.getCommentFieldName);

    for (var i = 0; i <= threshold - 1; i++) {
        var localAction = actionStorage[i] === undefined ? "������" : actionStorage[i].value;
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

function RecordVersionCollection(arrayData, itemId, fieldName) {
    $().SPServices({
        operation: "GetVersionCollection",
        async: false,
        strlistID: listId,
        strlistItemID: itemId,
        strFieldName: fieldName,
        completefunc: function (xData, Status) {
            $(xData.responseText).find("Version").each(function (i) {
                /*if (moment($(this).attr("Modified")).isAfter('2016-01-01'))
                 {
                 console.log(moment($(this).attr("Modified")).format('LLL') + " isAfter");
                 }
                 else{
                 console.log(moment($(this).attr("Modified")).format('LLL') + " isBefore");
                 }*/

                arrayData.push({
                    value: $(this).attr(fieldName),
                    timeUpdate: moment($(this).attr("Modified")).format('LLL')
                });
                if (i >= threshold) {
                    return false;
                }
            });
        }
    });
}

function IsCriticalCount(cartrigeName, cartrigeCount) {
    switch (cartrigeName) {
        case "TK-1140":
            return cartrigeCount < 3;
            break;
        case "TK-350":
            return cartrigeCount < 3;
            break;
        case "TK-6305":
            return cartrigeCount < 3;
            break;
        case "C4129x":
            return cartrigeCount < 3;
            break;
        case "CB436A":
            return cartrigeCount < 3;
            break;
        case "Q2612A":
            return cartrigeCount < 3;
            break;
        case "TK-685":
            return cartrigeCount < 3;
            break;
        case "TK-170":
            return cartrigeCount < 3;
            break;
        case "TK-435":
            return cartrigeCount < 3;
            break;
        case "Q7516A":
            return cartrigeCount < 3;
            break;
        case "CE278A":
            return cartrigeCount < 3;
            break;
        case "Q7553A":
            return cartrigeCount < 3;
            break;
        case "TK-895":
            return cartrigeCount < 3;
            break;
        default:
            return false;
    }
}
