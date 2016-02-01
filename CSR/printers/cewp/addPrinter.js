/**
 * Created by Administrator on 31.01.2016.
 */

$(document).ready(function () {

    $("#dialogaddprinter").dialog({
        resizable: false,
        modal: true,
        width: 600,
        buttons: [{
            text: "Добавить",
            click: addPrinterToList
        }],
        autoOpen: false
    });

    $("#opendialogaddprinter").click(function () {

        $('#tblPrinterAppendGrid').appendGrid({
            caption: 'Данные принтера',
            initRows: 1,
            columns: [
                {
                    name: 'Filial',
                    display: 'Филиал',
                    type: 'text',
                    ctrlCss: {
                        width: '160px'
                    }

                },
                {
                    name: 'Name',
                    display: 'Имя',
                    type: 'text',
                    ctrlCss: {
                        width: '160px'
                    }
                },
                {
                    name: 'Ip',
                    display: 'Ip',
                    type: 'text',
                    ctrlCss: {
                        width: '140px'
                    }
                },
                {
                    name: 'Room',
                    display: 'Комната',
                    type: 'text'
                }
            ],
            hideButtons: {
                remove: true,
                removeLast: true,
                append: true,
                insert: true,
                moveUp: true,
                moveDown: true
            }
        });

        $('#tblCartridgeAppendGrid').appendGrid({
            caption: 'Названия картриджей',
            initRows: 4,
            columns: [
                {
                    name: 'Color',
                    display: 'Цвет',
                    type: 'text',
                    ctrlAttr: {
                        maxlength: 100,
                        readonly: "readonly"
                    },
                    ctrlCss: {
                        width: '100px'
                    }

                },
                {
                    name: 'Name',
                    display: 'Имя',
                    type: 'text',
                    ctrlCss: {
                        width: '160px'
                    }
                },
                {
                    name: 'NameFromExist',
                    display: 'Имя из существующих',
                    type: 'select',
                    ctrlOptions: {
                        0: '{Выбрать}',
                        1: ''
                    }
                }
            ],
            hideButtons: {
                remove: true,
                removeLast: true,
                append: true,
                insert: true,
                moveUp: true,
                moveDown: true
            }
        });
        $('#tblCartridgeAppendGrid').appendGrid('setCtrlValue', 'Color', 0, 'Синий');
        $('#tblCartridgeAppendGrid').appendGrid('setCtrlValue', 'Color', 1, 'Красный');
        $('#tblCartridgeAppendGrid').appendGrid('setCtrlValue', 'Color', 2, 'Желтый');
        $('#tblCartridgeAppendGrid').appendGrid('setCtrlValue', 'Color', 3, 'Черный');
        $("#dialogaddprinter").dialog("open");
    });

    function addPrinterToList() {

        var colors = ["Blue", "magenta", "Yellow", "Black"];
        var cartridges = [$('#tblCartridgeAppendGrid').appendGrid('getCtrlValue', 'Name', 0),
            $('#tblCartridgeAppendGrid').appendGrid('getCtrlValue', 'Name', 1),
            $('#tblCartridgeAppendGrid').appendGrid('getCtrlValue', 'Name', 2),
            $('#tblCartridgeAppendGrid').appendGrid('getCtrlValue', 'Name', 3)];

        var data = [];
        data.namePrinter = $('#tblPrinterAppendGrid').appendGrid('getCtrlValue', 'Name', 1);
        data.filial = $('#tblPrinterAppendGrid').appendGrid('getCtrlValue', 'Filial', 1);
        data.ip = $('#tblPrinterAppendGrid').appendGrid('getCtrlValue', 'Ip', 1);
        data.room = $('#tblPrinterAppendGrid').appendGrid('getCtrlValue', 'Room', 1);

        var index = 0;
        addValueChoiceRecursion(cartridges, index, cartridges.length, function () {
            var index = 0;
            addPrintersRecursion(settings().listId, data, colors, cartridges, index, cartridges.length);
        });
    }

    function addValueChoiceRecursion(cartridges, index, length, callback) {
        //todo extracted
        var context = new SP.ClientContext.get_current();
        var cldList = context.get_web().get_lists().getById(settings().listId);
        var categoryField = cldList.get_fields().getByInternalNameOrTitle(settings().catridgeFieldName);
        var categoryChoiceField = context.castTo(categoryField, SP.FieldChoice);
        //
        context.load(categoryChoiceField);

        context.executeQueryAsync(function () {
            console.log("execute outer " + index);
            //todo extracted
            var categoryChoices = categoryChoiceField.get_choices();
            var categoryTC = categoryChoices.filter(function (choice) {
                return choice === cartridges[index];
            });

            if (categoryTC.length == 0) {
            //
                categoryChoices.push(cartridges[index]);
                categoryChoiceField.set_choices(categoryChoices);
                categoryChoiceField.updateAndPushChanges();
                context.executeQueryAsync(function () {
                    index = ++index;
                    if (index < length) {
                        console.log("success addValueChoiceRecursion" + index + " index < length - 1");
                        addValueChoiceRecursion(cartridges, index, length, callback);
                    } else {
                        console.log("success addValueChoiceRecursion" + index + " else");
                        if (typeof callback === 'function' && callback) {
                            console.log("callback" + " typeof callback === 'function' && callback");
                            callback();
                        }
                    }
                }, onQueryFailed);
            }
        }, onQueryFailed);
    }

    function addPrintersRecursion(listId, data, colors, cartridges, index, length) {

        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + listId + "')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(getItemData(data.nameprinter, true, colors[index], cartridges[index], data.filial)),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (sender, args) {
                index = ++index;

                if (index < length) {
                    console.log("success " + index);
                    addPrintersRecursion(listId, data, colors, cartridges, index, length);
                } else {
                    location.reload();
                }
            },
            error: onQueryFailed
        });
    }

    function getItemData(namePrinter, isColor, color, choiceCartridge, choiceFilial) {
        var itemData = {
            "__metadata": {
                "type": "SP.Data.List3ListItem",
                "Title": "",
                "IsColor": "",
                "Color": "",
                "OData__x041a__x0430__x0440__x0442__x04": "",
                "OData__x0424__x0438__x043b__x0438__x04": ""
            },
            "Title": namePrinter,
            "IsColor": isColor,
            "Color": color,
            "OData__x041a__x0430__x0440__x0442__x04": choiceCartridge,
            "OData__x0424__x0438__x043b__x0438__x04": choiceFilial
        };
        return itemData;
    }


    // Display error messages.
    function onError(error) {
        console.log(error.responseText);
    }

    function onQueryFailed(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }
});