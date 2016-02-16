/**
 * Created by Administrator on 07.02.2016.
 */

function clickReplaceButton(itemID, cartridgesName, cartridgesCount, isColor) {
    if (cartridgesCount >= 1) {
        if ($("#dialogTextReplace" + itemID).length == 0) {
            $("#modalReplaceWindow" + itemID).append('<div id ="dialogTextReplace' + itemID + '\";</div>');
        }
        jQuery("#dialogTextReplace" + itemID).append('<label>Кому выдать:</label> <div> <input name="users" id="users" value="" /> Комментарий:<textarea id="comment" rows="4" name="text"></textarea>');
        $("input[name='users']").pickSPUser();
        var clientContext = new SP.ClientContext(settings().siteUrl);
        var list = clientContext.get_web().get_lists().getById(settings().listId);
        isClosed = true;

        $(function () {
            $("#modalReplaceWindow" + itemID).dialog({
                buttons: [
                    {
                        text: "Заменить",
                        click: function () {

                            isClosed = false;

                            var caml = queryByUniqueTitle(settings().catridgeFieldName, cartridgesName);
                            var collListItems = list.getItems(caml);

                            clientContext.load(collListItems);

                            clientContext.executeQueryAsync(function () {
                                    var enumerator = collListItems.getEnumerator(); 
                                    while (enumerator.moveNext()) {
                                        var item = enumerator.get_current();

                                        if (isColor && item.get_item("IsColor") === "Нет" || !isColor && item.get_item("IsColor") === "Да") {
                                            continue;
                                        }
                                        
                                        item.set_item(settings().catridgeCountFieldName, cartridgesCount - 1);
                                        item.set_item(settings().actionFieldName, "Замена");
                                        var addtext = $("#users").val() === "" ? "" : "Выдан: " + $("#users").val();
                                        item.set_item(settings().commentFieldName, $("#comment").val() + addtext + "_");
                                        item.set_item(settings().whogiveFieldName, currentUserId);
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
                title: 'Заменить картридж: ' + cartridgesName,
                width: 600,
                modal: true,
                resizable: false,
                close: function (event, ui) {
                    $("#dialogTextReplace" + itemID).remove();
                    if (!isClosed) {
                        document.location.reload();
                    }
                }
            });
        });
    }
}
