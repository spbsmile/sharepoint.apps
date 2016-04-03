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
    
    InitMoment();

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({
      
      		OnPreRender: InitValueScripts,
      
            Templates: {
                Header: renderHeaderTemplateWithAllViewsMenu,
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
                    },
                  "_x041a__x043e__x043c__x043d__x04":{
                     View: renderFilialP,
                  },
                  "URL":{
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
  
  function InitMoment()
  {
    	SP.SOD.registerSod("moment.min.js", "http://server-sp-it/sites/wiki/Style%20Library/corelibs/moment.min.js");
    	SP.SOD.registerSod("moment-with-locales.min.js", "http://server-sp-it/sites/wiki/Style%20Library/corelibs/moment-with-locales.min.js");
    	SP.SOD.registerSod("moment-timezone.min.js", "http://server-sp-it/sites/wiki/Style%20Library/corelibs/moment-timezone.min.js");
        SP.SOD.registerSodDep("moment-with-locales.min.js", "moment.min.js");
        SP.SOD.registerSodDep("moment-timezone.min.js", "moment-with-locales.min.js");
    	
     SP.SOD.loadMultiple(["moment.min.js", "moment-with-locales.min.js", "moment-timezone.min.js"],
        () => { 
            moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
            moment.locale(window.navigator.userLanguage || window.navigator.language);
        });
    
  }
                   
   function renderHeaderTemplateWithAllViewsMenu(renderCtx, fRenderHeaderColumnNames){
    	var viewData = eval(renderCtx.ListSchema.ViewSelectorPivotMenuOptions);
    	ClientPivotControl.prototype.SurfacedPivotCount = viewData.length -3; //display all View options except 'Create View' & 'Modify View'   
    	return RenderHeaderTemplate(renderCtx, fRenderHeaderColumnNames); //render default Header template
	}                       

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/printersDefault.js"), init);
  init();
  
  function renderFilialP(ctx) {
       if (ctx.CurrentItem["IsColor"] === "Да" && ctx.CurrentItem["Color"] !== "Black" && ctx.CurrentItem["Color"] !== "#000000"){
      	 return " ";
       }
    	var curName = ctx.CurrentItem[settings().roomFieldName];
        var row = getItemIdxByID(ctx.ListData.Row, ctx.CurrentItem.ID);
        var prevName = "";
        var nextName = "";
        if (row != 0 && row < ctx.ListData.Row.length -1){
           prevName = ctx.ListData.Row[row - 1][settings().roomFieldName]; 
           nextName = ctx.ListData.Row[row + 1][settings().roomFieldName]; 
        }
    	if (curName == prevName && ctx.CurrentItem["Color"] === "#000000" ){
    		return " ";
        }
    	return ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    }

	function getItemIdxByID(b, c) {
   	  for (var a = 0; a < b.length; a++)if (b[a].ID == c) return a;
   	  return -1
	}
	
    function renderName(ctx) {
 		if (ctx.CurrentItem["IsColor"] === "Да" && ctx.CurrentItem["Color"] !== "Black" && ctx.CurrentItem["Color"] !== "#000000"){
      		return " ";
      	}
        var curName = ctx.CurrentItem[settings().roomFieldName];
        var row = getItemIdxByID(ctx.ListData.Row, ctx.CurrentItem.ID);
        var prevName = "";
        var nextName = "";
        if (row != 0 && row < ctx.ListData.Row.length -1){
           prevName = ctx.ListData.Row[row - 1][settings().roomFieldName]; 
           nextName = ctx.ListData.Row[row + 1][settings().roomFieldName]; 
        }
    	if (curName == prevName && ctx.CurrentItem["Color"] === "#000000" ){
    		return " ";
        }
        return ctx.CurrentItem["Title"]; 
    }

    function renderCartrigeField(ctx) {
        if (ctx.CurrentItem["IsColor"] === "Да") {
          if (ctx.CurrentItem[settings().catridgeFieldName] ==="Тестовый вариант"){
         console.log("тестовый вариант");
         return ctx.CurrentItem[settings().catridgeFieldName] + '&nbsp; <i style="color:' + ctx.CurrentItem["Color"] + '\" class="fa fa-file-text" alt="Цвет Картриджа" title="Цвет Картриджа"></i>'; 
   
        }
          return ctx.CurrentItem[settings().catridgeFieldName] + '&nbsp; <i style="color:' + ctx.CurrentItem["Color"] + '\" class="fa fa-file-text" alt="Цвет Картриджа" title="Цвет Картриджа"></i>'; 
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



