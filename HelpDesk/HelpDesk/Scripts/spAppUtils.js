(function () {
    var module = {
        getAppAbsoluteUrl: getAppAbsoluteUrl,
        getAppRelativeUrl: getAppRelativeUrl,
        getAppODataApiUrl: getAppODataApiUrl
    };
    return module;

    function getAppAbsoluteUrl() {
        return _spPageContextInfo.webAbsoluteUrl;
    };

    function getAppRelativeUrl() {
        return _spPageContextInfo.webServerRelativeUrl;
    };

    function getAppODataApiUrl() {
        return getAppAbsoluteUrl() + "/_api";
    };
});

NotifyScriptLoadedAndExecuteWaitingJobs("spAppUtils.js");