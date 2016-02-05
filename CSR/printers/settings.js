
function settings()
{
    var module = [];
    module.siteUrl = "http://server-sp-it/sites/wiki/";
    module.listId = "629c7c86-dd24-4337-b01a-48a6da811cc5";
    module.threshold = 5;
    module.editingGroupId = 41;
    module.actionFieldName  = "Action";
    
  
    module.catridgeFieldName = "_x041a__x0430__x0440__x0442__x04";
    module.catridgeCountFieldName = "_x041a__x043e__x043b__x0438__x04";
    
	module.replaceDateFieldName = "_x0414__x0430__x0442__x0430__x00";
	module.replaceButtonFieldName = "_x0417__x0430__x043c__x0435__x04";

	module.whogiveFieldName = "_x041a__x0442__x043e__x0020__x04";
	module.commentFieldName = "_x041a__x043e__x043c__x043c__x04";
   
    module.isColorFieldName =  "IsColor";
    module.roomFieldName = "_x041a__x043e__x043c__x043d__x04";
  	module.ipFieldName = "IP_x002d__x0430__x0434__x0440__x";
    module.colorFieldName ="Color";

    return module;
}

NotifyScriptLoadedAndExecuteWaitingJobs("settings.js");