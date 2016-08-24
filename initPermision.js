/**
 * Created by M_Zabiyakin on 27.07.2016.
 */

$(document).ready(function () {

    $("#ctl00_PlaceHolderMain_ctl01__ControlWrapper_RichHtmlField").remove();
    $("#ctl00_PlaceHolderLeftNavBar_PlaceHolderQuickLaunchBottom_idNavLinkViewAll").hide();
    $('#ms-designer-ribbon').hide();

    var isMember = null;
    var currentUser = $().SPServices.SPGetCurrentUser();
    $().SPServices({
        operation: "GetGroupCollectionFromUser",
        userLoginName: currentUser,
        async: true,
        completefunc: function (xData, Status) {
            if ($(xData.responseXML).find("Group[Name='" + "SupportOwner" + "']").length == 1) {
                isMember = true;
            } else {
                isMember = false;
            }
            $("#clicksupport").click(function () {
                if (isMember) {
                    window.location = "/support/Pages/default.aspx";
                } else {
                    window.location = "/Pages/helpdesk.aspx";
                }
            })
        }
    });

    $().SPServices({
        operation: "GetGroupCollectionFromUser",
        userLoginName: currentUser,
        async: true,
        completefunc: function (xData, Status) {
            if ($(xData.responseXML).find("Group[Name='" + "DevepolerGroup" + "']").length == 1) {
                $('#ms-designer-ribbon').show();
                $('#RibbonContainer-TabRowRight').show();
                $('#suiteBarButtons').show();
                $('#s4-ribbonrow').show();
                $('#s4-ribbonrow').css({
                    "height": "initial"
                });
            }
        }
    });
});
