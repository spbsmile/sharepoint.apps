/**
 * Created by M_Zabiyakin on 29.01.2016.
 */
// The file has been created, saved into "/Style Library/OfficeDevices/"
// and attached to the XLV via JSLink property.


var listTypeAccepted;
var currentUserId = null;

SP.SOD.registerSod('SPClientTemplates', "http://devsp/sites/testdev/Style%20Library/corelibs/clienttemplates.js");
SP.SOD.registerSod('settings', "http://devsp/sites/testdev/Style%20Library/support/settings.js");

SP.SOD.loadMultiple(['SPClientTemplates', 'settings'], function () {

        function getBaseHtml(ctx) {
            return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
        }

        function init() {

            listTypeAccepted = getItemTypeForListName(settings().listTitle_AcceptedTasks);

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

        function renderAccept(ctx) {
            var d = [];
            d.id = ctx.CurrentItem.ID;
            d.d = ctx.CurrentItem["Data"];
            d.t = ctx.CurrentItem["Time"];
            d.dis = ctx.CurrentItem["Discription"];
            d.pri = ctx.CurrentItem["urgently"];
            d.cat = ctx.CurrentItem["category"];
            var authId = ctx.CurrentItem["kk"][0] ? ctx.CurrentItem["kk"][0].id : null;
            var lookupId = ctx.CurrentItem["attachfile"][0] ? ctx.CurrentItem["attachfile"][0].lookupId : null;
            var html = '';
            html += '<input type="button" value="Закрыть задачу" onClick="clickAcceptTask(\'' + d.id + '\',\'' + d.d + '\',\'' + d.t + '\',\'' + authId + '\',\'' + d.dis + '\',\'' + d.pri + '\',\'' + d.cat + '\',\'' + lookupId + '\')" />';

            return html;
        }

        RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/newTasks.js"), init);
        init();

    });

    function clickAcceptTask(itemId, d, time, authId, discription, priority, category, lookupId) {
        removeItem(itemId, settings().listId_NewTasks);
        moment.locale(window.navigator.userLanguage || window.navigator.language);
        var t = lookupId === "null" ? null : lookupId;
        var tt = authId === "null" ? null : authId;
        var itemData = {
            "__metadata": {
                "type": listTypeAccepted,
                "DateCreate": "",
                "TimeCreate": "",
                "Author0": "",
                "Discription": "",
                "Priority": "",
                "Category": "",
                "AttachFile": "",
                "WhoAccept": "",
                "timegettask": ""
            },

            "DateCreate": d,
            "TimeCreate": time,
            "Author0Id": tt,
            "Discription": discription,
            "Priority": priority,
            "Category": category,
            "AttachFileId": t,
            "WhoAcceptId": currentUserId,
            "timegettask": moment().format('LLL')
        };
        addItem(settings().listId_AcceptedTasks, itemData);
    }

// Get List Item Type metadata
    function getItemTypeForListName(name) {
        return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
    }

