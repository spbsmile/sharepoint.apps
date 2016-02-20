$(document).ready(function() {
    
    $("#dialogstatistics").dialog({
        resizable: false,
        modal: true,
        width: 900,
        autoOpen: false
    });
    
    
    function addChartExample() {
        
        var ctx = document.getElementById("myChart").getContext("2d");
        
        var options = {
            
            // Boolean - If we should show the scale at all
            showScale: true,
            
            // Boolean - If we want to override with a hard coded scale
            scaleOverride: true,
            
            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: 15,
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
            datasets: [
            {
                label: "1 set",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [1, 2, 3, 4, 5, 6, 7]
            }, 
            {
                label: "2 set",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [7, 6, 5, 4, 3, 2, 1]
            }, 
            {
                label: "3 set",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [4, 3, 6, 1, 1, 2, 0]
            }, 
            {
                label: "4 set",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [1, 2, 1, 3, 2, 1, 1]
            }
            ]
        };
        
        var myLineChart = new Chart(ctx).Line(data, options);
    
    }
    
    $("#openstatistics").click(function() {
        addDataStatistics();
        $("#dialogstatistics").dialog("open");
    });
    
    function addDataStatistics() {
        // addChartExample();
        addToSelectAllCartriges();
    }
    
    //todo may be csom
    function addToSelectAllCartriges() {
        $.ajax({
            url: settings().siteUrl + "/_api/web/lists(guid'" + settings().listId + "')/items",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function(data) {
                var items = data.d.results;
                var unique = {};
                var cartridgesData = [];
                
                var cartridgeInternalField = "OData__x041a__x0430__x0440__x0442__x04";
                
                console.log(items)
                
                for (var i = 0; i < items.length; i++) {
                    var uniqueProperty = items[i][cartridgeInternalField];
                    
                    if (items[i][cartridgeInternalField] != null  && typeof (unique[uniqueProperty]) == "undefined") {
                        cartridgesData.push({
                            name: items[i][cartridgeInternalField],
                            id: items[i].id//,
                            // colorSpecification:
                        });
                    }
                    unique[uniqueProperty] = 0;
                }
                
                console.log(cartridgesData.length);
                
                for (var i = 0; i < cartridgesData.length; i++) {
                    console.log(cartridgesData[i].name);
                    //todo
                    //AddToTableCartridgeStatistics(cartridgesData.id, cartridgesData.name);
                }
            },
            error: onQueryFailed
        });
    }
    
    // проходить по полю количество , сравнивать с предыдущим, если уменьшилось, считать что действие - выдано 
    function AddToTableCartridgeStatistics(itemId, nameCartridge) {
        $().SPServices({
            operation: "GetVersionCollection",
            async: false,
            strlistID: settings().listId,
            strlistItemID: itemId,
            strFieldName: settings().catridgeCountFieldName,
            completefunc: function(xData, Status) {
                //todo hack
                var prevValue = 100;
                var countAddedAction = 0;
                var countReplacedAction = 0;
                
                $(xData.responseText).find("Version").each(function(i) {
                    //todo check isAfter '2016-01-01' 
                    
                  if (moment($(this).attr("Modified")).isAfter(moment().format('DD-MM-YYYY'))) {
                       
                        var currentValue = $(this).attr(settings().catridgeCountFieldName);
                        if (+prevValue > +currentValue) {
                            countReplacedAction++;
                        } else {
                            countAddedAction++;
                        }
                        prevValue = parseInt(currentValue);
                        console.log(moment($(this).attr("Modified")).format('LLL') + " isAfter");
                      
                    } 
                    else {
                        console.log(moment($(this).attr("Modified")).format('LLL') + " isBefore");
                    }
                });
                $('#tbodyStatistiscMonth').append("<tr><td>" + nameCartridge + "</td><td>" + countReplacedAction + "</td><td>" + countAddedAction + "</td></tr>");
            }
        });
    }
});
