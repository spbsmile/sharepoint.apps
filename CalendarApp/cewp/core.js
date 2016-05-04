var currentIterateMonth = null;
var dataEmployee = null;

$(document).ready(function () {

    moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    displayTime();
    var currentDate = moment().format("D MMMM").toString(); // 2 �����
    var array = currentDate.split(" ");
    $('#MonthNow').html(array[1]);

    var currentMonth = parseInt(moment().format('M') - 1);
    currentIterateMonth = currentMonth;
    var startDateInt = moment([moment().format('YYYY'), currentMonth]).format("d");
    setCellCalendar(startDateInt, currentMonth);

    $.ajax({
        url: "http://devsp/_api/search/query?querytext='*'&trimduplicates=true&enablequeryrules=false&rowlimit=500&bypassresulttypes=true&selectproperties='Title%2cJobTitle%2cDepartment%2cBirthday%2cPictureURL'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
        method: "GET",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: successHandler,
        error: errorHandler
    });

    $("#btnPrevMonth").click(function () {
        currentIterateMonth--;
        var startDateInt = moment([moment().format('YYYY'), currentIterateMonth]).format("d");
        setCellCalendar(startDateInt, currentIterateMonth);
        setMonthViewForIterate(currentIterateMonth);
        return false;
    });

    $("#btnNextMonth").click(function () {
        currentIterateMonth++;
        var startDateInt = moment([moment().format('YYYY'), currentIterateMonth]).format("d");
        setCellCalendar(startDateInt, currentIterateMonth);
        setMonthViewForIterate(currentIterateMonth);
        return false;
    });
});

function displayTime() {
    $('#DayNow').html(moment().format("D"));
    $('#TimeNow').html(moment().format('HH:mm'));

    setTimeout(displayTime, 1000);
}

function setMonthViewForIterate(indexMonth) {
    // $('#DayNow').html("");
    $('#MonthNow').html(moment(new Date(2012, indexMonth, 04)).format("MMMM"));
}

function successHandler(data) {
    var footerInit = false;
    var currentMonth = parseInt(moment().format('M') - 1);
    var startDateInt = moment([moment().format('YYYY'), currentMonth]).format("d");

    var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
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

    var h = $("#WebPartctl00_ctl42_g_5b8f247a_ca13_4731_ab0d_453413761b75").height() - 400;
    console.log(h);
    $("#MSOZoneCell_WebPartctl00_ctl42_g_5490d60f_9d22_42de_9a1b_cfcec5546ba5").css('padding-bottom', h + 'px');
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

    $("#footer").append('<div class="congratulateText fio"> <h3><strong> ' + name + ' </strong></h3> </div>');

    $("#footer").append('<div class="congratulateText"> <h3> ' + department + ' </h3> </div>');
    $("#footer").append('<div class="congratulateText"> <h3> ' + jobTitle + ' </h3></div>');
}

// Function to handle the error event.
// Prints the error message to the page.
function errorHandler(data, errorCode, errorMessage) {
    document.getElementById("internal").innerText =
        "Could not complete cross-domain call: " + errorMessage;
}

