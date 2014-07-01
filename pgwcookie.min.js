/**
 * PgwCookie - Version 1.4
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
 */
(function(a){a.pgwCookie=function(d){if(typeof d=="undefined"){throw new Error("PgwCookie - Your parameter is not an object")}else{if(!d.name){throw new Error("PgwCookie - Please provide a name to your cookie")}}var e=function(){if(typeof d.expires==="number"){var f=new Date();f.setTime(f.getTime()+d.expires*60*1000);var h=f.toUTCString()}else{delete d.expires}if(d.json){d.value=JSON.stringify(d.value)}else{if(!d.raw){d.value=encodeURIComponent(d.value)}}var g=d.name+"="+d.value+";"+(d.expires?"expires="+h+";":"")+(d.path?"path="+d.path+";":"")+(d.domain?"domain="+d.domain+";":"")+(d.secure?"secure;":"");return(document.cookie=g)};var c=function(){if(document.cookie.length>0){var h=document.cookie.split("; ");if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}for(var g in h){var k=h[g].split("=");var j=decodeURIComponent(k.shift()).trim();var f=k.join("=");if(d.name===j){if(d.json&&f.length>0){f=JSON.parse(f)}else{if(!d.raw){f=decodeURIComponent(f)}}return f}}return undefined}};var b=function(){if(typeof c(d.name)=="undefined"){return false}var f=d.name+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"+(d.path?"path="+d.path+";":"")+(d.domain?"domain="+d.domain+";":"")+(d.secure?"secure;":"");return(document.cookie=f)};if(typeof d.value!="undefined"){if(d.value===null){return b()}else{return e()}}else{return c()}}})(window.Zepto||window.jQuery);
