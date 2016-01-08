// The file has been created, saved into "/Style Library/"
// and attached to the XLV via JSLink property.

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
               }/*,
             "_x0418__x0441__x0442__x043e__x04": {
                    View: renderViewHistory
               }*/
           },
      },
      ListTemplateType: 100
    });
  }
/*  
  function renderViewHistory(ctx)
  {
        var html = "";
        html += '<input type="button" value="Посмотреть историю выдач" onClick="clickViewHistory(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem["Title"] + '\')" />';
        html += "<div id ='mdViewHistory';>";
        html += "</div>";
        return html;
  }
*/  
  function renderGetOut(ctx)
  {
        var html = "";
        html += '<input type="button" value="Выдать" onClick="clickDialogGetOut(\'' + ctx.CurrentItem.ID + '\')" />';
        html += "<div id ='mdGetOut';>";
        html += "</div>";
        return html;
  }

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/officedevices.js"), init);
  init();
});


function clickDialogGetOut(itemID, itemName)
{
  
  $(function () {
        $("#mdGetOut").dialog({
            title: 'Выдать: '+ itemName,
            width: 600,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                
            }
        });
    });
}
/*
function clickViewHistory(itemID, itemName)
{
  $(function () {
        $("#mdViewHistory").dialog({
            title: 'История: ' + itemName,
            width: 600,
            modal: true,
            resizable: false,
            close: function (event, ui) {
            }
        });
    });
} */
