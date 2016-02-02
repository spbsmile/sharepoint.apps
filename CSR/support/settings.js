function settings() {
    var module = [];
    module.siteUrl = "http://devsp/sites/testdev/";
    module.listTitle_AcceptedTasks = "AcceptedTasksList";
    module.listTitle_ResolvedTasks = "ResolvedTasksList";
    module.listId_AcceptedTasks = "e0b71fd6-9fbb-454b-85ee-d06b86a9de31";
    module.listId_ResolvedTasks = "416eed23-4138-4e10-bd1c-4af3bbe1aceb";
    module.listId_NewTasks = "4f71156b-0221-45e8-8166-7ccca783813f";
    module.groupId_Boss = 5;
    module.groupId_Support = 7;
    module.groupId_Guest = 6;
    return module;
}

NotifyScriptLoadedAndExecuteWaitingJobs("settings.js");

