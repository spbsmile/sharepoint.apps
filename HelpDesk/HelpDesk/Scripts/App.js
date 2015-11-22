"use strict";

$(document).ready(function() {

    var listName = "Movies";
    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));

    var scriptbase = hostweburl + "/_layouts/15/";
    
    SP.SOD.registerSod('sp.requestExecutor.js', '/_layout/15/sp.requestExecutor.js');
    SP.SOD.executeFunc('sp.requestExecutor.js', 'SP.RequestExecutor', function () {

        $.getScript(scriptbase + "SP.RequestExecutor.js",
        function () {
            $.getScript(scriptbase + "SP.js",
                function() { $.getScript(scriptbase + "SP.RequestExecutor.js") } //, execCrossDomainRequest); }
            );
        }
    );

    });

  

    // Use cross-domain library to interact with more than one domain
    //in your remote add-in page through a proxy
   // function execCrossDomainRequest() {
      //  executor = new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl);
   // }
    console.log(_spPageContextInfo.siteAbsoluteUrl + " _spPageContextInfo.siteAbsoluteUrl ");

    var context;
    var factory;
    var appContextSite;

    context = new SP.ClientContext(appweburl);
    //factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    //context.set_webRequestExecutorFactory(factory);
    appContextSite = new SP.AppContextSite(context, hostweburl);

    $("#showButton").click(function () {
        var executor = new SP.RequestExecutor(_spPageContextInfo.siteAbsoluteUrl);
        console.log(GetItemTypeForListName(listName) + " GetItemTypeForListName");

        var data = {
            __metadata: {
                type: GetItemTypeForListName(listName),
                "Title": "NameNewItem"
            }
        };

        data = JSON.stringify(data);

        executor.executeAsync(
            {
                url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
                method: "POST",
                contentType: "application/json;odata=verbose",
                body: data,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
                },
                success: function(data) { console.log("y") },
                error: function(data) { console.log("n") }
            }
        );


    });

    $("#showButton2").click(function () {

        console.log(GetItemTypeForListName(listName) + " GetItemTypeForListName");

        var itemType = GetItemTypeForListName(listName);

        var item = {
            "__metadata": { "type": itemType },
            "Title": "dgfd"
        };

        console.log(_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items");
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
            
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function(data) {
                console.log("y");
            },
            error: function(data) {
                console.log("sfsd");
            }
        });
    });

   
});



//function to get a parameter value by a specific key
function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}

// Get List Item Type metadata
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}