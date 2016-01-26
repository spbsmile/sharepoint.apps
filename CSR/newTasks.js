// The file has been created, saved into "/Style Library/OfficeDevices/"
// and attached to the XLV via JSLink property.

var listNewTasksId = "4f71156b-0221-45e8-8166-7ccca783813f";
var listAcceptedTasksId = "e0b71fd6-9fbb-454b-85ee-d06b86a9de31";
var listTitleAcceptedTasks = "AcceptedTasksList";
var itemType;
var currentUserId = null ;
var siteUrl = "http://devsp/sites/testdev/";

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

    function getBaseHtml(ctx) {
        return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
    }

    function init() {

        itemType = getItemTypeForListName(listTitleAcceptedTasks);

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
            getCurrentUser(context, function(user) {
                currentUserId = user.get_id();
            });
        }
    }

    function renderAccept(ctx) {
        var d = [];
        d.id = ctx.CurrentItem.ID;
        d.d = ctx.CurrentItem["Data"];
        d.t = ctx.CurrentItem["Time"];
        d.auth = ctx.CurrentItem["kk"];
        d.dis = $(ctx.CurrentItem["Discription"]).text();
        d.pri = ctx.CurrentItem["urgently"];
        d.cat = ctx.CurrentItem["category"];
        d.att = ctx.CurrentItem["attachfile"];
        var lookupId = d.att[0] ? d.att[0].lookupId : null ;
        var html = "";
    
    
        var authId = d.auth[0].id;
        html += '<input type="button" value="Принять" onClick="clickAcceptTask(\'' + d.id + '\',\'' + d.d + '\',\'' + d.t + '\',\'' + authId + '\',\'' +  d.dis + '\',\'' + d.pri + '\',\'' + d.cat + '\',\'' + lookupId + '\')" />';
    
        return html;
    }
    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/newTasks.js"), init);
    init();

});

function clickAcceptTask(itemId, d, time, authId, discription, priority, category, lookupId)
{
    console.log(d + "  " + time + "  " + authId + "  " + discription + "  " + priority + "  " + category + "  " + lookupId);
    moveItem(itemId, d, time, authId, discription, priority, category, lookupId);
}

function moveItem(itemId, d, time, authId, discription, priority, category, lookupId)
{
    removeItem(itemId);
    addItem(d, time, authId, discription, priority, category, lookupId);
}

function removeItem(itemId)
{
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + "4f71156b-0221-45e8-8166-7ccca783813f" + "')/items(" + itemId + ")",
        type: "POST",
        contentType: "application/json;odata=verbose",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },

        success: function(sender, args) {
            console.log("hello remove item");
        },
        error: onError
    });
}


function addItem(d, time, authId, discription, priority, category, lookupId) {
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    var t = lookupId === "null" ? null  : lookupId;
    var item = {
        "__metadata": {
            "type": itemType,
            "DateCreate": "",
            "TimeCreate": "",
            "Author0": "",
            "Discription": "",
            "Priority": "",
            "Category": "",
            "AttachFile": "",
            "WhoAccept": "",
            "timegettask":""
        },

        "DateCreate": d,
        "TimeCreate": time,
        "Author0Id": authId,
        "Discription": discription,
        "Priority": priority,
        "Category": category,
        "AttachFileId": t,
        "WhoAcceptId": currentUserId,
        "timegettask": moment().format('LLL')
    };
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + "e0b71fd6-9fbb-454b-85ee-d06b86a9de31" + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function(sender, args) {
            location.reload();
        },
        error: onError
    });
}

// Display error messages. 
function onError(error) {
    console.log(error.responseText);
}

function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}


// Get List Item Type metadata
function getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}
