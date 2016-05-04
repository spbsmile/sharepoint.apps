/**
 * Created by M_Zabiyakin on 14.03.2016.
 */

var results;

$(document).ready(function () {
    $("#btnSearchNav").click(function () {
        $("#resultsDiv").empty();
        $("#loaderSearch").show();
        SP.SOD.executeFunc('SP.Search.js', 'Microsoft.SharePoint.Client.Search.Query', startSearch);
    });

    $( "#textSearch" ).keypress(function(e) {
        if(e.which == 13) {
            $('#modalSearchResult').modal();
            $("#resultsDiv").empty();
            $("#loaderSearch").show();
            SP.SOD.executeFunc('SP.Search.js', 'Microsoft.SharePoint.Client.Search.Query', startSearch);
        }
    });
});

function startSearch() {
    console.log("hello new vs")
    var text = $("#textSearch").val();
    $("#modalSearchResultLabel").text("Поиск: " + text);
    console.log(_spPageContextInfo.webAbsoluteUrl + " _spPageContextInfo.webAbsoluteUrl +");
    console.log(appWebUrl + " appWebUrl");
    console.log(text + " text");
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='" + encodeURIComponent(text) + "'&trimduplicates=true&enablequeryrules=false&bypassresulttypes=true&selectproperties='Title%2cJobTitle%2cWorkemail%2cPath%2c+WorkPhone%2cDepartment%2cPictureURL'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
        method: "GET",
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data) {
            //var jsonObject = JSON.parse(data.body.toString());
            console.log("success");
            console.log(data);
            $("#loaderSearch").hide();
            $("#textSearch").val(" ");
            var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
            console.log(results);
            $("#resultsDiv").append('<div class="container">');
            if (results.length <= 0) {
                $("#resultsDiv").text("Ничего не найдено!");
            } else {
                for (var i = 0; i < results.length; i++) {

                    $("#resultsDiv").append('<div class="row"> <div class="span4 well"> <div class="row">');// well-sm

                    $("#resultsDiv").append('<div class="col-xs-6 col-md-3" style="height: 160px; width: 112px;"><a class="thumbnail"><img src="' + results[i].Cells.results[8].Value + '" alt=""></a></div>');

                    var email = "";
                    if (results[i].Cells.results[4].Value) {
                        email = results[i].Cells.results[4].Value;
                    }

                    var workphone = "";
                    if (results[i].Cells.results[6].Value) {
                        workphone = results[i].Cells.results[6].Value;
                    }

                    $("#resultsDiv").append('<div>' +
                        '<p><strong>' + results[i].Cells.results[2].Value + '</strong></p> ' +
                        '<p> Департамент: ' + results[i].Cells.results[7].Value + '</p> ' +
                        '<p> Должность: ' + results[i].Cells.results[3].Value + '</p>' +
                        '<p><i class="fa fa-envelope"></i> &nbsp;<a  href="mailto:' + email + '"> ' + email + '</a></p>' +
                        '<p><i class="fa fa-phone"></i> &nbsp;<a  href="tel:+' + workphone + '"> ' + workphone + '</a></p>' +
                        '<p><i class="fa fa-external-link"></i>  &nbsp;<a  href="' + results[i].Cells.results[5].Value + '">Страница сотрудника</a></p>' +
                        '</div>');

                    $("#resultsDiv").append('</div></div></div>');
                }
            }
            $("#resultsDiv").append('</div>');
        },
        error: function (data) {
            console.log(data + "fail");
        }
    });
}

