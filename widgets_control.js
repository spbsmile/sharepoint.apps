/**
 * Created by M_Zabiyakin on 21.06.2016.
 */
$(document).ready(function () {
    $(".widget_departament").on('click', function () {
        var selector = (typeof($(this).attr('id')) !== 'undefined' || $(this).attr('id') !== null) ? '#' + $(this).attr('id') : '.' + $(this).attr('class');
        var department = $(selector + "_title").text();

        $("#breadcrumbs_group").append('<a href="#" class="btn btn-default">' + department + '\</a>');
        prepareSearch(department);
    });

    $("#btnMainSearch").click(function () {
        prepareSearch($("#textarea_mainsearch_client").val());
    });

    $("#mainsearch_client").keypress(function (e) {
        if (e.which == 13) {
            prepareSearch($("#textarea_mainsearch_client").val());
        }
    });

    $("#breadcrumbs_employee").on('click', function () {
        $("#container_widget_departments").show();
        $("#container_employee_department").hide();

        $('#breadcrumbs_group').children('a').each(function (i) {
            if (i > 0) {
                $(this).remove();
            }
        });
    });

    function prepareSearch(text) {
        $("#container_widget_departments").hide();
        $("#container_employee_department").show();
        $("#employeeBlock").empty();
        startSearch(text);
    }

    function startSearch(department) {
        $.ajax({
            url: "http://intranet/_api/search/query?querytext='" + encodeURIComponent(department) + "'&trimduplicates=true&enablequeryrules=false&bypassresulttypes=true&rowlimit=100&sortlist='RefinableString01:ascending%2cRefinableString02:ascending'&selectproperties='Title%2cJobTitle%2cWorkemail%2cPath%2c+WorkPhone%2cDepartment%2cPictureURL'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var rowId = null;
                var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

                var division = null;

                for (var i = 0; i < results.length; i++) {

                    var email = "";
                    if (results[i].Cells.results[4].Value) {
                        email = results[i].Cells.results[4].Value;
                    }

                    var workphone = "";
                    if (results[i].Cells.results[6].Value) {
                        workphone = results[i].Cells.results[6].Value;
                    }

                    if (i === 0) {
                        $("#chief_widget").append(
                            "<div class='employeeCell'>" +
                            "<div class='wrap_employeeCell'>" +
                            '<div class="col-xs-6 col-md-3 left_column_personal_widget"><a class="thumbnail"><img src="' + results[i].Cells.results[8].Value + '" alt=""></a></div>' +
                            '<div class="right_column_personal_widget">' +
                            '<p><strong>' + results[i].Cells.results[2].Value + '</strong></p> ' +
                            '<p> Департамент: ' + results[i].Cells.results[7].Value + '</p> ' +
                            '<p> Должность: ' + results[i].Cells.results[3].Value + '</p>' +
                            '<p><i class="fa fa-envelope"></i> &nbsp;<a  href="mailto:' + email + '"> ' + email + '</a></p>' +
                            '<p><i class="fa fa-phone"></i> &nbsp;<a  href="tel:+' + workphone + '"> ' + workphone + '</a></p>' +
                            '</div></div></div>');
                    } else {
                        if (division != Math.floor((i - 1) / 3)) {
                            division = Math.floor((i - 1) / 3);
                            rowId = "row_empl_" + division;
                            $("#employeeBlock").append('<div id="' + rowId + '" class="employeeRow">' +
                                "<div class='employeeCell'>" +
                                "<div class='wrap_employeeCell'>" +
                                '<div class="col-xs-6 col-md-3 left_column_personal_widget"><a class="thumbnail"><img src="' + results[i].Cells.results[8].Value + '" alt=""></a></div>' +
                                '<div class="right_column_personal_widget">' +
                                '<p><strong>' + results[i].Cells.results[2].Value + '</strong></p> ' +
                                '<p> Департамент: ' + results[i].Cells.results[7].Value + '</p> ' +
                                '<p> Должность: ' + results[i].Cells.results[3].Value + '</p>' +
                                '<p><i class="fa fa-envelope"></i> &nbsp;<a  href="mailto:' + email + '"> ' + email + '</a></p>' +
                                '<p><i class="fa fa-phone"></i> &nbsp;<a  href="tel:+' + workphone + '"> ' + workphone + '</a></p>' +
                                // '<p><i class="fa fa-external-link"></i>  &nbsp;<a  href="' + results[i].Cells.results[5].Value + '">Страница сотрудника</a></p>' +
                                '</div></div></div></div>');
                            rowId = "#" + rowId;
                        } else {
                            $(rowId).append(
                                "<div class='employeeCell'>" +
                                "<div class='wrap_employeeCell'>" +
                                '<div class="col-xs-6 col-md-3 left_column_personal_widget"><a class="thumbnail"><img src="' + results[i].Cells.results[8].Value + '" alt=""></a></div>' +
                                '<div class="right_column_personal_widget">' +
                                '<p><strong>' + results[i].Cells.results[2].Value + '</strong></p> ' +
                                '<p> Департамент: ' + results[i].Cells.results[7].Value + '</p> ' +
                                '<p> Должность: ' + results[i].Cells.results[3].Value + '</p>' +
                                '<p><i class="fa fa-envelope"></i> &nbsp;<a  href="mailto:' + email + '"> ' + email + '</a></p>' +
                                '<p><i class="fa fa-phone"></i> &nbsp;<a  href="tel:+' + workphone + '"> ' + workphone + '</a></p>' +
                                '</div></div></div>');
                        }
                    }
                }
            },
            error: function (data) {
                console.log(data + "fail");
            }
        });
    }
});