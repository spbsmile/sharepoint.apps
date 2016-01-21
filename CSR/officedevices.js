// The file has been created, saved into "/Style Library/OfficeDevices/"
// and attached to the XLV via JSLink property.

var siteUrl = "http://server-sp-it/sites/wiki/";
var listTitle = "Офисная техника";
var listId = "ab3cc3f0-8ced-4862-bdac-c92b951ae72c";
var remainFieldName = "_x041e__x0441__x0442__x0430__x04";
var numberofissuedFieldName = "_x041e__x0431__x0449__x0435__x04";
var reseivedFieldName = "_x041a__x043e__x043c__x0443__x00";
//OData__x041a__x043e__x043c__x0443__x00
var getoutFieldName = "_x0412__x044b__x0434__x0430__x04";
var whogiveFieldName = "_x041a__x0442__x043e__x0020__x04";
var commentFieldName = "_x041a__x043e__x043c__x043c__x04";

var currentUser = null ;
var currentUserId = null ;

var remarkFieldName = "";
var timeFieldName = "";

var threshold = 20;

var isClosed = true;

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

    function getBaseHtml(ctx) {
        return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
    }

    function init() {
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

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
        html += '<input type="button" value="Посмотреть историю выдачи" onClick="clickViewHistory(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem["Title"] + '\')" />';
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

    if ($("#dialogTextHistory" + itemID).length === 0) {
        $("#mdViewHistory" + itemID).append('<div id ="dialogTextHistory' + itemID + '\";</div>');
    }
    jQuery("#dialogTextHistory" + itemID).append('<table border="1"> <thead><tr><th>Дата</th><th>Получатели</th><th>Количество выданных</th><th>Кто выдал</th><th>Комментарий</th></tr></thead> <tbody id="table' + itemID + '\"></tbody></table>');
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    RecordVersionCollection(getOutFeildsStorage, itemID, getoutFieldName);
    RecordVersionCollection(resievedFeildsStorage, itemID, reseivedFieldName);
    RecordVersionCollection(whogiveStorage, itemID, whogiveFieldName);
    RecordVersionCollection(commentStorage, itemID, commentFieldName);

    for (var i = 0; i <= threshold - 1; i++) {
        // (moment($(this).attr("Modified")) > moment("2016-01-11T10:04:24Z"))
        if (getOutFeildsStorage[i] == undefined) {
            if (i == 0) {
                jQuery("#dialogTextHistory" + itemID).remove();
            }
            break;
        }
        var person = (whogiveStorage[i] === undefined || whogiveStorage[i].value === undefined) ? "  " : whogiveStorage[i].value;
        var comment = (commentStorage[i] === undefined || commentStorage[i].value === undefined) ? "  " : commentStorage[i].value;
        $('#table' + itemID).append("<tr><td>" + getOutFeildsStorage[i].timeUpdate + "</td><td>" + resievedFeildsStorage[i].value + "</td><td>" + getOutFeildsStorage[i].value + "</td><td>" + person + "</td><td>" + comment + "</td></tr>");
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

                        var clientContext = new SP.ClientContext(siteUrl);
                        GetCurrentUser(clientContext, function(user) {
                            currentUserId = user.id;
                        })
                        var list = clientContext.get_web().get_lists().getById(listId);
                        var item = list.getItemById(itemID);
                        var h = $(this);
                        clientContext.load(item);
                        clientContext.executeQueryAsync(function() {
                                item.set_item(remainFieldName, item.get_item(remainFieldName) - parseInt($("#countdevice" + itemID).val()));
                                item.set_item(numberofissuedFieldName, item.get_item(numberofissuedFieldName) + parseInt($("#countdevice" + itemID).val()));
                                item.set_item(getoutFieldName, parseInt($("#countdevice" + itemID).val()));
                                item.set_item(reseivedFieldName, $("#users").val());
                                item.set_item(commentFieldName, $("#comment").val() + "_");
                                item.set_item(whogiveFieldName, currentUserId);
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
        strlistID: listId,
        strlistItemID: itemId,
        strFieldName: fieldName,
        completefunc: function(xData, Status) {
            $(xData.responseText).find("Version").each(function(i) {
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
