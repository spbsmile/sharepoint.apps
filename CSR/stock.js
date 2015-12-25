// The file has been created, saved into "/Style Library/Market/"
// and attached to the XLV via JSLink property.

var rowIndex = 0;
var replaceDate = {};
var cartridgeCount = {};

var itemType;
var listTitle = "market";
var countFieldName = "Count";
var threshold = 5;
var replaceDateFieldName = "_x0414__x0430__x0442__x0430__x00";
//var listGuid = "4f71156b-0221-45e8-8166-7ccca783813f";
var siteUrl = "http://devsp/sites/testdev";

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function () {

    function getBaseHtml(ctx) {
        return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
    }

    function init() {

        itemType = GetItemTypeForListName(listTitle);

        SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

            // OnPreRender: function(ctx) { },

            Templates: {

                //     View: function(ctx) { return ""; },
                //     Header: function(ctx) { return ""; },
                //     Body: function(ctx) { return ""; },
                //     Group: function(ctx) { return ""; },
                //     Item: function(ctx) { return ""; },
                Fields: {
                    "Count": {
                        View: renderCountField,
                        //             EditForm: function(ctx) { return ""; },
                        //             DisplayForm: function(ctx) { return ""; },
                        //             NewForm: function(ctx) { return ""; }
                    },
                    "_x0417__x0430__x043c__x0435__x04": {
                        View: renderReplaceField,
                        //             EditForm: function(ctx) { return ""; },
                        //             DisplayForm: function(ctx) { return ""; },
                        //             NewForm: function(ctx) { return ""; }
                    }
                },
                // Footer: function(ctx) { return "Hello "; }
            },

            OnPostRender: function (ctx) {
                var rows = ctx.ListData.Row;
                for (var i = 0; i < rows.length; i++) {
                    var little = rows[i][countFieldName] <= 2;
                    console.log("hello postRender");
                    if (little) {
                        var rowElementId = GenerateIIDForListItem(ctx, rows[i]);
                        var tr = document.getElementById(rowElementId);
                        tr.style.backgroundColor = "#ada";//"#ada"; //#FF0000
                    }
                }
            },
            ListTemplateType: 100
        });
    }

    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/Market/market.js"), init);
    init();

    function renderReplaceField(ctx) {
        var fieldVal = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];

        var html = "";
        html += '<input type="button" value="Заменить" onClick="replaceAction(\'' + rowIndex + '\',\'' + fieldVal + '\')" />';
        html += "</input>";
        return html;
    }

    function renderCountField(ctx) {
        var fieldVal = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        var id = GenerateIIDForListItem(ctx, ctx.ListData.Row[rowIndex]);
        var itemID = id[(id.indexOf(",") + 1)];
        var html = "";
        html += '<input type="button" value=" \'' + fieldVal + '\'  " onClick="DisplayVersionHistory(\'' + itemID + '\')" />';
        html += "</input>";
        html += "</input>";
        html += "<div id ='modalWindow';  title=' Принтер:'>";
        html += "<div id='dialogText';  >";
        html += "";
        html += "</div>";
        html += "</div>";
        rowIndex = rowIndex + 1;
        return html;
    }
});

function replaceAction(itemID, value) {
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(listTitle);

    var oListItem = oList.getItemById(itemID);
    clientContext.load(oListItem, countFieldName);

    clientContext.executeQueryAsync(
        function () {
            oListItem.set_item(countFieldName, oListItem.get_item(countFieldName) - 1);
            oListItem.set_item(replaceDateFieldName, moment().format('LLL'));
            oListItem.update();
            clientContext.executeQueryAsync(function () {
                    console.log("success get count");
                },
                function () {
                    console.log("fail get count");
                });
            document.location.reload();
        },
        function () {
            console.log("fail get count");
        });
}

function DisplayVersionHistory(itemID) {

    if ($("#table").length === 0) {
        jQuery("#dialogText").append('<table border="1" id="table"> <caption>История изменений картриджей</caption><tr><th>Дата</th><th>Действие</th><th>Количество</th></tr></table>');
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
                if (i >= threshold)
                {
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
        strFieldName: countFieldName,
        completefunc: function (xData, Status) {
            $(xData.responseText).find("Version").each(function (i) {
                cartridgeCount[i] = $(this).attr(countFieldName);
                if (i >= threshold)
                {
                    return false;
                }
            });
        }
    });

    for (key in replaceDate) {
        $('#table').append("<tr><td>" + replaceDate[key] + "</td><td>Замена</td><td>" + cartridgeCount[key] + "</td></tr>");
        console.log(key);
    }

    $(function () {
        $("#modalWindow").dialog({
            width: 600,
            //modal: true,
            close: function (event, ui) {
                $("#table").remove();
            }
        });
    });
}

// Get List Item Type metadata
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}

