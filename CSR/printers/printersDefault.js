// The file has been created, saved into "/Style Library/OfficeDevices/"
// and attached to the XLV via JSLink property.

var catridgeFieldName = "_x041a__x0430__x0440__x0442__x04";
var catridgeCountFieldName = "_x041a__x043e__x043b__x0438__x04";

var currentUserId = null;

var isClosed = true

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({
      
      		OnPreRender: InitValueScripts,
      
            Templates: {
                Fields: {
                    "_x0417__x0430__x043c__x0435__x04": {
                        View: renderReplaceField,
                    },
                    "_x0414__x0430__x0442__x0430__x00": {
                        View: renderVersionsField,
                    },
                    "_x041a__x0430__x0440__x0442__x04": {
                        View: renderCartrigeField,
                    },
                    "LinkTitle": {
                        View: renderName,
                    },
                    "_x0424__x0438__x043b__x0438__x04": {
                        View: renderFilialP,
                    },
                    "IP_x002d__x0430__x0434__x0440__x": {
                        View: renderFilialP,
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
  
  function InitValueScripts(renderCtx) {
        SP.SOD.executeOrDelayUntilScriptLoaded(loadContext, 'sp.js');
        function loadContext() {
            var context = SP.ClientContext.get_current();
            getCurrentUser(context, function (user) {
                currentUserId = user.get_id();
            });
        }
    }

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/printersDefault.js"), init);
  init();
  
  function renderFilialP(ctx) {
      if (ctx.CurrentItem["IsColor"] === "Да" && ctx.CurrentItem["Color"] !== "Black"){
      	return " ";
      }
      return  ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    }

    function renderName(ctx) {
 		if (ctx.CurrentItem["IsColor"] === "Да" && ctx.CurrentItem["Color"] !== "Black"){
      		return " ";
      	}
        return ctx.CurrentItem["Title"]; 
    }

    function renderCartrigeField(ctx) {
        if (ctx.CurrentItem["IsColor"] === "Да") {
            return ctx.CurrentItem[settings().catridgeFieldName] + '&nbsp;<img src="http://server-sp-it/sites/wiki/Style%20Library/printers/img_colors/cartridge_' + ctx.CurrentItem["Color"] + '\.png" alt="Confidential Document" title="Confidential Document"/>';
        }
        return ctx.CurrentItem[settings().catridgeFieldName];
    }

    function renderReplaceField(ctx) {
        var html = "";
        html += '<input type="button" value="Заменить" onClick="clickReplaceButton(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem[settings().catridgeFieldName] + '\',\'' + ctx.CurrentItem[settings().catridgeCountFieldName] + '\',\'' + ctx.CurrentItem["IsColor"] + '\')" />';
        html += '<div id ="modalReplaceWindow' + ctx.CurrentItem.ID + '\";>';
        html += '<div id="dialogTextReplace' + ctx.CurrentItem.ID + '\";>';
        html += "";
        html += "</div>";
        return html;
    }

    function renderVersionsField(ctx) {
     
        var html = "";
        html += '<input type="button" value="' + ctx.CurrentItem[ctx.CurrentFieldSchema.Name] + '\" onClick="clickVersionButton(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem[settings().catridgeFieldName] + '\')" />';
        html += '<div id ="modalWindow' + ctx.CurrentItem.ID + '\";>';
        html += '<div id="dialogText' + ctx.CurrentItem.ID + '\";>';
        html += "";
        html += "</div>";
        html += "</div>";
        return html;
    }

});
 

