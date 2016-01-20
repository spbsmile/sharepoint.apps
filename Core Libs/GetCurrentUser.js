function GetCurrentUser(context, SubmitCurrentUser) {
    var currentUser = context.get_web().get_currentUser();
    context.load(currentUser);
    context.executeQueryAsync(function (sender, args) {
            // todo id login name - property
            var user = currentUser;
            user.id = currentUser.get_id();
            //todo check
            user.login = currentUser.get_login();

            SubmitCurrentUser(user);
        },
        function OnFailure(sender, args) {
            SubmitCurrentUser(null);
        });
}