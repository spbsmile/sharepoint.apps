// The file has been created, saved into "/Style Library/Printers/"
// and attached to the XLV via JSLink property.

var siteUrl = "http://server-sp-it/sites/wiki";

var listId = "629c7c86-dd24-4337-b01a-48a6da811cc5";
var replaceDateFieldName = "_x0414__x0430__x0442__x0430__x00";
var replaceButtonFieldName = "_x0417__x0430__x043c__x0435__x04";
var catridgeFieldName = "_x041a__x0430__x0440__x0442__x04";
var catridgeCountFieldName = "_x041a__x043e__x043b__x0438__x04";
var whogiveFieldName = "_x041a__x0442__x043e__x0020__x04";
var commentFieldName = "_x041a__x043e__x043c__x043c__x04";
var actionFieldName = "Action";
var threshold = 5;

var currentUser = null;
var currentUserId = null;

var isClosed = true;

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function () {

    function getBaseHtml(ctx) {
        return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
    }

    function init() {
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides({
            Templates: {
                Fields: {
                    "_x0417__x0430__x043c__x0435__x04": {
                        View: renderReplaceField,
                    },
                    "_x0414__x0430__x0442__x0430__x00": {
                        View: renderVersionsField,
                    }
                },
            },
            OnPostRender: function (ctx) {
                var rows = ctx.ListData.Row;
                for (var i = 0; i < rows.length; i++) {
                    if (IsCriticalCount(rows[i][catridgeFieldName], rows[i][catridgeCountFieldName])) {
                        var rowElementId = GenerateIIDForListItem(ctx, rows[i]);
                        var tr = document.getElementById(rowElementId);
                        if (tr != null) {
                            tr.style.backgroundColor = "#ada";//"#ada"; //#FF0000
                        }
                    }
                }
            },
            ListTemplateType: 120
        });
    }

    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/Printers/printersView.js"), init);
    init();

    function renderReplaceField(ctx) {
        var html = "";
        html += '<input type="button" value="Заменить" onClick="clickReplaceButton(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem[catridgeFieldName] + '\',\'' + ctx.CurrentItem[catridgeCountFieldName] + '\')" />';
        html += '<div id ="modalReplaceWindow' + ctx.CurrentItem.ID + '\";>';
        html += '<div id="dialogTextReplace' + ctx.CurrentItem.ID + '\";>';
        html += "";
        html += "</div>";  
        return html;
    }

    function renderVersionsField(ctx) {
        var html = "";
        html += '<input type="button" value="' + ctx.CurrentItem[ctx.CurrentFieldSchema.Name] + '\" onClick="clickVersionButton(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem[catridgeFieldName] + '\')" />';
        html += '<div id ="modalWindow' + ctx.CurrentItem.ID + '\";>';
        html += '<div id="dialogText' + ctx.CurrentItem.ID + '\";>';
        html += "";
        html += "</div>";
        html += "</div>";
        return html;
    }
});

function clickReplaceButton(itemID, cartridgesName, cartridgesCount) {

    if (cartridgesCount >= 1) {
        if ($("#dialogTextReplace" + itemID).length == 0) {
            $("#modalReplaceWindow" + itemID).append('<div id ="dialogTextReplace' + itemID + '\";</div>');
        }
        jQuery("#dialogTextReplace" + itemID).append('<label>Кому выдать:</label> <div> <input name="users" id="users" value="" /> Комментарий:<textarea id="comment" rows="4" name="text"></textarea>');
        $("input[name='users']").pickSPUser();
        var clientContext = new SP.ClientContext(siteUrl);
        var list = clientContext.get_web().get_lists().getById(listId);
        isClosed = true;
      
        $(function () {
            $("#modalReplaceWindow" + itemID).dialog({
                buttons: [
                    {
                        text: "Заменить",
                        click: function () {
                          
                            isClosed = false;
                            CallClientOM();

                            var caml = queryByUniqueTitle(catridgeFieldName, cartridgesName);
                            var collListItems = list.getItems(caml);

                            clientContext.load(collListItems);

                            clientContext.executeQueryAsync(function () {
                                    var enumerator = collListItems.getEnumerator();
                                    while (enumerator.moveNext()) {
                                        var item = enumerator.get_current();
                                        item.set_item(catridgeCountFieldName, cartridgesCount - 1);
                                        item.set_item(actionFieldName, "Замена");
                                        item.set_item(commentFieldName, $("#comment").val() + "Выдан: " + $("#users").val());
                                        item.set_item(whogiveFieldName, currentUserId);
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
    jQuery("#dialogText" + itemID).append('<table border="1"> <caption>История изменений:</caption> <thead><tr><th>Дата</th><th>Действие</th><th>Количество</th><th>Кто выдал</th><th>Комментарий</th></tr></thead> <tbody id="table' + itemID + '\"></tbody></table>');
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    RecordVersionCollection(cartridgeCountStorage, itemID, catridgeCountFieldName);
    RecordVersionCollection(actionStorage, itemID, actionFieldName);
    RecordVersionCollection(whogiveStorage, itemID, whogiveFieldName);
    RecordVersionCollection(commentStoage, itemID, commentFieldName);

    for (var i = 0; i <= threshold - 1; i++) {
        var localAction = actionStorage[i] === undefined ? "Замена" : actionStorage[i].value;
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

function CallClientOM() {
    var context = new SP.ClientContext.get_current();
    var web = context.get_web();
    currentUser = web.get_currentUser();
    context.load(currentUser);
    context.executeQueryAsync(onQuerySucceeded, onQueryFailed);
}

function onQuerySucceeded(sender, args) {
    currentUserId = currentUser.get_id();
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
