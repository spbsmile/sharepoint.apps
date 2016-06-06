var currentIterateMonth = null;
var dataEmployee = null;
var shiftStartDate = null;

$(document).ready(function () {
    moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    displayTime();
    var currentDate = moment().format("D MMMM").toString(); // 2 ï¿½ï¿½ï¿½ï¿½ï¿½
    var array = currentDate.split(" ");
    $('#MonthNow').html(array[1]);

    var currentMonth = parseInt(moment().format('M') - 1);
    currentIterateMonth = currentMonth;
    // number first day week of month //http://stackoverflow.com/questions/26131003/moment-js-start-and-end-of-given-month
    shiftStartDate = parseInt(moment([moment().format('YYYY'), currentMonth]).weekday());
    setCellCalendar(currentMonth);

    $.ajax({
        url: "http://intranet/_api/search/query?querytext='*'&trimduplicates=true&enablequeryrules=false&rowlimit=500&bypassresulttypes=true&selectproperties='Title%2cJobTitle%2cDepartment%2cBirthday%2cPictureURL'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
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
    $('#MonthNow').html(moment(new Date(2012, indexMonth, 04)).format("MMMM"));
}

function successHandler(data) {
    var footerInit = false;
    var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
    // iterate of all users
    for (var i = 0; i < results.length; i++) {
        var birthday = results[i].Cells.results[5].Value;
        //icon current day
        $("#cell_" + (parseInt(moment().format('D')) + shiftStartDate - 1)).addClass('day_current');
        //filter of current month birthday field
        if (moment(birthday, 'DD.MM.YYYY').isValid() && moment(birthday, 'DD.MM.YYYY').month() === moment().month()) {
            var name = results[i].Cells.results[2].Value;
            var numberDayBirthday = moment(birthday, 'DD.MM.YYYY').format('D');
            var indexCell = (parseInt(numberDayBirthday) + shiftStartDate - 1);
            // birthday cell of calendar
            var id = "#cell_" + indexCell;
            // congrat today birthdays
            if (moment().format('D') === numberDayBirthday) {
                if (!footerInit) {
                    $("#footer").append('<div class="congratulateText"> <h1> Поздравляем! </h1> </div>');
                    footerInit = true;
                }
                $(id).addClass('birthday_current');
                var department = results[i].Cells.results[4].Value;
                var job = results[i].Cells.results[3].Value;
                var pictureUrl = results[i].Cells.results[6].Value;
                congratulateToday(name, job, department, pictureUrl);
            }
            $(id).addClass('birthday');
            var prevName = $(id).prop("title") && $(id).prop("title").split(':')[1] ? ", " + $(id).prop("title").split(':')[1] : " ";
            $(id).attr('title', 'День Рождения: ' + name + prevName);
        }
    }

}

function setCellCalendar(currentMonth) {

    var prevMonth = (currentMonth - 1);
    var t = shiftStartDate - 1;
    var prevMonthDayValue = moment(moment([moment().format('YYYY'), prevMonth])).daysInMonth();
    for (var i = t; i >= 0; i--) {
        var id = "#cell_" + i;
        $(id).text(prevMonthDayValue);
        prevMonthDayValue--;
        $(id).addClass('prev-month');
    }

    var interval = shiftStartDate + parseInt(moment().daysInMonth());
    var currentMonthDayValue = 1;
    var lastCellIndex = 0;
    for (var i = shiftStartDate; i < interval; i++) {
        var id = "#cell_" + i;
        lastCellIndex = i;
        $(id).text(currentMonthDayValue++);
    }

    var nextMonthDayValue = 1;
    for (var i = (lastCellIndex + 1); i <= 41; i++) {
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
