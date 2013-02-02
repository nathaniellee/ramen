/*******************************************************************************
 *  
 *  Readyable is a constructor that instantiates an object that will execute a
 *  specified callback function after a series of specified AJAX requests have
 *  successfully returned.
 *  
 */

(function ($) {
	function Readyable(asyncs) {
		var total,
			key,
			async,
			config;
		
		// 
		// Keep track of how many asyncs were supplied so we can test within
		// each $.ajax success callback whether we've successfully returned
		// from all of them.
		// 
		total = 0;
		
		for (key in asyncs) {
			if (asyncs.hasOwnProperty(key)) {
				async = asyncs[key];
				
				// 
				// Skip this iteration if no `url` property was provided.
				// 
				if (!async.url) {
					continue;
				}
				
				// 
				// The `ready` property provides a function to be called when
				// this particular $.ajax call successfully returns. Defaults to
				// an empty function.
				// 
				async.ready = async.ready || function () {};
				
				// 
				// The `crossOrigin` property indicates whether the $.ajax call
				// should use JSONP to handle cross-origin issues. Defaults to
				// false.
				// 
				async.crossOrigin = async.crossOrigin || false;
				
				total++;
				
				config = {};
				config.url = async.url;
				config.dataType = async.crossOrigin ? "jsonp" : "json";
				config.context = this;
				config.success = function (resp) { console.log("SUCCESS"); };
				config.error = function (xhr) { console.log("ERROR"); };
				
				$.ajax(config);
			}
		}
	}
	
	Readyable.prototype.onReady = function (fn) {};
	
	window.Readyable = Readyable;
})(jQuery);