/**
 * Created by M_Zabiyakin on 04.02.2016.
 */
var isMember = null;

SP.SOD.executeFunc('mQuery.js', 'm$', function () {
    m$.ready(function () {

        m$("clickemployee").click(function (e) {
            window.location = "http://devsp/sites/search/Pages/employee.aspx"
        })

        m$("clicknews").click(function (e) {
            window.location = "http://devsp/news";
        })

        m$("clickdocuments").click(function (e) {
            window.location = "";
        })

        m$("clickorders").click(function (e) {
            window.location = "";
        })

        m$("clickforum").click(function (e) {
            var prevDepartment = "";
            $("#peopleDirectory > tbody > tr").eq(key + i - 2).after("<tr class='menudepheader'> <td> " + prevDepartment + " </td> <td></td> <td></td><td></td><td></td><td></td></tr>");
        })

        m$("clicksupport").click(function (e) {
            if (isMember) {
                window.location = "http://devsp/support/";
            } else {
                window.location = "http://app-fadb9767380056.apps.com/support/HelpDesk/Pages/Default.aspx?SPHostUrl=http%3A%2F%2Fdevsp%2Fsupport&SPLanguage=ru-RU&SPClientTag=1&SPProductNumber=15.0.4763.1000&SPAppWebUrl=http%3A%2F%2Fapp-fadb9767380056.Apps.com%2Fsupport%2FHelpDesk";
            }
        })

        function isMemberofSharepointGroup(whatgroup) {

            $().SPServices({
                operation: "GetGroupCollectionFromUser",
                userLoginName: $().SPServices.SPGetCurrentUser(),
                async: false,
                completefunc: function (xData, Status) {

                    if ($(xData.responseXML).find("Group[Name='" + whatgroup + "']").length == 1) {
                        isMember = true;
                    } else {
                        isMember = false;
                    }
                }
            });
        }

        isMemberofSharepointGroup("SupportOwner");

    })
})



