/**
 * Created by M_Zabiyakin on 21.06.2016.
 */
// use for breadcrumbs
var additionalEmployeesCurrent;
var organizationCurrent;
// dictionary hierarchy
var departmentsTree = {};
//const
var countWidgetsInRow = 3;

$(document).ready(function () {

    createMainPage();

    // search input handlers
    $("#btnMainSearch").click(function () {
        var query = $("#textarea_mainsearch_client").val();
        clearBreadcrumbs();
        $("#textarea_mainsearch_client").val('');
        prepareSearch();
        startSearch(query, "", true, false);
        $("#breadcrumbs_group").append('<a href="#" class="btn btn-default">' + "Поиск: " + query + '\</a>');
    });

    $("#mainsearch_client").keypress(function (e) {
        if (e.which == 13) {
            var query = $("#textarea_mainsearch_client").val();
            clearBreadcrumbs();
            $("#textarea_mainsearch_client").val('');
            $("#textarea_mainsearch_client").attr('rows', 1);
            prepareSearch();
            startSearch(query, "", true, false, null, true);
            $("#breadcrumbs_group").append('<a href="#" class="btn btn-default">' + "Поиск: " + query + '\</a>');
        }
    });

    // breadcrumbs handlers
    $("#breadcrumbs_employee").on('click', function () {
        $("#container_widget_departments").show();
        $("#container_employee_department").hide();
        $("#breadcrumbs_container").hide();
        $(".right_column").show();
        $(".left_column").show();
        clearBreadcrumbs();
    });

    function clearBreadcrumbs() {
        $('#breadcrumbs_group').children('a').each(function (i) {
            if (i > 0) {
                $(this).remove();
            }
        });
    }

    function clickBreadcrumbMiddleLevel() {
        clearBreadcrumbs();
        addBreadcrumb(organizationCurrent);
        addBreadcrumbHandler();
        prepareSearch();
        startSearch(organizationCurrent, organizationCurrent, true, true, additionalEmployeesCurrent);

        var key = organizationCurrent.trim();
        if (departmentsTree[key]) {
            createWidgetsOtdels(key, departmentsTree[key]);
        }
    }

    function addBreadcrumbHandler() {
        $('.breadcrumbMiddleLevel').on('click', clickBreadcrumbMiddleLevel);
    }

    function addBreadcrumb(nameBreadcrumb) {
        $("#breadcrumbs_group").append('<a href="#" class="btn btn-default breadcrumbMiddleLevel">' + nameBreadcrumb + '\</a>');
    }

    // dynamic main page
    function createMainPage() {
        $.ajax({
            url: getUrlQuerySearch('*', "Department%2cOrganization%2cIsDisabled%2cotdel2%2cTitle", 600, false),
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: successCreateMainPage,
            error: errorHandler
        });
    }

    function successCreateMainPage(data) {
        var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

        // iterate of all users
        for (var i = 0; i < results.length; i++) {
            var department = results[i].Cells.results[2].Value;
            var otdel = clearLetter(results[i].Cells.results[3].Value);
            var isDisabled = results[i].Cells.results[4].Value;
            var otdel2 = results[i].Cells.results[5].Value;

            if (department && !isDisabled && department != "Аналитический центр") {
                if (otdel && otdel != department) {
                    if (!departmentsTree.hasOwnProperty(otdel)) {
                        departmentsTree[otdel] = [];
                        departmentsTree[otdel].push(department);
                    } else if (departmentsTree[otdel].indexOf(department) == -1) {
                        departmentsTree[otdel].push(department);
                    }
                } else if (!departmentsTree.hasOwnProperty(department)) {
                    departmentsTree[department] = [];
                }
                if (otdel2) {
                    if (!departmentsTree.hasOwnProperty(otdel2)) {
                        departmentsTree[otdel2] = [];
                        if (!departmentsTree[otdel2].hasOwnProperty("additionalEmployess")) {
                            departmentsTree[otdel2].additionalEmployess = [];
                        }
                        departmentsTree[otdel2].additionalEmployess.push(results[i].Cells.results[6].Value);
                    } else {
                        if (!departmentsTree[otdel2].hasOwnProperty("additionalEmployess")) {
                            departmentsTree[otdel2].additionalEmployess = [];
                        }
                        departmentsTree[otdel2].additionalEmployess.push(results[i].Cells.results[6].Value);
                    }
                }
            }
        }

        var sortArray = ["Руководство", "Планово-финансовый департамент", "Секретариат и канцелярия", "Бухгалтерия", "Коммерческий отдел"];

        function sortObject(o) {
            var sorted = {},
                key,
                a = [];

            for (key in o) {
                if (o.hasOwnProperty(key)) {
                    a.push(key);
                }
            }

            for (i = 0; i < sortArray.length; i++) {
                var index = a.indexOf(sortArray[i]);
                var temp = a[i];
                a[i] = sortArray[i];
                a[index] = temp;
            }

            var secondArray = [];
            for (i = sortArray.length; i < a.length; i++) {
                secondArray.push(a[i]);
            }
            secondArray.sort();

            var shift = sortArray.length;
            for (i = 0; i < secondArray.length; i++) {
                a[i + shift] = secondArray[i];
            }

            for (key = 0; key < a.length; key++) {
                sorted[a[key]] = o[a[key]];
            }
            return sorted;
        }

        var index = 0;
        for (var name in sortObject(departmentsTree)) {
            if (index === 0) {
                createWidgetEmployees("#container_widget_departments", "widget_departament owner", name, "additionalEmployee_" + index);
            } else {
                createWidgetEmployees("#container_widget_departments", "widget_departament departament_row", name, "additionalEmployee_" + index);
            }
            index++;
        }

        //  handlers of click widget on main page
        $(".widget_departament").on('click', function () {
            var organization = $(this).children('.title_inner').text();
            var dataAdditionalEmployee = $(this).children('.additionalEmployee').text().split('|');

            prepareSearch();
            addBreadcrumb(organization);
            organizationCurrent = organization;
            additionalEmployeesCurrent = dataAdditionalEmployee;
            var isHasOtdels = false;
            var otdels = $(this).children('.containerOtdels').text().split(',');
            if (otdels && otdels.length > 0 && otdels[0] != " " && otdels[0] && otdels[0].trim() != 'Машзавод "РИВС"') {
                createWidgetsOtdels(organization, otdels);
                isHasOtdels = true;
                addBreadcrumbHandler();
            }
            startSearch(organization, organization, true, isHasOtdels, dataAdditionalEmployee);
        });
    }

    // main functions of search
    function prepareSearch() {
        $("#container_widget_departments").hide();
        $("#container_employee_department").show();
        $(".right_column").hide();
        $(".left_column").hide();
        $("#breadcrumbs_container").show();
        $("#employeeBlock").empty();
        $("#chief_widget").empty();
    }

    function startSearch(query, organization, isMainSearch, isHaveOtdels, additionalEmployees, isInputSearch) {
        $.ajax({
            url: getUrlQuerySearch(query, "Title%2cJobTitle%2cWorkemail%2cPath%2cWorkPhone%2cDepartment%2cPictureURL%2cOrganization%2cIsDisabled%2cRefinableString01", 100, true, isInputSearch),
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var rowId = null;
                var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
                var indexRow = null;
                var innerShift = 1;
                var innerIndex = 0;

                function createWidgetEmployeeWithNewRow(data, indexRow) {
                    var rowId = "row_empl_" + indexRow;
                    $("#employeeBlock").append('<div id="' + rowId + '" class="employeeRow">' +
                        createWidgetEmployee(data.photo, data.name, data.department, data.jobTitle, data.email, data.phone) +
                        '</div>');
                    return "#" + rowId;
                }

                for (var i = 0; i < results.length; i++) {
                    var d = getData(results[i]);

                    if (d.isdisabled) {
                        continue;
                    }

                    var otdel = clearLetter(d.otdel);
                    var department = clearLetter(d.department);

                    // filter of common search query
                    if (organization) {
                        var organizationTrim = organization.trim();
                        if (isMainSearch && otdel && organizationTrim != otdel) {
                            continue;
                        }
                        if (isMainSearch && department && organizationTrim != department) {
                            continue;
                        }
                        if (!isMainSearch && organizationTrim != otdel) {
                            continue;
                        }
                    }
                    if (isMainSearch && otdel && otdel != department) {
                        continue;
                    }

                    if (innerIndex === 0 && !isHaveOtdels) {
                        if (d.postalCode) {
                            $("#chief_widget").append(
                                createWidgetEmployee(d.photo, d.name, d.department, d.jobTitle, d.email, d.phone));
                        } else {
                            innerShift = 0;
                            indexRow = Math.floor((innerIndex - innerShift) / countWidgetsInRow);
                            rowId = createWidgetEmployeeWithNewRow(d, indexRow);
                        }
                    } else {
                        if (indexRow != Math.floor((innerIndex - innerShift) / countWidgetsInRow)) {
                            indexRow = Math.floor((innerIndex - innerShift) / countWidgetsInRow);
                            rowId = createWidgetEmployeeWithNewRow(d, indexRow);
                        } else {
                            $(rowId).append(
                                createWidgetEmployee(d.photo, d.name, d.department, d.jobTitle, d.email, d.phone));
                        }
                    }
                    innerIndex++;
                }

                if (additionalEmployees && additionalEmployees.length > 0 && additionalEmployees[0] != " " && additionalEmployees[0]) {

                    for (var i = 0; i < additionalEmployees.length - 1; i++) {
                        var employeeData = additionalEmployees[i].split(",");
                        if (indexRow != Math.floor((innerIndex - innerShift) / countWidgetsInRow)) {
                            indexRow = Math.floor((innerIndex - innerShift) / countWidgetsInRow);
                            rowId = "row_empl_" + indexRow;
                            $("#employeeBlock").append('<div id="' + "row_empl_" + indexRow + '" class="employeeRow">' +
                                createWidgetEmployee(employeeData[0], employeeData[1], employeeData[2], employeeData[4], employeeData[5], employeeData[6]) +
                                '</div>');
                            rowId = "#" + rowId;
                        } else {
                            $(rowId).append(
                                createWidgetEmployee(employeeData[0], employeeData[1], employeeData[2], employeeData[4], employeeData[5], employeeData[6]));
                        }
                        innerIndex++;
                    }
                }
                // stub for last row
                while (indexRow === Math.floor((innerIndex - innerShift) / countWidgetsInRow)) {
                    innerIndex++;
                    $(rowId).append(
                        createWidgetEmployee("#", null, null, null, null, null, true));
                }
            },
            error: errorHandler
        });
    }

    function createWidgetEmployee(photo, name, department, jobTitle, email, phone, isStub) {
        var styleStub = isStub ? "style='display: none;'" : "";
        var widget =
            "<div class='employeeCell_widget'>" +
            "<div class='wrap_employeeCell_widget'" + styleStub + ">" +
            '<div class="col-xs-6 col-md-3 left_column_personal_widget"><a class="thumbnail"><img class="iconperson" src="' + photo + '" alt="" ></a></div>' +
            '<div class="right_column_personal_widget">' +
            '<p><strong>' + name + '</strong></p> ' +
            '<p>' + department + '</p> ' +
            '<p>' + jobTitle + '</p>' +
            '<p><i class="fa fa-envelope"></i> &nbsp;<a  href="mailto:' + email + '"> ' + email + '</a></p>' +
            '<p><i class="fa fa-phone"></i> &nbsp;<a  href="tel:+' + phone + '"> ' + phone + '</a></p>' +
            // '<p><i class="fa fa-external-link"></i>  &nbsp;<a  href="' + results[i].Cells.results[5].Value + '">Страница сотрудника</a></p>' +
            '</div></div></div>';
        return widget;
    }

    function createWidgetEmployees(idContainer, cssClassWidget, nameContainer, idAdditionalEmployee) {
        var contentForWidgetOnMainPage = idAdditionalEmployee ? '<div class="containerOtdels"> ' + departmentsTree[nameContainer] + '</div>' +
        '<div id="' + idAdditionalEmployee + '" class="additionalEmployee"> </div></div>' : "";

        $(idContainer).append(
            '<div class="' + cssClassWidget + '">' +
            '<div class="title_inner"> ' + nameContainer + '</div>' + contentForWidgetOnMainPage);

        if (idAdditionalEmployee && departmentsTree[nameContainer].hasOwnProperty("additionalEmployess")) {
            var names = departmentsTree[nameContainer].additionalEmployess;
            var id = "#" + idAdditionalEmployee;
            for (var i = 0; i <= names.length; i++) {
                getOnePersonFromSearch(names[i], id);
            }
        }
    }

    function getOnePersonFromSearch(personName, idStorage) {
        $.ajax({
            url: getUrlQuerySearch(personName, "Title%2cJobTitle%2cWorkemail%2cPath%2cWorkPhone%2cDepartment%2cPictureURL%2cOrganization%2cIsDisabled", 1, true),
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
                var array = [];
                for (var i = 0; i < results.length; i++) {
                    var d = getData(results[i]);
                    array[0] = d.photo;
                    array[1] = d.name;
                    array[2] = d.department;
                    array[3] = d.jobTitle;
                    array[4] = d.email;
                    array[5] = d.phone;
                    array[6] = d.otdel;
                    array[7] = d.postalCode;
                    array[8] = "|";

                    $(idStorage).text(array + $(idStorage).text());
                }
            },
            error: errorHandler
        });
    }

    function getUrlQuerySearch(query, selectproperties, rowlimit, isSortList, isInputSearch) {
        var textWithWildcard = isInputSearch ? query + "*" : query;
        //var queryTest = isInputSearch ? !!window.chrome && !!window.chrome.webstore ? query + "*" : encodeURIComponent(query + "*") : query;

        var sortList = isSortList ? "&sortlist='RefinableString01:ascending%2cRefinableString02:ascending'" : "";
        var url =
            "/_api/search/query?querytext='" + encodeURIComponent(textWithWildcard) + "'" +
            "&trimduplicates=false&rowlimit='" + rowlimit + "'" +
            sortList +
            "&bypassresulttypes=true" +
            "&enablequeryrules=false" +
            "&selectproperties='" + selectproperties + "'" +
            "&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'";
        return url;
    }

    function getData(result) {
        var module = [];
        module.name = result.Cells.results[2].Value;
        module.jobTitle = result.Cells.results[3].Value ? result.Cells.results[3].Value : "_";
        module.email = result.Cells.results[4].Value ? result.Cells.results[4].Value : "";
        module.phone = result.Cells.results[6].Value ? result.Cells.results[6].Value : "";
        module.department = result.Cells.results[7].Value;
        if (result.Cells.results[8].Value) {
            var photo = result.Cells.results[8].Value.replace(/ /g, '%20');
            module.photo = photo.replace("_MThumb.jpg", "_LThumb.jpg");
        } else {
            module.photo = "/_layouts/15/CustomjsLibs/1.devsp/noPhoto.jpg";
        }
        module.otdel = result.Cells.results[9].Value ? result.Cells.results[9].Value : "";
        module.isdisabled = result.Cells.results[10].Value;
        module.postalCode = result.Cells.results[11].Value;
        return module;
    }

    function createWidgetsOtdels(organization, otdels) {
        otdels.sort();
        var initialIndex = 0;
        var index = otdels.indexOf("Руководство");
        if (index != -1) {
            var temp = otdels[0];
            otdels[0] = otdels[index];
            otdels[index] = temp;
            createWidgetEmployees("#chief_widget", "widget_organization_inner owner", otdels[0]);
            initialIndex++;
        }
        for (var i = initialIndex; i < otdels.length; i++) {
            if (clearLetter(otdels[i]) === organization) {
                continue;
            }
            createWidgetEmployees("#employeeBlock", "widget_organization_inner departament_row", otdels[i]);
        }
        //  handlers of click widget otdels on inner page
        $(".widget_organization_inner").on('click', function () {
            // todo apply filter: only relative organization
            var otdel = $(this).children('.title_inner').text();
            prepareSearch();
            startSearch(otdel, organization, false, false);
            $("#breadcrumbs_group").append('<a href="#" class="btn btn-default">' + otdel + '\</a>');
        });
    }

    function clearLetter(letter) {
        if (!letter)
            return "";
        var t = letter.replace(/['"]+/g, '');
        var f = t.replace('»', '');
        var v = f.replace('«', '');
        return v.replace('«', '');
    }

    function errorHandler(data) {
        console.log(data + "fail");
    }
});
