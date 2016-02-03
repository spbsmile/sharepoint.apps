/**
 * Created by M_Zabiyakin on 03.02.2016.
 */
$(document).ready(function () {
/*
    function IsCurrentUserWithContributePerms() {
        IsCurrentUserMemberOfGroup(, function (isCurrentUserInGroup) {
            if (isCurrentUserInGroup) {
                $("#").show();
            }
        });
    }
*/
    ExecuteOrDelayUntilScriptLoaded(IsCurrentUserWithContributePerms, 'SP.js');
});