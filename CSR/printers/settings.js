
function settings()
{
    var module = [];
    module.siteUrl = "http://server-sp-it/sites/wiki/";
    module.listId = "e032d241-fbc2-4efb-b5bf-48b7aeaf3e67";
    module.threshold = 20;
    module.editingGroupId = 41;
    module.actionFieldName  = "Action";
    module.catridgeFieldName = "4f71156b-0221-45e8-8166-7ccca783813f";
    module.catridgeCountFieldName = 5;
    //на складе
    module.remainFieldName =  "_x041e__x0441__x0442__x0430__x04";
    // общее число выданных
    module.numberofissuedFieldName =  "_x041e__x0431__x0449__x0435__x04";
    // получатель
    module.reseivedFieldName =  "_x041a__x043e__x043c__x0443__x00";
    //выдано
    module.getoutFieldName =  "_x0412__x044b__x0434__x0430__x04";
    // кто выдал
    module.whogiveFieldName =  "_x041a__x0442__x043e__x0020__x04";

    module.commentFieldName =  "_x041a__x043e__x043c__x043c__x04";
    module.isColorFieldName =  "IsColor";

    return module;
}

NotifyScriptLoadedAndExecuteWaitingJobs("settings.js");