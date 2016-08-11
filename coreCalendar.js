/**
 * Created by M_Zabiyakin on 25.06.2016.
 */
var currentIterateMonth = null;
var dataEmployee = null;
var shiftStartDate = null;
var thresholdCountDaysHirePersons = 7;

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
        setCellsOfBirthdaysEmployes(currentIterateMonth, shiftStartDate);

        setCellCalendar(shiftStartDate, currentIterateMonth);
        setMonthViewForIterate(currentIterateMonth);
        return false;
    });

    $("#btnNextMonth").click(function () {
        currentIterateMonth++;
        var shiftStartDate = parseInt(moment([moment().format('YYYY'), currentIterateMonth]).weekday());
        setCellsOfBirthdaysEmployes(currentIterateMonth, shiftStartDate);

        setCellCalendar(shiftStartDate, currentIterateMonth);
        setMonthViewForIterate(currentIterateMonth);
        return false;
    });
});

function setMonthViewForIterate(indexMonth) {
    //if sep top css
    if (indexMonth === parseInt(moment().format('M') - 1)) {
        setCurrentMonthView();
        //sept month widly
    } else {
        $('#DayNow').html(moment(new Date(moment().format('YYYY'), indexMonth, 04)).format("MMMM") + " <br>" + moment(new Date(moment().format('YYYY'), indexMonth, 04)).format('YYYY'));
    }
}

function setCurrentMonthView() {
    $('#DayNow').html(moment().format("MMMM") + " <br>" + moment().format('YYYY'));
}

function successHandler(data) {
    var congratsBirthdayInit = false;
    var newEmploeeInit = false;
    var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

    dataEmployee = results;
    var thresholdDateHirePersons = moment().day(-thresholdCountDaysHirePersons).format("YYYY-MM-DD");

    //icon current day
    $("#cell_" + (parseInt(moment().format('D')) + shiftStartDate - 1)).addClass('day_current');
    // iterate of all users
    for (var i = 0; i < results.length; i++) {
        var name = results[i].Cells.results[2].Value;
        var job = results[i].Cells.results[3].Value;
        var department = results[i].Cells.results[4].Value;
        var birthday = results[i].Cells.results[5].Value;
        var pictureUrl = results[i].Cells.results[6].Value;
        var hireDate = results[i].Cells.results[7].Value;

        // define new hire persons
        if (moment(hireDate).isAfter(thresholdDateHirePersons) && department != "Комнаты переговоров") {
            if (!newEmploeeInit) {
                $("#newEmployee_block").append('<h1> Новые Сотрудники </h1>');
                newEmploeeInit = true;
            }
            displayWidgetEmployee("#newEmployee_block", name, job, department, pictureUrl);
        }

        //filter of current month birthday field
        if (moment(birthday, 'DD.MM.YYYY').isValid() && moment(birthday, 'DD.MM.YYYY').month() === moment().month()) {
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

function setCellsOfBirthdaysEmployes(iterateMonth, shiftStartDate) {

    // clear all cells
    for (var i = 0; i <= 41; i++) {
        var id = "#cell_" + i;
        $(id).text("");
        $(id).removeClass();
        $(id).removeAttr("title");
    }

    //icon current day
    if (iterateMonth === parseInt(moment().format('M') - 1)) {
        $("#cell_" + (parseInt(moment().format('D')) + shiftStartDate - 1)).addClass('day_current');
    }

    var results = dataEmployee;
    // iterate of all users
    for (var i = 0; i < results.length; i++) {

        var birthday = results[i].Cells.results[5].Value;
        //filter of current month birthday field
        if (moment(birthday, 'DD.MM.YYYY').isValid() && moment(birthday, 'DD.MM.YYYY').month() === iterateMonth) {
            var name = results[i].Cells.results[2].Value;
            var numberDayBirthday = moment(birthday, 'DD.MM.YYYY').format('D');
            var indexCell = (parseInt(numberDayBirthday) + shiftStartDate - 1);
            // birthday cell of calendar
            var id = "#cell_" + indexCell;
            // congrat today birthdays
            if (moment().format('D') === numberDayBirthday) {
                $(id).addClass('birthday_current');
            }
            $(id).addClass('birthday');
            var prevName = $(id).prop("title") && $(id).prop("title").split(':')[1] ? ", " + $(id).prop("title").split(':')[1] : " ";
            $(id).attr('title', 'День Рождения: ' + name + prevName);
        }
    }
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
    $(containerId).append('<div class="employeeRow"> <div class="employeeCell"> <div class="wrap_employeeCell "> ' +
        ' <a class="thumbnailMainPage"> <img src=' + photoImprove + '>' + '</a>' +
        '<h2 class="title_name">' +
        '<p>' + fio[0] + '<br>' + fio[1] + '<br>' + fio[2] + '</p> </h2> ' +
        '<div class="empl_jobs_title"> <span class="department_inwidget"> ' + department + '</br> </span>' +
        '<span class="jobTitle_inwidget"> ' + jobTitle + ' </span> </div></div></div>'
    );
}

// Function to handle the error event.
// Prints the error message to the page.
function errorHandler(data, errorCode, errorMessage) {
    document.getElementById("internal").innerText =
        "Could not complete cross-domain call: " + errorMessage;
}
