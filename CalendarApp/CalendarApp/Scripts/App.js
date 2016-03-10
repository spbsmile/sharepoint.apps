'use strict';

$(document).ready(function () {

    moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    displayTime();
    var currentDate = moment().format("D MMMM").toString(); // 2 марта
    var array = currentDate.split(" ");
    $('#MonthNow').html(array[1]);
});

function displayTime() {
    $('#DayNow').html(moment().format("D"));
    $('#TimeNow').html(moment().format('HH:mm'));

    setTimeout(displayTime, 1000);
}
