/**
 * PgwCookie - Version 1.1
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
;(function($){
    $.pgwCookie = function(obj) {

        if (typeof obj == 'undefined') {
            throw new Error('PgwCookie - Your parameter is not an object');
        } else if (! obj.name) {
            throw new Error('PgwCookie - Please provide a name to your cookie');
        }

        // Set cookie
        var set = function() {
            if (typeof obj.expires === 'number') {
                var date = new Date();
                date.setTime(date.getTime() + obj.expires * 60 * 1000);
                var expiresDate = date.toUTCString();
            } else {
                delete obj.expires;
            }

            if (obj.json) {
                obj.value = JSON.stringify(obj.value);
            }

            var setCookie = obj.name + '=' + encodeURIComponent(obj.value) + ';'
                + (obj.expires ? 'expires=' + expiresDate + ';' : '')
                + (obj.path ? 'path=' + obj.path + ';' : '')
                + (obj.domain ? 'domain=' + obj.domain + ';' : '')
                + (obj.secure ? 'secure;' : '');

            return (document.cookie = setCookie);
        };

        // Read cookie
        var read = function() {
            if (document.cookie.length > 0) {
                var cookies = document.cookie.split('; ');

                for (var i in cookies) {
                    var cookieParts = cookies[i].split('=');
                    var cookieName = decodeURIComponent(cookieParts.shift()).trim();
                    var cookieContent = cookieParts.join('=');

                    if (obj.name === cookieName) {
                        cookieContent = decodeURIComponent(cookieContent);
                        if (obj.json && cookieContent.length > 0) {
                            cookieContent = JSON.parse(cookieContent);
                        }
                        return cookieContent;
                    }
                }

                return undefined;
            }
        };

        // Remove cookie
        var remove = function() {
            if (typeof read(obj.name) == 'undefined') {
                return false;
            }

            var removeCookie = obj.name + '=;'
                + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                + (obj.path ? 'path=' + obj.path + ';' : '')
                + (obj.domain ? 'domain=' + obj.domain + ';' : '')
                + (obj.secure ? 'secure;' : '');

            return (document.cookie = removeCookie);
        };

        // Select the action
        if (typeof obj.value != 'undefined') {
            if (obj.value === null) {
                return remove();
            } else {
                return set();
            }
        } else {
            return read();
        }
    }
})(jQuery);
