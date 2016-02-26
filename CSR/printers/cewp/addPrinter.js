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

    //init
    $(function () {
        addToTagSelectAllUniqueNamesCartrige("#selectNoColorCartridge", false);
        $('#tblCartridgeAppendGrid').hide();
        // handler on isColor printer
        $('#printerIsColor').change(function () {
            if ($('#printerIsColor').val() == 'Да') {
                $('#tblCartridgeAppendGrid').show();
                $('#noColorCartridgeGrid').hide();
                $('#countCartr').show();
            } else {
                $('#tblCartridgeAppendGrid').hide();
                $('#noColorCartridgeGrid').show();
                $('#countCartr').hide();
            }
        });
    });

    // handler on count color cartridge
    $('#countcolorsPrinter').change(function () {
        var currentCount = $('#tblCartridgeAppendGrid').appendGrid('getRowCount');
        var targetCount = $('#countcolorsPrinter').val();
        var delta = targetCount - currentCount;
        if (delta > 0) {
            $('#tblCartridgeAppendGrid').appendGrid('appendRow', delta);
            assignFieldsToCartridges(currentCount, delta);
        } else {
            for (var i = 0; i < (-delta); i++) {
                $('#tblCartridgeAppendGrid').appendGrid('removeRow', 0);
            }
        }
    });

    $("#opendialogaddprinter").click(function () {

        // common params of printer
        $('#tblPrinterAppendGrid').appendGrid({
            caption: 'Данные принтера',
            initRows: 1,
            columns: [
                {
                    name: 'Filial',
                    display: 'Филиал',
                    type: 'select',
                    ctrlCss: {
                        width: '160px'
                    },
                    ctrlOptions: 'Железноводская;Липовая;Уральская'
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
        initMetaColorCartridges(4);

        $("select#countcolorsPrinter").val("4");
        $("#dialogaddprinter").dialog("open");
    });

    function pushSelectValueToAll() {
        //tblCartridgeAppendGrid_NameFromExist_2
    }

    function assignFieldsToCartridges(startIndex, countCartridges) {
        for (var i = startIndex; i < startIndex + countCartridges; i++) {
            var color = colorsOrder(i);
            $('#tblCartridgeAppendGrid').appendGrid('setCtrlValue', 'Color', i, color);
            var index = i + 1;
            var id = "#tblCartridgeAppendGrid_NameFromExist_" + index;
            if ($(id).children('option').length > 1) continue;
            addToTagSelectAllUniqueNamesCartrige(id, true);
        }
    }

    function colorsOrder(index) {
        switch (index) {
            case 0:
                return '#0000FF';
                break;
            case 1:
                return '#FF0000';
                break;
            case 2:
                return '#FFFF00';
                break;
            case 3:
                return '#000000';
                break;
            case 4:
                return "#C0C0C0";
                break;
            case 5:
                return '#000000';
                break;
            case 6:
                return '#000000';
                break;
            default:
                return 6;
        }
    }

    // data cartridges of printer
    function initMetaColorCartridges(countCartridges) {
        $('#tblCartridgeAppendGrid').appendGrid({
            caption: 'Картриджы принтера',
            initRows: countCartridges,
            columns: [
                {
                    name: 'Color',
                    display: 'Цвет',
                    type: 'color'
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
                        0: '{Выбрать}'
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
        assignFieldsToCartridges(0, countCartridges);
    }

    function addPrinterToList() {
        $("#loaderAddPrinter").show();
        var isColor = $("#printerIsColor option:selected").text();

        var data = [];
        data.namePrinter = $('#tblPrinterAppendGrid').appendGrid('getCtrlValue', 'Name', 0);
        data.filial = $('#tblPrinterAppendGrid').appendGrid('getCtrlValue', 'Filial', 0);
        data.ip = $('#tblPrinterAppendGrid').appendGrid('getCtrlValue', 'Ip', 0);
        data.room = $('#tblPrinterAppendGrid').appendGrid('getCtrlValue', 'Room', 0);

        if (isColor === "Да") {
            //todo check on validate
            var countColorsPrinter = $('#tblCartridgeAppendGrid').appendGrid('getRowCount');
            var colors = [];
            var cartridges = [];
            for (var i = 0; i < countColorsPrinter; i++) {
                colors.push($('#tblCartridgeAppendGrid').appendGrid('getCtrlValue', 'Color', i));
                cartridges.push($('#tblCartridgeAppendGrid').appendGrid('getCtrlValue', 'Name', i));
            }

            pushNamesCartridgeToFieldChoiceRecursion(cartridges, 0, cartridges.length, function () {
                addItemPrinterCloneRecursion(settings().listId, data, colors, cartridges, 0, cartridges.length);
            });
        } else {
            //todo id
            addItemPrinterCloneRecursion(settings().listId, data, ["Black"], [$("#inputNewNoColorCartridge").val()], 0, 1);
        }
    }

    function pushNamesCartridgeToFieldChoiceRecursion(cartridges, index, length, callback) {
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
                        pushNamesCartridgeToFieldChoiceRecursion(cartridges, index, length, callback);
                    } else {
                        if (typeof callback === 'function' && callback) {
                            callback();
                        }
                    }
                }, onQueryFailed);
            } else {
                if (typeof callback === 'function' && callback) {
                    callback();
                }
            }
        }, onQueryFailed);
    }

    function addItemPrinterCloneRecursion(listId, data, colors, cartridges, index, length) {
        console.log(data.namePrinter);
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + listId + "')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(getItemData(data.namePrinter, true, colors[index], cartridges[index], data.filial, data.room, data.ip)),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (sender, args) {
                index = ++index;

                if (index < length) {
                    console.log("success " + index);
                    addItemPrinterCloneRecursion(listId, data, colors, cartridges, index, length);
                } else {
                    $("#loaderAddPrinter").hide();
                    location.reload();
                }
            },
            error: onQueryFailed
        });
    }

    // files:this, addcartridge. equal methods
    function addToTagSelectAllUniqueNamesCartrige(idSelector, isColor) {
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: {"Accept": "application/json; odata=verbose"},
            success: function (data) {
                var items = data.d.results;
                var cartridgesData = [];
                var cartridgeInternalField = "OData__x041a__x0430__x0440__x0442__x04";
                for (var i = 0; i < items.length; i++) {
                    if (!isColor && items[i]["IsColor"] || isColor && !items[i]["IsColor"]) {
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

    function getItemData(namePrinter, isColor, color, choiceCartridge, choiceFilial, room, ip) {
        var itemData = {
            "__metadata": {
                "type": "SP.Data.List3ListItem",
                "Title": "",
                "IsColor": "",
                "Color": "",
                "OData__x041a__x0430__x0440__x0442__x04": "",
                "OData__x0424__x0438__x043b__x0438__x04": ""//,
                //"_x041a__x043e__x043c__x043d__x04":""
            },
            "Title": namePrinter,
            "IsColor": isColor,
            "Color": color,
            "OData__x041a__x0430__x0440__x0442__x04": choiceCartridge,
            "OData__x0424__x0438__x043b__x0438__x04": choiceFilial//,
            // "_x041a__x043e__x043c__x043d__x04": room
        };
        return itemData;
    }
});
