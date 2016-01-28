// The file has been created, saved into "/Style Library/OfficeDevices/"
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
var isColorFieldName = "IsColor";
var threshold = 5;

var currentUser = null;//df
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
                    ,
                    "_x041a__x0430__x0440__x0442__x04": {
                        View: renderCartrigeField,
                    },
                    "LinkTitle": {
                        View: renderName,
                    },
                    "_x0424__x0438__x043b__x0438__x04": {
                        View: renderFilial,
                    },
                    "IP_x002d__x0430__x0434__x0440__x": {
                        View: renderFilial,
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

    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/printersGelezn.js"), init);
    init();
  
 	function renderFilial(ctx) {
      if (ctx.CurrentItem[isColorFieldName] === "Да" && ctx.CurrentItem["Color"] !== "Black"){
      	return " ";
      }
      return  ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    }

    function renderName(ctx) {
 		if (ctx.CurrentItem[isColorFieldName] === "Да" && ctx.CurrentItem["Color"] != "Black"){
      		return " ";
      	}
        return ctx.CurrentItem["Title"]; 
    }

    function renderCartrigeField(ctx) {
        var value = ctx.CurrentItem[catridgeFieldName];
        if (ctx.CurrentItem[isColorFieldName] === "Да") {
            return ctx.CurrentItem[catridgeFieldName] + '&nbsp;<img src="http://server-sp-it/sites/wiki/Style%20Library/printers/img_colors/cartridge_' + ctx.CurrentItem["Color"] + '\.png" alt="Confidential Document" title="Confidential Document"/>';
        }
        return ctx.CurrentItem[catridgeFieldName];
    }

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


