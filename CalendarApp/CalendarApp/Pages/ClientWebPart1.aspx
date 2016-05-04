<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title></title>

    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment-timezone.min.js"></script>


    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <!-- <script  type="text/javascript" src="/_layouts/15/sp.core.js"></script> -->
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>
    <!-- <script type="text/javascript" src="/_layouts/15/sp.search.js"></script> -->
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>

    <!--<link rel="Stylesheet" type="text/css" href="../Content/bootstrap-scope.min.css" /> -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Добавьте свой код JavaScript в следующий файл -->
    <script type="text/javascript" src="../Scripts/App.js"></script>

    <script type="text/javascript">
        // Согласование стиля клиентской веб-части со стилем хост-сайта.
        (function () {
            'use strict';

            var hostUrl = '';
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            if (document.URL.indexOf('?') != -1) {
                var params = document.URL.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split('=')[1];
                        link.setAttribute('href', hostUrl + '/_layouts/15/defaultcss.ashx');
                        break;
                    }
                }
            }
            if (hostUrl == '') {
                link.setAttribute('href', '/_layouts/15/1033/styles/themable/corev15.css');
            }
            document.head.appendChild(link);
        })();
    </script>

    <script type="text/javascript">
        var hostweburl;
        var appweburl;
        // Load the required SharePoint libraries
        $(document).ready(function () {
            //Get the URI decoded URLs.
            hostweburl =
                decodeURIComponent(
                    getQueryStringParameter("SPHostUrl")
            );
            appweburl =
                decodeURIComponent(
                    getQueryStringParameter("SPAppWebUrl")
            );
            // resources are in URLs in the form:
            // web_url/_layouts/15/resource
            var scriptbase = hostweburl + "/_layouts/15/";
            // Load the js files and continue to the successHandler
            $.getScript(scriptbase + "SP.RequestExecutor.js", execCrossDomainRequest);
        });

        function execCrossDomainRequest() {

            var executor = new SP.RequestExecutor(appweburl);

            executor.executeAsync(
                {
                    url: appweburl + "/_api/search/query?querytext='*'&trimduplicates=true&enablequeryrules=false&rowlimit=500&bypassresulttypes=true&selectproperties='Title%2cJobTitle%2cDepartment%2cBirthday%2cPictureURL'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
                    method: "GET",
                    headers: { "Accept": "application/json; odata=verbose" },
                    success: successHandler,
                    error: errorHandler
                }
            );
        }

        function successHandler(data) {
            var footerInit = false;
            var currentMonth = parseInt(moment().format('M') - 1);
            var startDateInt = moment([moment().format('YYYY'),  currentMonth]).format("d");
            setCellCalendar(startDateInt, currentMonth);
            var jsonObject = JSON.parse(data.body.toString());

            var results = jsonObject.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
            for (var i = 0; i < results.length; i++) {

                var birthday = results[i].Cells.results[5].Value;
                if (moment(birthday, 'DD.MM.YYYY').isValid() && moment(birthday, 'DD.MM.YYYY').month() === moment().month()) {

                    var name = results[i].Cells.results[2].Value;
                    var numberDay = moment(birthday, 'DD.MM.YYYY').format('D');
                    var indexCell = (parseInt(numberDay) + parseInt(startDateInt) - 2);
                    var id = "#cell_" + indexCell;

                    if (moment().format('D') === numberDay) {
                        if (!footerInit) {
                            $("#footer").append('<div class="congratulateText"> <h1> Поздравляем! </h1> </div>');
                            footerInit = true;
                        }

                        $(id).addClass('birthday_current');
                        var department = results[i].Cells.results[4].Value;
                        var job = results[i].Cells.results[3].Value;
                        var pictureUrl = results[i].Cells.results[6].Value;

                        congratulateToday(name, job, department, pictureUrl);

                    } else {
                        $(id).addClass('birthday');
                        var prevName = $(id).prop("title") && $(id).prop("title").split(':')[1] ? ", " + $(id).prop("title").split(':')[1] : " ";
                        $(id).attr('title', 'День Рождения: ' + name + prevName);
                    }
                }
            } 
        }

        function setCellCalendar(shiftStartDate, currentMonth) {

            var prevMonth = (currentMonth - 1);

            var prevMonthDayValue = moment(moment([moment().format('YYYY'), prevMonth])).daysInMonth();
            for (var i = shiftStartDate - 2; i >= 0; i--) {
                var id = "#cell_" + i;
                $(id).text(prevMonthDayValue--);
                $(id).addClass('prev-month');
            }

            var interval = parseInt(shiftStartDate) + parseInt(moment().daysInMonth());
            var currentMonthDayValue = 1;
            var lastCellIndex = 0;
            for (var i = shiftStartDate; i < interval; i++) {
                var id = "#cell_" + (i - 1);
                lastCellIndex = (i - 1);
                $(id).text(currentMonthDayValue++);
            }

            var nextMonthDayValue = 1;
            for (var i = (lastCellIndex + 1); i <= 34; i++) {
                var id = "#cell_" + i;
                $(id).text(nextMonthDayValue++);
                $(id).addClass('next-month');
            }
        }


        function congratulateToday(name, jobTitle, department, photo) {

            if (photo) {
                $("#footer").append('<div class="congratulateText"> <p> <img src=' + photo.replace(/ /g, '%20') + ' class="photo_left"></p> </div>');
            } 

            $("#footer").append('<div class="congratulateText fio"> <h3> ' + name + ' </h3> </div>');

            $("#footer").append('<div class="congratulateText"> <h3> ' + department + ' </h3> </div>');
            $("#footer").append('<div class="congratulateText"> <h3> ' + jobTitle + ' </h3></div>');
        }

        // Function to handle the error event.
        // Prints the error message to the page.
        function errorHandler(data, errorCode, errorMessage) {
            document.getElementById("internal").innerText =
                "Could not complete cross-domain call: " + errorMessage;
        }
        // Function to retrieve a query string value.
        // For production purposes you may want to use
        //  a library to handle the query string.
        function getQueryStringParameter(paramToRetrieve) {
            var params =
                document.URL.split("?")[1].split("&");
            var strParams = "";
            for (var i = 0; i < params.length; i = i + 1) {
                var singleParam = params[i].split("=");
                if (singleParam[0] == paramToRetrieve)
                    return singleParam[1];
            }
        }

    </script>

</head>

<body>

     <div class="container">
        <div class="calendar-container">
            <header>
                <div>
                <div class="time" id="TimeNow">15:45</div>
                <div id="DayNow" class="day">18</div>
                 </div>
                <div id="MonthNow" class="month">August</div>
            </header>
            <div class="calendar test">
            <table>
                <thead>
                    <tr>
                        <th>пн</th>
                        <th>вт</th>
                        <th>ср</th>
                        <th>чт</th>
                        <th>пт</th>
                        <th>сб</th>
                        <th>вс</th>
                    </tr>
                </thead>
                
                  <tbody>   

                <tr>
                    <td id="cell_0">1</td>
                    <td id="cell_1">2</td>
                    <td id="cell_2">3</td>
                    <td id="cell_3">4</td>
                    <td id="cell_4">5</td>
                    <td id="cell_5">6</td>
                    <td id="cell_6">7</td>
                </tr>
                <tr>
                    <td id="cell_7"></td>
                    <td id="cell_8"></td>
                    <td id="cell_9"></td>
                    <td id="cell_10"></td>
                    <td id="cell_11"></td>
                    <td id="cell_12"></td>
                    <td id="cell_13"></td>
                </tr>
                <tr>
                    <td id="cell_14"></td>
                    <td id="cell_15"></td>
                    <td id="cell_16"></td>
                    <td id="cell_17"></td>
                    <td id="cell_18"></td>
                    <td id="cell_19"></td>
                    <td id="cell_20"></td>
                </tr>
                <tr>
                    <td id="cell_21"></td>
                    <td id="cell_22"></td>
                    <td id="cell_23"></td>
                    <td id="cell_24"></td>
                    <td id="cell_25"></td>
                    <td id="cell_26"></td>
                    <td id="cell_27"></td>
                </tr>
                <tr>
                    <td id="cell_28"></td>
                    <td id="cell_29"></td>
                    <td id="cell_30"></td>
                    <td id="cell_31"></td>
                    <td id="cell_32"></td>
                    <td id="cell_33"></td>
                    <td id="cell_34"></td>
                </tr>
                      
                         </tbody>
            </table>
                </div>
            <div class="ring-left"></div>
            <div class="ring-right"></div>

        </div>

    </div>
    <div id="footer" class="footer">
    </div>
    

</body>
</html>

