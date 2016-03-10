(function (window, undefined) {

    "use strict";

    var $ = window.jQuery;
    var document = window.document;

    // Имя параметра SPHostUrl
    var SPHostUrlKey = "SPHostUrl";

    // Получает SPHostUrl из текущего URL-адреса и добавляет его в качестве строки запроса к ссылкам, указывающим на текущий домен на странице.
    $(document).ready(function () {
        ensureSPHasRedirectedToSharePointRemoved();

        var spHostUrl = getSPHostUrlFromQueryString(window.location.search);
        var currentAuthority = getAuthorityFromUrl(window.location.href).toUpperCase();

        if (spHostUrl && currentAuthority) {
            appendSPHostUrlToLinks(spHostUrl, currentAuthority);
        }
    });

    // Добавляет SPHostUrl в качестве строки запроса ко всем ссылкам, указывающим на текущий домен.
    function appendSPHostUrlToLinks(spHostUrl, currentAuthority) {
        $("a")
            .filter(function () {
                var authority = getAuthorityFromUrl(this.href);
                if (!authority && /^#|:/.test(this.href)) {
                    // Отфильтровывает привязки и URL-адреса с неподдерживаемыми протоколами.
                    return false;
                }
                return authority.toUpperCase() == currentAuthority;
            })
            .each(function () {
                if (!getSPHostUrlFromQueryString(this.search)) {
                    if (this.search.length > 0) {
                        this.search += "&" + SPHostUrlKey + "=" + spHostUrl;
                    }
                    else {
                        this.search = "?" + SPHostUrlKey + "=" + spHostUrl;
                    }
                }
            });
    }

    // Получает SPHostUrl из заданной строки запроса.
    function getSPHostUrlFromQueryString(queryString) {
        if (queryString) {
            if (queryString[0] === "?") {
                queryString = queryString.substring(1);
            }

            var keyValuePairArray = queryString.split("&");

            for (var i = 0; i < keyValuePairArray.length; i++) {
                var currentKeyValuePair = keyValuePairArray[i].split("=");

                if (currentKeyValuePair.length > 1 && currentKeyValuePair[0] == SPHostUrlKey) {
                    return currentKeyValuePair[1];
                }
            }
        }

        return null;
    }

    // Получает информацию о правах из заданного URL-адреса (как из абсолютного адреса с указанием протокола HTTP или HTTPS, так и из относительного адреса).
    function getAuthorityFromUrl(url) {
        if (url) {
            var match = /^(?:https:\/\/|http:\/\/|\/\/)([^\/\?#]+)(?:\/|#|$|\?)/i.exec(url);
            if (match) {
                return match[1];
            }
        }
        return null;
    }

    // Если строка запроса включает SPHasRedirectedToSharePoint, удалите этот параметр.
    // Поэтому, когда пользователь добавляет URL-адрес в закладки, SPHasRedirectedToSharePoint не включается.
    // Обратите внимание, что изменение window.location.search приведет к созданию дополнительного запроса к серверу.
    function ensureSPHasRedirectedToSharePointRemoved() {
        var SPHasRedirectedToSharePointParam = "&SPHasRedirectedToSharePoint=1";

        var queryString = window.location.search;

        if (queryString.indexOf(SPHasRedirectedToSharePointParam) >= 0) {
            window.location.search = queryString.replace(SPHasRedirectedToSharePointParam, "");
        }
    }

})(window);
