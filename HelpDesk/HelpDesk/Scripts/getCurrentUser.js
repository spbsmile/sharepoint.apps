function getCurrentUser(context, SubmitCurrentUser) {
    var currentUser = context.get_web().get_currentUser();
    context.load(currentUser);
    context.executeQueryAsync(function (sender, args) {
        var user = currentUser;
        user.id = currentUser.get_id();
        user.login = currentUser.get_loginName();
        user.name = currentUser.get_title();
        SubmitCurrentUser(user);
    }, function OnFailure(sender, args) {
        SubmitCurrentUser(null);
    });
}
