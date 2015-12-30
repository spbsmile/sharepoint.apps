// The file has been created, saved into "/Style Library/Printers/"
// and attached to the XLV via JSLink property.

var siteUrl = "http://server-sp-it/sites/wiki";

var replaceDate = {};
var cartridgeCount = {};
var action = {};

var listTitle = "�������� ������";
var replaceDateFieldName = "_x0414__x0430__x0442__x0430__x00";
var replaceButtonFieldName = "_x0417__x0430__x043c__x0435__x04";
var catridgeFieldName = "_x041a__x0430__x0440__x0442__x04";
var catridgeCountFieldName = "_x041a__x043e__x043b__x0438__x04";
var actionFieldName = "Action";

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
        html += '<input type="button" value="��������" onClick="clickReplaceButton(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem[catridgeFieldName] + '\',\'' + ctx.CurrentItem[catridgeCountFieldName] + '\')" />';
        html += "</input>";
        return html;
    }

    function renderCountField(ctx) {
        var html = "";
        html += '<input type="button" value=" \'' + ctx.CurrentItem[ctx.CurrentFieldSchema.Name] + '\'   " onClick="clickVersionButton(\'' + ctx.CurrentItem.ID + '\')" />';
        html += "</input>";
        html += "</input>";
        html += "<div id ='modalWindow';  title='��������:'>";
        html += "<div id='dialogText';  >";
        html += "";
        html += "</div>";
        html += "</div>";
        return html;
    }
});

function clickReplaceButton(itemID, cartridgesName, cartridgesCount) {
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

function clickVersionButton(itemID) {

    if ($("#table").length === 0) {
        jQuery("#dialogText").append('<table border="1" id="table"> <caption>������� ���������:</caption><tr><th>����</th><th>��������</th><th>����������</th></tr></table>');
    }

    RecordVersionCollection(replaceDate, itemID, replaceDateFieldName);

    RecordVersionCollection(cartridgeCount, itemID, catridgeCountFieldName);

    for (key in cartridgeCount) {
        $('#table').append("<tr><td>" + replaceDate[key] + "</td><td>������</td><td>" + cartridgeCount[key] + "</td></tr>");
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

function RecordVersionCollection(arrayData, itemId, fieldName)
{
    $().SPServices({
        operation: "GetVersionCollection",
        async: false,
        strlistID: listTitle,
        strlistItemID: itemId,
        strFieldName: fieldName,
        completefunc: function (xData, Status) {
            $(xData.responseText).find("Version").each(function (i) {
                arrayData[i] = $(this).attr(fieldName);
                if (i >= threshold) {
                    return false;
                }
            });
        }
    });
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}