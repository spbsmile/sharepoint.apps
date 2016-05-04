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
});

function startSearch() {
    var text = $("#textSearch").val();
    $("#modalSearchResultLabel").text("Поиск: " + text);
    $.ajax({
        url: "http://devsp/_api/search/query?querytext='" + text + "'&trimduplicates=true&enablequeryrules=false&bypassresulttypes=true&selectproperties='Title%2cJobTitle%2cWorkemail%2cPath%2c+WorkPhone%2cDepartment'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
        method: "GET",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
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

                    //photo
                    //$("#resultsDiv").append('<div class="span1"><a href="#" class="thumbnail"><img src="#" alt=""></a></div>');
                    $("#resultsDiv").append('<div class="span3">');

                    // name
                    $("#resultsDiv").append('<p><strong>' + results[i].Cells.results[2].Value + '</strong></p>');

                    // departament
                    $("#resultsDiv").append('<p> Департамент: ' + results[i].Cells.results[7].Value + '</p>');

                    // job title
                    $("#resultsDiv").append('<p> Должность: ' + results[i].Cells.results[3].Value + '</p>');

                    var email = "";
                    if (results[i].Cells.results[4].Value) {
                        email = results[i].Cells.results[4].Value;
                    }
                    $("#resultsDiv").append('<p><i class="fa fa-envelope"></i> &nbsp;<a  href="mailto:' + email + '"> ' + email + '</a></p>');
			
                    var workphone = "";
			if (results[i].Cells.results[6].Value){
				workphone = results[i].Cells.results[6].Value;
			}
                    // work phone
                    $("#resultsDiv").append('<p><i class="fa fa-phone"></i> &nbsp;<a  href="tel:+' + workphone  + '"> ' + workphone  + '</a></p>');

                    // link private site
                    $("#resultsDiv").append('<p><i class="fa fa-external-link"></i>  &nbsp;<a  href="' + results[i].Cells.results[5].Value + '">Страница сотрудника</a></p>');

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

