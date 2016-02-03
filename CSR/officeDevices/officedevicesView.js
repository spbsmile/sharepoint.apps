// The file has been created, saved into "/Style Library/OfficeDevices/"
// and attached to the XLV via JSLink property.

var currentUserId = null ;
var isClosed = true;

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

    function getBaseHtml(ctx) {
        return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
    }

    function init() {
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

            OnPreRender: InitValueScripts,

            Templates: {
                Fields: {
                    "_x0414__x0435__x0439__x0441__x04": {
                        View: renderGetOut
                    }
                    ,
                    "_x0418__x0441__x0442__x043e__x04": {
                        View: renderViewHistory
                    }
                },
            },
            ListTemplateType: 100
        });
    }

    function InitValueScripts(renderCtx) {
        SP.SOD.executeOrDelayUntilScriptLoaded(loadContext, 'sp.js');
        function loadContext() {

            var context = SP.ClientContext.get_current();
            getCurrentUser(context, function (user) {
                currentUserId = user.get_id();
            });
        }
    }

    function renderGetOut(ctx) {
        var html = "";
        html += '<input type="button" value="Выдать" onClick="clickDialogGetOut(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem["Title"] + '\')" />';
        html += '<div id ="mdGetOut' + ctx.CurrentItem.ID + '\";>';
        html += '<div id="dialogText' + ctx.CurrentItem.ID + '\";  >';
        html += "</div>";
        html += "</div>";
        return html;
    }

    function renderViewHistory(ctx) {
        var html = "";
        html += '<input type="button" value="Посмотреть историю" onClick="clickViewHistory(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem["Title"] + '\')" />';
        html += '<div id ="mdViewHistory' + ctx.CurrentItem.ID + '\";>';
        html += '<div id="dialogTextHistory' + ctx.CurrentItem.ID + '\";>';
        html += "";
        html += "</div>";
        html += "</div>";
        return html;
    }

    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/devices.js"), init);
    init();
});

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
    moment.locale(window.navigator.userLanguage || window.navigator.language);
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

    $(function() {
        $("#mdViewHistory" + itemID).dialog({
            title: 'История выдачи: ' + itemName,
            width: 600,
            modal: true,
            resizable: false,
            close: function(event, ui) {
                $("#dialogTextHistory" + itemID).remove();
            }
        });
    });
}

function clickDialogGetOut(itemID, itemName) {
    if ($("#dialogText" + itemID).length == 0) {
        $("#mdGetOut" + itemID).append('<div id ="dialogText' + itemID + '\";</div>');
    }
    jQuery("#dialogText" + itemID).append('<label>Кому выдать:</label> <div> <input name="users" id="users" value="" /> <label>Количество:</label> <div> <input id="countdevice' + itemID + '\" /> </div></div>Комментарий:<textarea id="comment" rows="4"  name="text"></textarea>');
    $("input[name='users']").pickSPUser();
    isClosed = true;
    $(function() {
        $("#mdGetOut" + itemID).dialog({
            buttons: [
                {
                    text: "Выдать",
                    click: function() {

                        isClosed = false;

                        var clientContext = new SP.ClientContext(settings().siteUrl);
                        var list = clientContext.get_web().get_lists().getById(settings().listId);
                        var item = list.getItemById(itemID);
                        var h = $(this);
                        clientContext.load(item);

                        clientContext.executeQueryAsync(function() {
                                item.set_item(settings().remainFieldName, item.get_item(settings().remainFieldName) - parseInt($("#countdevice" + itemID).val()));
                                item.set_item(settings().numberofissuedFieldName, item.get_item(settings().numberofissuedFieldName) + parseInt($("#countdevice" + itemID).val()));
                                item.set_item(settings().getoutFieldName, parseInt($("#countdevice" + itemID).val()));
                                item.set_item(settings().reseivedFieldName, $("#users").val());
                                item.set_item(settings().commentFieldName, $("#comment").val() + "_");
                                item.set_item(settings().actionFieldName, "Выдано");
                                item.set_item(settings().whogiveFieldName, currentUserId);
                                item.update();
                                clientContext.executeQueryAsync(
                                    function()
                                    {
                                        h.dialog('close');
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
            close: function(event, ui) {
                $("#dialogText" + itemID).remove();
                console.log("inside close function");
                if (!isClosed) {
                    document.location.reload();
                }
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
        completefunc: function(xData, Status) {
            $(xData.responseText).find("Version").each(function(i) {
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
