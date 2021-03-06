// The file has been created, saved into "/Style Library/support/"
// and attached to the XLV via JSLink property.

var itemType;
SP.SOD.registerSod('SPClientTemplates', "http://devsp/sites/testdev/Style%20Library/corelibs/clienttemplates.js");
SP.SOD.registerSod('settings', "http://devsp/sites/testdev/Style%20Library/support/settings.js");

SP.SOD.loadMultiple(['SPClientTemplates', 'settings'], function () {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {
    
    console.log("hello !" + settings().listTitle_ResolvedTasks);
    itemType = getItemTypeForListName(settings().listTitle_ResolvedTasks);
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
    	
    	var d = [];
        d.id = ctx.CurrentItem.ID;
        d.d = ctx.CurrentItem["DateCreate"];
        d.t = ctx.CurrentItem["TimeCreate"];
        var authId = ctx.CurrentItem["Author0"][0] ? ctx.CurrentItem["Author0"][0].id: null;
        var whoItId = ctx.CurrentItem["WhoAccept"][0] ? ctx.CurrentItem["WhoAccept"][0].id: null;
        d.dis = ctx.CurrentItem["Discription"];
        
        var html = "";
        html += '<input type="button" value="������� ������" onClick="clickCloseTask(\'' + d.id + '\',\'' + d.d + '\',\'' + d.t + '\',\'' +   authId + '\',\'' +  d.dis + '\',\'' +  whoItId + '\')" />';
        return html;
    }
  

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/support/acceptedtasks.js"), init);
  init();

});

function clickCloseTask(itemId, d, time, authId, discription, whoResolved)
{
    removeItem(itemId, settings().listId_AcceptedTasks);
    var itemData = {
        "__metadata": {
            "type": itemType,
            "Date": "",
            "Author0": "",
            "Discription": "",
            "WhoResolved":""//,
          	//"DateAccept": "",
        	//"Score":
			//"CommEmpIT"
        	//"CommAuthor
        },

        "Date": d,
        "Author0Id": authId,
        "Discription": discription,
        "WhoResolvedId": whoResolved
        //"DateAccept": ""
        //"Score":
		//"CommEmpIT"
        //"CommAuthor"
    };
    addItem(settings().listId_ResolvedTasks, itemData);
}

// Get List Item Type metadata
function getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}
