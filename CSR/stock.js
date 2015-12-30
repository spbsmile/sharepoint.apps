// The file has been created, saved into "/Style Library/Printers/"
// and attached to the XLV via JSLink property.

var siteUrl = "http://server-sp-it/sites/wiki";

var replaceDate = {};
var cartridgeCount = {};

var itemType;
var listTitle = "Тестовый список";
var replaceDateFieldName = "_x0414__x0430__x0442__x0430__x00";
var replaceButtonFieldName = "_x0417__x0430__x043c__x0435__x04";
var catridgeFieldName = "_x041a__x0430__x0440__x0442__x04";
var catridgeCountFieldName = "_x041a__x043e__x043b__x0438__x04";
//var listGuid = "4f71156b-0221-45e8-8166-7ccca783813f";
var threshold = 5;

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
                    "_x041a__x043e__x043b__x0438__x04": {
                        View: renderCountField,
                    }
                },
            },
            // OnPostRender: function(ctx) { },
            ListTemplateType: 120
        });
    }

    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/Printers/printersView.js"), init);
    init();

    function renderReplaceField(ctx) {
        var html = "";
        html += '<input type="button" value="Заменить" onClick="replaceAction(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem[catridgeFieldName] + '\',\'' + ctx.CurrentItem[catridgeCountFieldName] + '\')" />';
        html += "</input>";
        return html;
    }

    function renderCountField(ctx) {
        var html = "";
        html += '<input type="button" value=" \'' + ctx.CurrentItem[ctx.CurrentFieldSchema.Name] + '\'   " onClick="DisplayVersionHistory(\'' + ctx.CurrentItem.ID + '\')" />';
        html += "</input>";
        html += "</input>";
        html += "<div id ='modalWindow';  title='Картридж:'>";
        html += "<div id='dialogText';  >";
        html += "";
        html += "</div>";
        html += "</div>";
        return html;
    }
});

function replaceAction(itemID, cartridgesName, cartridgesCount) {
    if (cartridgesCount >= 1) {
        var clientContext = new SP.ClientContext(siteUrl);
        var list = clientContext.get_web().get_lists().getByTitle(listTitle);

        var caml = new SP.CamlQuery();
        caml.set_viewXml("<View><Query>" +
            new CamlBuilder().Where()
                .LookupField(catridgeFieldName)
                .ValueAsText().In([cartridgesName])
                .ToString() +
            "</Query></View>");
        var collListItems = list.getItems(caml);

        clientContext.load(collListItems);

        clientContext.executeQueryAsync(function () {
                var enumerator = collListItems.getEnumerator();
                while (enumerator.moveNext()) {
                    var item = enumerator.get_current();
                    item.set_item(catridgeCountFieldName, cartridgesCount - 1);
                    if (item.get_id() == itemID) {
                        console.log(itemID + " item update");
                        item.set_item(replaceDateFieldName, moment().format('LLL'));
                    }
                    item.update();
                }
                clientContext.executeQueryAsync(function () {
                        console.log("success get count");
                    },
                    function () {
                        console.log("fail get count");
                    });
                document.location.reload();
            },
            onQueryFailed);
    }
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function DisplayVersionHistory(itemID) {

    if ($("#table").length === 0) {
        jQuery("#dialogText").append('<table border="1" id="table"> <caption>История изменений:</caption><tr><th>Дата</th><th>Действие</th><th>Количество</th></tr></table>');
    }

    $().SPServices({
        operation: "GetVersionCollection",
        async: false,
        strlistID: listTitle,
        strlistItemID: itemID,
        strFieldName: replaceDateFieldName,
        completefunc: function (xData, Status) {
            $(xData.responseText).find("Version").each(function (i) {
                replaceDate[i] = $(this).attr(replaceDateFieldName);
                if (i >= threshold) {
                    return false;
                }
            });
        }
    });

    $().SPServices({
        operation: "GetVersionCollection",
        async: false,
        strlistID: listTitle,
        strlistItemID: itemID,
        strFieldName: catridgeCountFieldName,
        completefunc: function (xData, Status) {
            $(xData.responseText).find("Version").each(function (i) {
                cartridgeCount[i] = $(this).attr(catridgeCountFieldName);
                if (i >= threshold) {
                    return false;
                }
            });
        }
    });

    for (key in cartridgeCount) {
        $('#table').append("<tr><td>" + replaceDate[key] + "</td><td>Замена</td><td>" + cartridgeCount[key] + "</td></tr>");
        console.log(key);
    }

    $(function () {
        $("#modalWindow").dialog({
            width: 600,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                $("#table").remove();
            }
        });
    });
}
