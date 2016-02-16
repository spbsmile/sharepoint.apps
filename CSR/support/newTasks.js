// The file has been created, saved into "/Style Library/support/"
// and attached to the XLV via JSLink property.

var currentUserId = null;

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {
    
    InitMoment();

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

      OnPreRender: InitValueScripts,

      Templates: {

                Fields: {
                    "getTask": {
                        View: renderAccept,
                    }
                },
            },

      ListTemplateType: 100

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
    	SP.SOD.registerSod("moment.min.js", "/Style%20Library/corelibs/moment.min.js");
    	SP.SOD.registerSod("moment-with-locales.min.js", "/Style%20Library/corelibs/moment-with-locales.min.js");
    	SP.SOD.registerSod("moment-timezone.min.js", "/Style%20Library/corelibs/moment-timezone.min.js");
        SP.SOD.registerSodDep("moment-with-locales.min.js", "moment.min.js");
        SP.SOD.registerSodDep("moment-timezone.min.js", "moment-with-locales.min.js");
    	
     SP.SOD.loadMultiple(["moment.min.js", "moment-with-locales.min.js", "moment-timezone.min.js"],
        () => { 
            moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
            moment.locale(window.navigator.userLanguage || window.navigator.language);
        });
    
  }
  
  function renderAccept(ctx) {
    var d = [];
        d.id = ctx.CurrentItem.ID;
        d.d = ctx.CurrentItem["Data"];
        d.t = ctx.CurrentItem["Time"];
        d.dis = ctx.CurrentItem["Discription"];
        d.pri = ctx.CurrentItem["urgently"];
        d.cat = ctx.CurrentItem["category"];
        var authId = ctx.CurrentItem["kk"][0] ? ctx.CurrentItem["kk"][0].id : null;
        var lookupId = "";//ctx.CurrentItem["attachfile"][0] ? ctx.CurrentItem["attachfile"][0].lookupId : null;
    var html = '';    
    html += '<input type="button" value="Принять задачу" onClick="clickAcceptTask(\'' + d.id + '\',\'' + d.d + '\',\'' + d.t + '\',\'' + authId + '\',\'' + d.dis + '\',\'' + d.pri + '\',\'' + d.cat + '\',\'' + lookupId + '\')" />';
  	return html;
  }

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/support/newclaims.js"), init);
  init();

});

function clickAcceptTask(itemId, d, time, authId, discription, priority, category, lookupId) {
    removeItem(itemId, settings().listId_newClaims);
    var t = lookupId === "null" ? null : lookupId;
    var tt = authId === "null" ? null : authId;
    var itemData = {
        "__metadata": {
            "type": "SP.Data.List1ListItem",
            "DateCreate": "",
            "TimeCreate": "",
            "Author0": "",
            "Discription": "",
            "Priority": "",
            "Category": "",
           // "AttachFile": "",
            "WhoAccept": "",
            "timegettask": ""
        },

        "DateCreate": d,
        "TimeCreate": time,
        "Author0Id": tt,
        "Discription": discription,
        "Priority": priority,
        "Category": category,
       // "AttachFileId": t,
        "WhoAcceptId": currentUserId,
        "timegettask": moment().format('LLL')
    };
    addItem(settings().listId_acceptedClaims, itemData);
}

