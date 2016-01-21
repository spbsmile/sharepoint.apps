function IsCurrentUserMemberOfGroup(groupId, OnComplete) {
    var context = SP.ClientContext.get_current();
    var currentWeb = context.get_web();
    var currentUser = context.get_web().get_currentUser();
    context.load(currentUser);

    var allGroups = currentWeb.get_siteGroups();
    context.load(allGroups);

    var group = allGroups.getById(groupId);
    context.load(group);

    var groupUsers = group.get_users();
    context.load(groupUsers);

    context.executeQueryAsync(function (sender, args) {
        var userInGroup = IsUserInGroup(currentUser, group);
        OnComplete(userInGroup);
    }, function OnFailure(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    });

    function IsUserInGroup(user, group) {
        var groupUsers = group.get_users();
        var userInGroup = false;
        var groupUserEnumerator = groupUsers.getEnumerator();
        while (groupUserEnumerator.moveNext()) {
            var groupUser = groupUserEnumerator.get_current();
            if (groupUser.get_id() === user.get_id()) {
                userInGroup = true;
                break;
            }
        }
        return userInGroup;
    }
}
