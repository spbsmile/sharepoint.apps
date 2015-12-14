'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    $(document).ready(function () {
        moment.locale(window.navigator.userLanguage || window.navigator.language);
        displayTime();
    });

    function displayTime() {
        $('#DayNow').html(moment().format("D"));
        $('#TimeNow').html(moment().format('HH:mm'));
        $('#MonthNow').html(moment().format("MMMM"));

        setTimeout(displayTime, 1000);
    }
}
