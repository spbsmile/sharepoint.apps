function clickDialogGetOut(itemID, itemName) {
    if ($("#dialogText" + itemID).length == 0) {
        $("#mdGetOut" + itemID).append('<div id ="dialogText' + itemID + '\";</div>');
    }
    jQuery("#dialogText" + itemID).append(
        '<label>Кому выдать:</label> ' +
        '<div> ' +
            '<input name="users" id="users" value="" /> <label>Количество:</label> ' +
                '<div> ' +
                    '<input id="countdevice' + itemID + '\" /> ' +
                '</div>' +
        '</div>' +
        'Комментарий:' +
        '<textarea id="comment" rows="4"  name="text"></textarea> ' +
        '<ul id="loaderDeviceOut" class="fa-ul" hidden="true"> <li>' +
            '<i class="fa-li fa fa-spinner fa-spin"></i>Подготовка</li>  ' +
        '</ul>'
    );
    $("input[name='users']").pickSPUser();
    isClosed = true;
    $(function () {
        $("#mdGetOut" + itemID).dialog({
            buttons: [
                {
                    text: "Выдать",
                    click: function () {
                        $("#loaderDeviceOut").show();
                        var h = $(this);
                        h.dialog('widget').find('button:last').prop('disabled', true);
                        console.log("hello get out ");
                        isClosed = false;

                        var clientContext = new SP.ClientContext(settings().siteUrl);
                        var list = clientContext.get_web().get_lists().getById(settings().listId);
                        var item = list.getItemById(itemID);

                        clientContext.load(item);

                        clientContext.executeQueryAsync(function () {
                                item.set_item(settings().remainFieldName, item.get_item(settings().remainFieldName) - parseInt($("#countdevice" + itemID).val()));
                                item.set_item(settings().numberofissuedFieldName, item.get_item(settings().numberofissuedFieldName) + parseInt($("#countdevice" + itemID).val()));
                                item.set_item(settings().getoutFieldName, parseInt($("#countdevice" + itemID).val()));
                                if ($("#users").val() === "") {
                                    console.log("empty");
                                    item.set_item(settings().reseivedFieldName, null);
                                } else {
                                    item.set_item(settings().reseivedFieldName, $("#users").val() + "_");
                                }
                                console.log($("#users").val() + "_");
                                item.set_item(settings().reseivedFieldName, $("#users").val() + "_");
                                item.set_item(settings().commentFieldName, $("#comment").val() + "_");
                                item.set_item(settings().actionFieldName, "Выдано");
                                item.set_item(settings().whogiveFieldName, currentUserId);
                                item.update();
                                clientContext.executeQueryAsync(
                                    function () {
                                        h.dialog('close');
                                        $("#loaderDeviceOut").hide();
                                        h.dialog('widget').find('button:last').prop('disabled', false);
                                        console.log("succes");
                                    },
                                    onQueryFailed);
                            },
                            onQueryFailed);
                    }
                }
            ],
            title: 'Выдать: ' + itemName,
            width: 600,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                $("#dialogText" + itemID).remove();
                console.log("inside close function");
                if (!isClosed) {
                    document.location.reload();
                }
            }
        });
    });
}