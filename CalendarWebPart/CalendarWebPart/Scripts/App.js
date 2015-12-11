'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    $(document).ready(function ()
    {
        displayTime();
    });

    function displayTime()
    {
        $('#TimeNow').html(moment().format('HH:mm'));

        $('#DayNow').html(moment().day());
        $('#MonthNow').html(moment().format("MMMM"));

        setTimeout(displayTime, 1000);
    }
}
