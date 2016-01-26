// The file has been created, saved into "/Style Library/support/"
// and attached to the XLV via JSLink property.

var listAcceptedTasksId = "f64d55ca-ce5c-4172-8ec3-0ba826ee57da";
var listResolvedTasksId = "e0d22a1b-ac96-4005-b996-43c96f3b9472";

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({
     
      Templates: {

           Fields: {
             "closetask": {
                   View: renderClose,
              }
           },
      },
     

      ListTemplateType: 100

    });
  }
  
  function renderClose(ctx) {
        var html = "";
        html += '<input type="button" value="Закрыть задачу" onClick="clickCloseTask(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem["Title"] + '\')" />';
        return html;
    }
  

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/support/acceptedtasks.js"), init);
  init();

});

function clickCloseTask(itemId, title)
{
    console.log("close Task");
    //moveItem(itemId, listAcceptedTasksId, listResolvedTasksId);
}
