/*******************************************************************************
 *  
 *  Readyable is a constructor that instantiates an object that will execute a
 *  specified callback function after a series of specified AJAX requests have
 *  successfully returned.
 *  
 */

(function ($) {
	function Readyable(asyncs) {
		var isReady,
			total,
			queue,
			successes,
			key,
			async,
			config;
		
		isReady = this.isReady = false;
		
		// 
		// Keep track of how many asyncs were supplied so we can test within
		// each $.ajax success callback whether we've successfully returned
		// from all of them.
		// 
		total = 0;
		
		// 
		// Store any functions supplied to the `onReady` method. These will be
		// called in order whenever this instance enters its ready state (after
		// all configured AJAX requests have successfully returned.
		// 
		queue = this.queue = [];
		
		// 
		// Keep track of any successful returns from the AJAX requests. When
		// the length of this array is equal to the final value of `total` this
		// instance should be considered in the ready state.
		// 
		// Originally was going to just tally as with `total` but I figured it
		// might be useful to be able to see which of the calls successfully
		// returned so this will store the identifying key of the `asyncs` hash
		// instead.
		// 
		successes = [];
		
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
				config.error = function (xhr) { console.log("ERROR"); };
				
				config.success = (function (async, key) {
					return function(d) {
						successes[successes.length] = key;
						
						// 
						// The `ready` callback function should use the instance
						// as the value of `this` which is supplied to the
						// $.ajax `success` method via the `context` property.
						// 
						async.ready.call(this, d);
					};
				})(async, key);
				
				$.ajax(config);
			}
		}
	}
	
	Readyable.prototype.onReady = function (fn) {};
	
	window.Readyable = Readyable;
})(jQuery);