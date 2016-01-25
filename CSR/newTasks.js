// The file has been created, saved into "/Style Library/OfficeDevices/"
// and attached to the XLV via JSLink property.

var listNewTasksId = "4f71156b-0221-45e8-8166-7ccca783813f";
var listAcceptedTasksId = "e0b71fd6-9fbb-454b-85ee-d06b86a9de31";
var listTitleAcceptedTasks = "AcceptedTasksList";
var itemType;
var currentUserId = null;
var siteUrl = "http://devsp/sites/testdev/";

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {
    _spBodyOnLoadFunctionNames.push("Func"); 
	//SP.SOD.executeFunc("sp.js", 'SP.ClientContext', Func);
    itemType = getItemTypeForListName(listTitleAcceptedTasks);
   
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({


      Templates: {

           Fields: {
               "getTask": {
                   View: renderAccept,
   
              }
           },
      },

      ListTemplateType: 100

    });
    
    
   // setTimeout(Func, 3000);
    
  //  function addValue(){

    

//}
    
    
  }
  
  function Func()
  {
    console.log("hello");
    var cont = new SP.ClientContext(siteUrl);
    getCurrentUser(cont, function (user) {
        currentUserId = user.get_id();
    });
  }
  
   function renderAccept(ctx) {
        var d = [];
        d.d = ctx.CurrentItem["Data"]; 
        d.t = ctx.CurrentItem["Time"];
        d.auth = ctx.CurrentItem["kk"];
        d.dis = ctx.CurrentItem["Discription"];
        d.pri = ctx.CurrentItem["urgently"];
        d.cat = ctx.CurrentItem["category"];
        d.att = ctx.CurrentItem["attachfile"];
        console.log(d.d);
        var lookupId = d.att[0]?d.att[0].lookupId:null;
        var html = "";
        var discr = $(d.dis).text();
     	var authId = d.auth[0].id;  
        html += '<input type="button" value="?YNˆ????N?N‚N?" onClick="clickAcceptTask(\'' + d.d + '\',\'' +  d.t +'\',\'' +  authId   +'\',\'' +  discr +'\',\'' +  d.pri  +'\',\'' +  d.cat +'\',\'' +  lookupId  + '\')" />';
        return html;
   }

   RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/newTasks.js"), init);
   init();

});

function clickAcceptTask(d, time, authId, discription, priority, category, lookupId)
{
  var cont = new SP.ClientContext(siteUrl);
  
  
  console.log(d + "  " + time + "  " + authId + "  " + discription + "  " + priority + "  " + category + "  " + lookupId);  
  moveItem(d, time, authId, discription, priority, category, lookupId);  
}

function moveItem(d, time, authId, discription, priority, category, lookupId)
{
  	console.log("add item");
	//document.reload();
    // removeItem(itemId, fromListId);
    //addItem();
    addItem(d, time, authId, discription, priority, category, lookupId);
}


function addItem(d, time, authId, discription, priority, category, lookupId) {
   console.log(currentUserId);
   console.log(time + "inside add item");
  	var item = {
        "__metadata": {
            "type": itemType,
        
          //"Date":"",
          "Time":"",
          "Author0":"",
          "Discription":"",
          "Priority":"",
          "Category":"",
         // "AttachFile":""//,
          "WhoAccept":""
        },
     
          //"Date": d,
          "Time": time,
          "Author0Id": authId,
          "Discription": discription,
          "Priority": priority,
          "Category": category,
          //"AttachFileId": lookupId//,
          "WhoAcceptId": currentUserId
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
        success: function (sender, args) {
            
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
