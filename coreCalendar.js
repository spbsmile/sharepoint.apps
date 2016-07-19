/**
 * Created by M_Zabiyakin on 25.06.2016.
 */
var currentIterateMonth = null;
var dataEmployee = null;
var shiftStartDate = null;

$(document).ready(function () {
    moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    setCurrentMonthView();

    var currentMonth = parseInt(moment().format('M') - 1);
    //for next/prev month
    currentIterateMonth = currentMonth;
    // number first day week of month //http://stackoverflow.com/questions/26131003/moment-js-start-and-end-of-given-month
    shiftStartDate = parseInt(moment([moment().format('YYYY'), currentMonth]).weekday());
    setCellCalendar(shiftStartDate, currentMonth);

    $.ajax({
        url: "/_api/search/query?querytext='*'&trimduplicates=false&enablequeryrules=false&rowlimit=600&bypassresulttypes=true&selectproperties='Title%2cJobTitle%2cDepartment%2cBirthday%2cPictureURL%2chireDate'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
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
        var shiftStartDate = parseInt(moment([moment().format('YYYY'), currentIterateMonth]).weekday());
        setCellCalendar(shiftStartDate, currentIterateMonth);
        setMonthViewForIterate(currentIterateMonth);
        return false;
    });

    $("#btnNextMonth").click(function () {
        currentIterateMonth++;
        var shiftStartDate = parseInt(moment([moment().format('YYYY'), currentIterateMonth]).weekday());
        setCellCalendar(shiftStartDate, currentIterateMonth);
        setMonthViewForIterate(currentIterateMonth);
        return false;
    });
});

function setMonthViewForIterate(indexMonth) {
    if (indexMonth === parseInt(moment().format('M') - 1)) {
        setCurrentMonthView();
    } else {
        $('#DayNow').html(moment(new Date(moment().format('YYYY'), indexMonth, 04)).format("MMMM YYYY"));
        $(".ring-left, .ring-right").css({top: '66px'});
        $(".chevron").css({bottom: '71.5%'});
    }
}

function setCurrentMonthView() {
    var currentDate = moment().format("D MMMM").toString();
    var array = currentDate.split(" ");
    $('#DayNow').html(moment().format("D") + "&nbsp" + array[1] + "&nbsp" + "2016" + "<br/>" +
        capitalizeFirstLetter(moment().format('dddd')));

    $(".ring-left, .ring-right").css({top: '95px'});
    $(".chevron").css({bottom: '65.5%'});
}

function successHandler(data) {
    var congratsBirthdayInit = false;
    var newEmploeeInit = false;
    var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

    dataEmployee = results;

    var thresholdDateHirePersons = moment().day(-14).format("YYYY-MM-DD");
    // iterate of all users
    for (var i = 0; i < results.length; i++) {
        // define new hire persons
        var hireDate = results[i].Cells.results[7].Value;
        if (moment(hireDate).isAfter(thresholdDateHirePersons)) {
            if (!newEmploeeInit) {
                $("#newEmployee_block").append('<h1> Новые Сотрудники </h1>');
                newEmploeeInit = true;
            }

            var name = results[i].Cells.results[2].Value;
            var department = results[i].Cells.results[4].Value;
            var job = results[i].Cells.results[3].Value;
            var pictureUrl = results[i].Cells.results[6].Value;
            displayWidgetEmployee("#newEmployee_block", name, job, department, pictureUrl);
        }

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
                if (!congratsBirthdayInit) {
                    $("#birthday_block").append('<h1> Поздравляем! </h1>');
                    congratsBirthdayInit = true;
                }
                $(id).addClass('birthday_current');
                var department = results[i].Cells.results[4].Value;
                var job = results[i].Cells.results[3].Value;
                var pictureUrl = results[i].Cells.results[6].Value;
                displayWidgetEmployee("#birthday_block", name, job, department, pictureUrl);
            }
            $(id).addClass('birthday');
            var prevName = $(id).prop("title") && $(id).prop("title").split(':')[1] ? ", " + $(id).prop("title").split(':')[1] : " ";
            $(id).attr('title', 'День Рождения: ' + name + prevName);
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function defineHirePersons() {

}

function setCellsOfBirthdaysEmployes() {

}

function setCellCalendar(shift, currentMonth) {
    var prevMonth = (currentMonth - 1);
    var t = shift - 1;
    var prevMonthDayValue = moment(moment([moment().format('YYYY'), prevMonth])).daysInMonth();
    for (var i = t; i >= 0; i--) {
        var id = "#cell_" + i;
        $(id).text(prevMonthDayValue);
        prevMonthDayValue--;
        $(id).addClass('prev-month');
    }

    var interval = shift + parseInt(moment().daysInMonth());
    var currentMonthDayValue = 1;
    var lastCellIndex = 0;
    for (var i = shift; i < interval; i++) {
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

function displayWidgetEmployee(containerId, name, jobTitle, department, photo) {
    var photoImprove = "#";
    if (photo) {
        photoImprove = photo.replace(/ /g, '%20');
    } else {
        photoImprove = "/_layouts/15/CustomjsLibs/1.devsp/noPhoto.jpg";
    }
    var fio = name.split(" ");
    $(containerId).append('<div class="employeeRow"> <div class="employeeCell"> <div class="wrap_employeeCell"> <div class="wrap_employeeCell">' +
        ' <p> <img src=' + photoImprove + '>' + '</p>' +
        '<h2 class="title_name">' +
        '<p>' + fio[0] + '<br>' + fio[1] + '<br>' + fio[2] + '</p> </h2> ' +
        '<div class="empl_jobs_title"> <p> ' + department + ' </p>' +
        '<p> ' + jobTitle + ' </p> </div></div></div></div>'
    );
}

// Function to handle the error event.
// Prints the error message to the page.
function errorHandler(data, errorCode, errorMessage) {
    document.getElementById("internal").innerText =
        "Could not complete cross-domain call: " + errorMessage;
}
