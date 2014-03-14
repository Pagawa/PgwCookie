/**
 * PgwCookie - Version 1.0
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){
    $.pgwCookie = function(config) {

	var defaults = {};
	config = $.extend({}, defaults, config);

	// Check if the name parameter exists
	if (! config.name) {
		throw new Error('PgwCookie - Please provide a name for your cookie');
	}

	// Set cookie
	var set = function() {
		if (typeof config.expires === 'number') {
			var date = new Date();
			date.setTime(date.getTime() + config.expires * 60 * 1000);
			var expiresDate = date.toUTCString();
		} else {
			delete config.expires;
		}

		if (config.json) {
			config.value = JSON.stringify(config.value);
		}

		var setCookie = config.name + '=' + encodeURIComponent(config.value) + ';'
			+ (config.expires ? 'expires=' + expiresDate + ';' : '')
                        + (config.path ? 'path=' + config.path + ';' : '')
                        + (config.domain ? 'domain=' + config.domain + ';' : '')
                        + (config.secure ? 'secure;' : '');

		return (document.cookie = setCookie);
	};

	// Read cookie
	var read = function() {
		if (document.cookie.length > 0) {
			var cookies = document.cookie.split('; ');

			for (var i in cookies) {
				var cookieParts = cookies[i].split('=');
				var cookieName = decodeURIComponent(cookieParts.shift());
				var cookieContent = cookieParts.join('=');

				if (config.name === cookieName) {
					cookieContent = decodeURIComponent(cookieContent);
					if (config.json && cookieContent.length > 0) {
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
		if (typeof read(config.name) == 'undefined') {
			return false;
		}

		var removeCookie = config.name + '=;'
			+ 'expires=Thu, 01 Jan 1970 00:00:01 GMT;'
			+ (config.path ? 'path=' + config.path + ';' : '')
			+ (config.domain ? 'domain=' + config.domain + ';' : '')
			+ (config.secure ? 'secure;' : '');

		return (document.cookie = removeCookie);
	};

	// Choose the action type
	if (typeof config.value != 'undefined') {
		if (config.value === null) {
			return remove();
		} else {
			return set();
		}
	} else {
		return read();
	}
    }
})(jQuery);
