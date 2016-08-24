$(document).ready(function () {

    $(".welcome-content").hide();
    $(".welcome-image").hide();
    $(".userTargetModalContainer").hide();
    $("input[name='userSource']").pickSPUser();

    var currentUser = $().SPServices.SPGetCurrentUser();

    $().SPServices({
        operation: "GetGroupCollectionFromUser",
        userLoginName: currentUser,
        async: true,
        completefunc: function (xData, Status) {
            if ($(xData.responseXML).find("Group[Name='" + "SuperSupportOwner" + "']").length == 1) {
                $(".userTargetModalContainer").show();
                $("input[name='userTarget']").pickSPUser({
                    onPickUser: function (personObj) {
                        alert(personObj.displayName + " was selected!");
                    },
                    onRemoveUser: function ($input, $ui, personObj) {
                        // this = input element
                        // return false; // will cancel removal
                        alert(" was removed!");
                    },
                    filterSuggestions  : function(suggestions) {
                    var newSuggestions = [];
                    $.each(suggestions, function (i, userInfo) {
                        // If the user's ID is not -1, then add them return it.
                        if (userInfo.accountId !== "-1") {
                            // Change the visible label to include email
                            alert(userInfo.label + " was suggestions!");
                            userInfo.label = userInfo.label + " (" + userInfo.email + ")";
                            newSuggestions.push(userInfo);
                        }
                    });


                    return newSuggestions;
                }
                });
            }

        }
    });


});

function removeItem(itemId, listId) {
    $.ajax({
        url: settings().siteUrl + "_api/web/lists(guid'" + listId + "')/items(" + itemId + ")",
        type: "POST",
        contentType: "application/json;odata=verbose",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },

        success: function (sender, args) {
            console.log("hello remove item");
        },
        error: onError
    });
}


function addItem(listId, itemData) {
    $.ajax({
        url: settings().siteUrl + "_api/web/lists(guid'" + listId + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(itemData),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (sender, args) {
            $("#loaderClaimOut").hide();
            location.reload();
        },
        error: onError
    });
}

function clickDialogGetOut() {
    $(function () {
        $("#dialog-form").dialog({
            buttons: [
                {
                    text: "Выдать",
                    click: function () {
                        $("#loaderClaimGive").show();
                        var userSourceId = $("#userSource").val().split(";")[0];
                        var userTargetId = $("#userTarget").val().split(";")[0];
                        var employeId = null;
                        if (userTargetId) {
                            employeId = userTargetId;
                        } else {
                            employeId = currentUserId;
                        }
                        clickAcceptTask(null, moment(new Date()).format(), userSourceId, $("#discriptionModal").val(), $("#urgencyModalClaim option:selected").text(),
                            $("#categoryModalClaim option:selected").text(), null, employeId);
                    }
                }
            ],
            title: 'Выдать Заявку: ',
            width: 600,
            modal: true,
            resizable: false
        });
    });
}

// Display error messages. 
function onError(error) {
    console.log(error.responseText);
}

function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}
