// The file has been created, saved into "/Style Library/Market/"
// and attached to the XLV via JSLink property.

var rowIndex = 0;
var replaceAction = {};
var cartridgeCount = {};
//var replaceColumnName = "_x0417__x0430__x043c__x0435__x04";

var itemType;
var listName = "market";
//var listGuid = "4f71156b-0221-45e8-8166-7ccca783813f";

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {
    
    itemType = GetItemTypeForListName(listName);
    
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

      // OnPreRender: function(ctx) { },

      Templates: {

      //     View: function(ctx) { return ""; },
      //     Header: function(ctx) { return ""; },
      //     Body: function(ctx) { return ""; },
      //     Group: function(ctx) { return ""; },
      //     Item: function(ctx) { return ""; },
             Fields: {
               "Count": {
                   View: renderView,
      //             EditForm: function(ctx) { return ""; },
      //             DisplayForm: function(ctx) { return ""; },
      //             NewForm: function(ctx) { return ""; }
               },
                "_x0417__x0430__x043c__x0435__x04": {
                   View: renderReplace,
      //             EditForm: function(ctx) { return ""; },
      //             DisplayForm: function(ctx) { return ""; },
      //             NewForm: function(ctx) { return ""; }
               }
           },
         	// Footer: function(ctx) { return "Hello "; }
      },

      // OnPostRender: function(ctx) { },

      ListTemplateType: 100

    });
  }

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/Market/market.js"), init);
  init();
  
   function renderReplace(ctx)
   {
       var fieldVal = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
       var html = "";
       html += '<input type="button" value="Заменить" onClick="DecreaseCount(\''+ rowIndex +'\',\''+ fieldVal +'\')" />';
       html += "</input>";
      
       return html;
   }
  
   function renderView(ctx)
   {
        var fieldVal = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
      	var id = GenerateIIDForListItem(ctx, ctx.ListData.Row[rowIndex]);
    	var temp = id[(id.indexOf(",")+1)];
      
        var html = "";
        //html += "<input type='button' value=" \ + fieldVal + \"  />";
        html += '<input type="button" value=" \'' + fieldVal + '\'  " onClick="DisplayVersionHistory(\'' + temp + '\')" />';
        html += "</input>";
        html += "</input>";
        html += "<div id ='modalWindow';  title=' Принтер:'>";

        html +="<div id='dialogText';  >";
        html += "";
        html += "</div>";
        html += "</div>";
        rowIndex = rowIndex + 1;

        return html;
    }
});

function DecreaseCount(itemID, value) {

    var payload = {
      "__metadata": { "type": "SP.Data.SurveysListItem" }, 
      "Count": value};
    var p = $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('market')/items(" + itemID + ")",
        method: "POST",
        data: JSON.stringify(payload),
        contentType: "application/json;odata=nometadata",
        headers: {
            "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*"
        }
    });
}



function DisplayVersionHistory(itemID)
{
    console.log(itemID + " v");

	if ($("#table").length === 0)
    {
        jQuery("#dialogText").append('<table border="1" id="table"> <caption>История изменений картриджей</caption><tr><th>Дата</th><th>Действие</th><th>Количество</th></tr></table>');
    }

  
    $().SPServices({
        operation: "GetVersionCollection",
        async: false,
        strlistID: listName,
        strlistItemID: itemID,
        strFieldName: "view",
        completefunc: function (xData, Status) {
            $(xData.responseText).find("Version").each(function(i) {
                var currentValue = $(this).attr("view");
                replaceAction[i] = currentValue;
            });
        }
    });
    

    $().SPServices({
     	operation: "GetVersionCollection",
     	async: false,
     	strlistID: listName,
     	strlistItemID: itemID,
     	strFieldName: "Count",
     	completefunc: function (xData, Status) {
     	$(xData.responseText).find("Version").each(function(i) {
       
     			cartridgeCount[i] = $(this).attr("Count");
     		});
     	}
     }); 
     
    for(key in replaceAction)
    {
        $('#table').append("<tr><td>" + replaceAction[key] + "</td><td>Замена</td><td>"+ cartridgeCount[key] +"</td></tr>");
    }

    $(function() {
        $( "#modalWindow" ).dialog({
            width: 600,
            //modal: true,
            close: function(event, ui) {
                $("#table").remove();
            }
        });
    });
}

// Get List Item Type metadata
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}
  
