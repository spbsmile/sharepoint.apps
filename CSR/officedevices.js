// The file has been created, saved into "/Style Library/"
// and attached to the XLV via JSLink property.

var siteUrl = "http://devsp/sites/testdev/";
var listTitle = "ТехникаИТ(разное)";
var remainFieldName = "_x041e__x0441__x0442__x0430__x04";
var numberofissuedFieldName = "_x041e__x0431__x0449__x0435__x04";
var remarkFieldName = "";
var timeFieldName = "";
var reseivedFieldName = "";

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

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/OfficeDevices/officedevices.js"), init);
  init();
});


function clickDialogGetOut(itemID, itemName)
{
  if ($("#dialogText").length == 0)
  {
    $("#mdGetOut").append("<div id ='dialogText';</div>");
  }
  jQuery("#dialogText").append('<label>Кому выдать:</label> <div> <input name="users" id="users" value="" /> <label>Количество:</label> <div> <input id="countdevice" /> </div></div><label>Замечания:</label><p><textarea rows="3"  name="text"></textarea></p>');
  //jQuery("#dialogText").load("http://devsp/sites/testdev/Style%20Library/OfficeDevices/dialogGetOut.html");
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
               		 	item.update();
                          
                          clientContext.executeQueryAsync(function () {
                    	    	console.log("success get count");
                    		},
                    		function () {
                        		console.log("fail get count");
                    		});
                		document.location.reload();
            		},
            		onQueryFailed);
                  
                  
  						console.log($("#users").val())   
  						console.log(parseInt($("#countdevice").val()) + " count device");
  				
 						
                  $("#mdGetOut").dialog("close");
                }
              }
            ],
            title: 'Выдать: '+ itemName,
            width: 600,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                $("#dialogText").remove();
            }
        });
    });
}

function onQueryFailed(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}


