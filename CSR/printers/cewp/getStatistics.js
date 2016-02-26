$(document).ready(function () {

    var cartridgesStats = {};
    var namesCartridges = [];
    var myLineChart = null;
    var myLineAddedCartridgesChart = null;

    $("#dialogstatistics").dialog({
        resizable: false,
        modal: true,
        width: 1600,
        height: 800,
        autoOpen: false
    });

    $("#openstatistics").click(function () {
        if (myLineChart != null) myLineChart.destroy();
        if (myLineAddedCartridgesChart != null) myLineAddedCartridgesChart.destroy();
        receiveStatistics();
        $("#loader").show();
        $("#dialogstatistics").dialog("open");
    });

    function addChart(datasets, chartId, lineChart) {

        var ctx = document.getElementById(chartId).getContext("2d");

        var options = {

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: true,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: 12,
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
            barValueSpacing: 5,

            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        };

        var data = {
            labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль"],
            datasets: datasets
        };

        lineChart = new Chart(ctx).Line(data, options);
    }

    function receiveStatistics() {
        console.log("receiveStatistics");
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                var items = data.d.results;
                var unique = {};
                var cartridgesData = [];
                var cartridgeInternalField = "OData__x041a__x0430__x0440__x0442__x04";

                for (var i = 0; i < items.length; i++) {
                    var uniqueProperty = items[i][cartridgeInternalField];

                    if (items[i][cartridgeInternalField] != null && typeof (unique[uniqueProperty]) == "undefined" && items[i][cartridgeInternalField] != "Тестовый вариант") {
                        cartridgesData.push({
                            name: items[i][cartridgeInternalField],
                            id: items[i]["ID"]//,
                            // colorSpecification:
                        });
                    }
                    unique[uniqueProperty] = 0;
                }

                for (var i = 0; i < cartridgesData.length; i++) {
                    writeStatisticsCartridge(cartridgesData[i].id, cartridgesData[i].name);
                }
                /*  for (var i = 0; i < Object.keys(cartridgesStats).length; i++) {
                 for (var j = 0; j < 12; j++) {
                 console.log("Картридж:" + namesCartridges[i] + "В месяце: " + j + " Добавлено: " + cartridgesStats[namesCartridges[i]][j].countAdded + " Сделано замен: " + cartridgesStats[namesCartridges[i]][j].countReplace);
                 }
                 }*/

                var datasetReplaceCartridges = [];
                writeDataSetChart(datasetReplaceCartridges, true);
                var datasetAddedCartrides = [];
                writeDataSetChart(datasetAddedCartrides, false);

                addChart(datasetReplaceCartridges, "chartReplacements", myLineChart);
                addChart(datasetAddedCartrides, "сhartAdded", myLineAddedCartridgesChart);
                $("#loader").hide();
            },
            error: onQueryFailed
        });
    }

    function writeDataSetChart(datasetChart, isReplaceChart) {
        //filter on empty data
        /* for (var i = 0; i < Object.keys(cartridgesStats).length; i++) {

         } */


        for (var i = 0; i < Object.keys(cartridgesStats).length; i++) {
            var data = [];
            for (var j = 0; j < 7; j++) {
                if (isReplaceChart) {
                    data.push(cartridgesStats[namesCartridges[i]][j].countReplace);
                } else {
                    data.push(cartridgesStats[namesCartridges[i]][j].countAdded);
                }
            }
            datasetChart[i] = {
                label: namesCartridges[i],
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

    // проходить по полю количество , сравнивать с предыдущим, если уменьшилось, считать что действие - выдано
    function writeStatisticsCartridge(itemId, nameCartridge) {

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
            strFieldName: settings().catridgeCountFieldName,
            completefunc: function (xData, Status) {

                $(xData.responseText).find("Version").each(function (i) {

                    if (moment($(this).attr("Modified")).isAfter(moment().format('2016-01-01'))) {
                        //DD-MM-YYYY
                        var currentMonth = parseInt(moment($(this).attr("Modified")).format("M") - 1);
                        var currentCount = parseInt($(this).attr(settings().catridgeCountFieldName));
                        var prevCount = 0;
                        if (i != 0) {
                            prevCount = parseInt(dataEachMonth[prevMonth].count);
                        }
                        if (prevCount < currentCount) {
                            dataEachMonth[currentMonth].countReplace++;
                        } else if (prevCount > currentCount) {
                            //console.log("COUNT ADD " +  " prev count " + prevCount + " current count " + currentCount + " name cart: " + nameCartridge + " month ");
                            dataEachMonth[currentMonth].countAdded += (prevCount - currentCount);
                        }
                        dataEachMonth[currentMonth].count = currentCount;
                        prevMonth = currentMonth;
                    }
                });
                namesCartridges.push(nameCartridge);
                cartridgesStats[nameCartridge] = dataEachMonth;
            }
        });
    }
});

