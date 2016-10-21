/**
 * Created by M_Zabiyakin on 31.03.2016.
 */
$(document).ready(function () {

    /** property - name device, value property - array statistics */
    var devicesStats = {};
    /** additional array for  devicesStats/ todo delete it and add property to devicesStats */
    var namesDevices = [];
    /** Периферия и расх материалы, ... */
    var devicesCategory = [];

    /**  */
    var countMonthForStatistics = 7;
    /** threhold date when write statistics */
    var threholdDate = null

    var myLineChart = null;
    var myLineAddedDevicesChart = null;

    $("#dialogstatistics").dialog({
        resizable: false,
        modal: true,
        width: 1600,
        height: 800,
        autoOpen: false
    });

    $("#openstatistics").click(function () {
        if (myLineChart != null) myLineChart.destroy();
        if (myLineAddedDevicesChart != null) myLineAddedDevicesChart.destroy();
        receiveStatistics();
        $("#loader").show();
        $("#dialogstatistics").dialog("open");
    });

    function addChart(datasets, chartId, lineChart, lastMonths) {

        var ctx = document.getElementById(chartId).getContext("2d");

        var options = {

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: true,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: 20,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: 1,
            // Number - The scale starting value
            scaleStartValue: 0,

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve: true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension: 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot: true,

            //Number - Radius of each point dot in pixels
            pointDotRadius: 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius: 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill: true,

            //Number - Spacing between each of the X value sets
            barValueSpacing: 3,

            // Number - Tooltip label font size in pixels
            tooltipFontSize: 9,

            // Number - Tooltip title font size in pixels
            tooltipTitleFontSize: 9,

            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        };

        var data = {
            labels: lastMonths,
            datasets: datasets
        };

        lineChart = new Chart(ctx).Line(data, options);
    }

    function receiveStatistics() {

        // get current month/name it's month
        var index = parseInt(moment().format('M')) - 1;

        // get last of countMonthForStatistics names month

        var lastMonths = [];
        for (var j = 0; j < countMonthForStatistics; j++) {
            lastMonths.unshift(moment().month(index - j).format("MMMM"));
        }
               
        threholdDate = moment().month(index - countMonthForStatistics - 1).format("YYYY-MM-DD");
        console.log(threholdDate);
        console.log(moment().month(index - countMonthForStatistics - 1).format("MMMM"));

        // fetch data of all items (title/id)
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                var items = data.d.results;

                var itemsData = [];
                var categoryDeviceInternalField = "OData__x041a__x0430__x0442__x0435__x04";

                for (var i = 0; i < items.length; i++) {
                    var nameCategory = items[i][categoryDeviceInternalField];

                    if (items[i][categoryDeviceInternalField] != null && nameCategory === "Периферия и расх материалы") {
                        itemsData.push({
                            name: items[i]["Title"],
                            id: items[i]["ID"]
                        });
                    }
                }

                for (var i = 0; i < itemsData.length; i++) {
                    writeStatistics(itemsData[i].id, itemsData[i].name);
                }
                /* 
                 // for debug 
                 for (var i = 0; i < Object.keys(cartridgesStats).length; i++) {
                 for (var j = 0; j < 12; j++) {
                 console.log("Картридж:" + namesCartridges[i] + "В месяце: " + j + " Добавлено: " + cartridgesStats[namesCartridges[i]][j].countAdded + " Сделано замен: " + cartridgesStats[namesCartridges[i]][j].countReplace);
                 }
                 }*/

                var datasetReplaceItems = [];
                writeDataSetChart(datasetReplaceItems, true);
                var datasetAddedItems = [];
                writeDataSetChart(datasetAddedItems, false);

                addChart(datasetReplaceItems, "chartReplacements", myLineChart, lastMonths);
                addChart(datasetAddedItems, "сhartAdded", myLineAddedDevicesChart, lastMonths);
                $("#loader").hide();
            },
            error: onQueryFailed
        });
    }

    function writeDataSetChart(datasetChart, isReplaceChart) {

        // loop for each device
        for (var i = 0; i < Object.keys(devicesStats).length; i++) {
            var data = [];
            // inner loop for months 
            for (var j = 0; j < countMonthForStatistics; j++) {
                if (isReplaceChart) {
                    data.push(devicesStats[namesDevices[i]][j].countReplace);
                } else {
                    data.push(devicesStats[namesDevices[i]][j].countAdded);
                }
            }
            datasetChart[i] = {
                label: namesDevices[i],
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: data
            }
        }
    }

    /** проходить по полю количество, сравнивать с предыдущим, если уменьшилось, считать что действие - выдано 
     * 
     *  fetch and write statistics  for item to devicesStats
     * */
    function writeStatistics(itemId, itemName) {

        var dataEachMonth = [];
        for (var i = 0; i < 12; i++) {
            dataEachMonth.push({
                //init property of dataEachMonth
                countAdded: "0",
                countReplace: "0",
                count: "0"
            });
        }
        var prevMonth = 0;
        $().SPServices({
            operation: "GetVersionCollection",
            async: false,
            strlistID: settings().listId,
            strlistItemID: itemId,
            strFieldName: settings().remainFieldName,
            completefunc: function (xData, Status) {

                $(xData.responseText).find("Version").each(function (i) {

                    // threhold data for stream statistics 
                    if (moment($(this).attr("Modified")).isAfter(threholdDate)) {
                        //DD-MM-YYYY
                        var monthModified = parseInt(moment($(this).attr("Modified")).format("M") - 1);
                        var count = parseInt($(this).attr(settings().remainFieldName));
                        var prevCount = 0;
                        if (i != 0) {
                            prevCount = parseInt(dataEachMonth[prevMonth].count);
                        }
                        if (prevCount < count) {
                            dataEachMonth[monthModified].countReplace++;
                        } else if (prevCount > count) {
                            console.log("COUNT ADD " +  " prev count " + prevCount + " current count " + currentCount + " name cart: " + nameCartridge + " month ");
                            dataEachMonth[monthModified].countAdded = parseInt(dataEachMonth[monthModified].countAdded) + parseInt(prevCount) - count;
                        }
                        dataEachMonth[monthModified].count = count;
                        prevMonth = monthModified;
                    }
                });
                namesDevices.push(itemName);
                devicesStats[itemName] = dataEachMonth;
            }
        });
    }
});

