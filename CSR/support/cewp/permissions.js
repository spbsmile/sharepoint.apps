/**
 * Created by M_Zabiyakin on 03.02.2016.
 */
$(document).ready(function () {
	IsCurrentUserMemberOfGroup(bossGroupId, function (isCurrentUserInGroup) {
            if (isCurrentUserInGroup) {
                $("#titlePage").text("Журнал Заявок");
                $("#tablesBoss").show();
            }
            else {
                IsCurrentUserMemberOfGroup(supportGroupId, function (isCurrentUserInGroup) {
                    if (isCurrentUserInGroup) {
                        $("#titlePage").text("Заявка в техподдержку");
                        $("#supportButton").show();
                        $("#tablesGuest").show();
                    }
                    else {
                        //TODO guest
                        $("#titlePage").text("Заявка в техподдержку");
                        $("#supportButton").show();
                        $("#tablesGuest").show();
                    }
                });
            }
        });
    ExecuteOrDelayUntilScriptLoaded(IsCurrentUserWithContributePerms, 'SP.js');
});