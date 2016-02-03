/**
 * Created by M_Zabiyakin on 03.02.2016.
 */
$(document).ready(function () {

    function IsCurrentUserWithContributePerms() {
        IsCurrentUserMemberOfGroup(settings().editingGroupId, function (isCurrentUserInGroup) {
            if (isCurrentUserInGroup) {
                $("#opener2").show();
            }
        });
    }

    ExecuteOrDelayUntilScriptLoaded(IsCurrentUserWithContributePerms, 'SP.js');
});