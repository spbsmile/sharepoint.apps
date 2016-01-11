// The file has been created, saved into "/Style Library/OfficeDevices/"
// and attached to the XLV via JSLink property.

var siteUrl = "http://server-sp-it/sites/wiki/";
var listTitle = "Офисная техника";
var remainFieldName = "_x041e__x0441__x0442__x0430__x04";
var numberofissuedFieldName = "_x041e__x0431__x0449__x0435__x04";
var reseivedFieldName = "_x041a__x043e__x043c__x0443__x00"; //OData__x041a__x043e__x043c__x0443__x00
var getoutFieldName = "_x0412__x044b__x0434__x0430__x04";

var remarkFieldName = "";
var timeFieldName = "";

var threshold = 20;

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
               }
             ,
             "_x0418__x0441__x0442__x043e__x04": {
                    View: renderViewHistory
               }
           },
      },
      ListTemplateType: 100
    });
  }
 
  function renderGetOut(ctx)
  {
        var html = "";
        html += '<input type="button" value="Выдать" onClick="clickDialogGetOut(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem["Title"] + '\')" />';
        html += "<div id ='mdGetOut';>";
        html += "<div id='dialogText';  >";
        html += "";
        html += "</div>";
        html += "</div>";
        return html;
  }
    
  function renderViewHistory(ctx)
  {
        var html = "";
        html += '<input type="button" value="Посмотреть историю выдачи" onClick="clickViewHistory(\'' + ctx.CurrentItem.ID + '\',\'' + ctx.CurrentItem["Title"] + '\')" />';
        html += "<div id ='mdViewHistory';>";
        html += "<div id='dialogTextHistory';  >";
        html += "";
        html += "</div>";
        html += "</div>";
        return html;
  }

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/devices.js"), init);
  init();
});

function clickViewHistory(itemID, itemName)
{
    var getOutFeildsStorage = [];
    var resievedFeildsStorage = [];
  
    if ($("#dialogTextHistory").length === 0) {
        $("#mdViewHistory").append("<div id ='dialogTextHistory';</div>");
    }
    jQuery("#dialogTextHistory").append('<table border="1"> <thead><tr><th>Дата</th><th>Получатели</th><th>Количество выданных</th></tr></thead> <tbody id="table"></tbody></table>');
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    RecordVersionCollection(getOutFeildsStorage, itemID, getoutFieldName);
    RecordVersionCollection(resievedFeildsStorage, itemID, reseivedFieldName);
  
  for (var i = 0; i <= threshold - 1; i++) {
       
      // (moment($(this).attr("Modified")) > moment("2016-01-11T10:04:24Z"))
      if (getOutFeildsStorage[i] == undefined) {
            if (i == 0) {
                jQuery("#dialogTextHistory").remove();
            }
            break;
        }
        $('#table').append("<tr><td>" + getOutFeildsStorage[i].timeUpdate + "</td><td>" + resievedFeildsStorage[i].value + "</td><td>" + getOutFeildsStorage[i].value + "</td></tr>");
    }
  
  $(function () {
        $("#mdViewHistory").dialog({
            title: 'История выдачи: ' + itemName,
            width: 600,
            modal: true,
            resizable: false,
             close: function (event, ui) {
                $("#dialogTextHistory").remove();
            }
        });
    });
} 

function clickDialogGetOut(itemID, itemName)
{
  if ($("#dialogText").length == 0)
  {
    $("#mdGetOut").append("<div id ='dialogText';</div>");
  }
  jQuery("#dialogText").append('<label>Кому выдать:</label> <div> <input name="users" id="users" value="" /> <label>Количество:</label> <div> <input id="countdevice" /> </div></div><label>Замечания:</label><p><textarea rows="3"  name="text"></textarea></p>');
  $("input[name='users']").pickSPUser();
  $(function () {
        $("#mdGetOut").dialog({
            buttons: [
              {
                text: "Выдать", 
                click: function(){
                  		var clientContext = new SP.ClientContext(siteUrl);
		                var list = clientContext.get_web().get_lists().getByTitle(listTitle);
                  		var item = list.getItemById(itemID);
				        clientContext.load(item);
     					
                   		clientContext.executeQueryAsync(function () {
                          item.set_item(remainFieldName, item.get_item(remainFieldName) - parseInt($("#countdevice").val()));
                          item.set_item(numberofissuedFieldName, item.get_item(numberofissuedFieldName) + parseInt($("#countdevice").val()));
                          item.set_item(getoutFieldName, parseInt($("#countdevice").val()));
                          item.set_item(reseivedFieldName, $("#users").val());  
               		 	  item.update();
                          clientContext.executeQueryAsync(function () {
                    	    	console.log("success set count");
                    		},
                    		function () {
                        		onQueryFailed;
                    		});
            		},
            		onQueryFailed);
                  $("mdGetOut").dialog("close");
                  document.location.reload();
                }
              }
            ],
            title: 'Выдать: '+ itemName,
            width: 600,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                $("#dialogTextHistory").remove();
            }
        });
    });
}


function RecordVersionCollection(arrayData, itemId, fieldName) {
    $().SPServices({
        operation: "GetVersionCollection",
        async: false,
        strlistID: listTitle,
        strlistItemID: itemId,
        strFieldName: fieldName,
        completefunc: function (xData, Status) {
            $(xData.responseText).find("Version").each(function (i) {
                arrayData.push({
                    value: $(this).attr(fieldName),
                    timeUpdate: moment($(this).attr("Modified")).format('LLL')
                });
                if (i >= threshold) {
                    return false;
                }
            });
        }
    });
}

function onQueryFailed(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
