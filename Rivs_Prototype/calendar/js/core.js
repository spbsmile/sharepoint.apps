/**
 * Created by M_Zabiyakin on 08.06.2016.
 */



var currentIterateMonth = null;
var dataEmployee = null;
var shiftStartDate = null;

$(document).ready(function () {

    var currentDate = moment().format("D MMMM").toString();
    var array = currentDate.split(" ");

    var currentMonth = parseInt(moment().format('M') - 1);
    //for next/prev month
    currentIterateMonth = currentMonth;
    // number first day week of month //http://stackoverflow.com/questions/26131003/moment-js-start-and-end-of-given-month
    shiftStartDate = parseInt(moment([moment().format('YYYY'), currentMonth]).weekday());
    setCellCalendar(currentMonth);

});

