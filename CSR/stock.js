// The file has been created, saved into "/Style Library/Printers/"
// and attached to the XLV via JSLink property.


var replaceDate = {};
var cartridgeCount = {};

var itemType;
var listTitle = "�������� ������";
var countFieldName = "_x041a__x043e__x043b__x0438__x04";
var replaceDateFieldName = "";
var replaceButtonFieldName = "_x0417__x0430__x043c__x0435__x04";
//var listGuid = "4f71156b-0221-45e8-8166-7ccca783813f";
var siteUrl = "http://server-sp-it/sites/wiki";
var threshold = 5;
var rowIndex = 0;

var cars = ["1", "2", "3"];


SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function () {

    function getBaseHtml(ctx) {
        return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
    }

    function init() {

        SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

            // OnPreRender: function(ctx) { },

            Templates: {

                //     View: function(ctx) { return ""; },
                //     Header: function(ctx) { return ""; },
                //     Body: function(ctx) { return ""; },
                //     Group: function(ctx) { return ""; },
                //     Item: function(ctx) { return ""; },
                Fields: {
                    "_x0417__x0430__x043c__x0435__x04": {
                        View: renderReplaceField,
                        //             EditForm: function(ctx) { return ""; },
                        //             DisplayForm: function(ctx) { return ""; },
                        //             NewForm: function(ctx) { return ""; }
                    },
                    "_x041a__x043e__x043b__x0438__x04": {
                        View: renderCountField,
                        //             EditForm: function(ctx) { return ""; },
                        //             DisplayForm: function(ctx) { return ""; },
                        //             NewForm: function(ctx) { return ""; }
                    }
                },
                Footer: function (ctx) {
                    return "Hello";
                }

            },

            // OnPostRender: function(ctx) { },

            ListTemplateType: 120

        });
    }

    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/Printers/printersView.js"), init);
    init();

    function renderReplaceField(ctx) {
        var fieldVal = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];

        var html = "";
        html += '<input type="button" value="��������" onClick="replaceAction(\'' + rowIndex + '\',\'' + fieldVal + '\')" />';
        html += "</input>";
        return html;
    }

    function renderCountField(ctx) {
        var fieldVal = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        var str = fieldVal.toString();
        console.log(ctx.CurrentItem.ID);
        var i = 0;
        var id = GenerateIIDForListItem(ctx, ctx.ListData.Row[cars[i]]);
        //var fieldVal = 0;
        var itemID = 1;//id[(id.indexOf(",") + 1)];
        var html = "";
        html += '<input type="button" value=" \'' + fieldVal + '&quot;  " onClick="DisplayVersionHistory(\'' + itemID + '\')" />';
        html += "</input>";
        html += "</input>";
        html += "<div id ='modalWindow';  title=' �������:'>";
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
            if (oListItem.get_item(countFieldName) >= 1) {
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
            }
        },
        function () {
            console.log("fail get count");
        });
}

function DisplayVersionHistory(itemID) {

  	//console.log(GetItemID);
  
    if ($("#table").length === 0) {
        jQuery("#dialogText").append('<table border="1" id="table"> <caption>������� ��������� ����������</caption><tr><th>����</th><th>��������</th><th>����������</th></tr></table>');
    }

   /* $().SPServices({
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
        strFieldName: countFieldName,
        completefunc: function (xData, Status) {
            $(xData.responseText).find("Version").each(function (i) {
                cartridgeCount[i] = $(this).attr(countFieldName);
                if (i >= threshold) {
                    return false;
                }
            });
        }
    });

    for (key in replaceDate) {
        $('#table').append("<tr><td>" + replaceDate[key] + "</td><td>������</td><td>" + cartridgeCount[key] + "</td></tr>");
        console.log(key);
    } */

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
