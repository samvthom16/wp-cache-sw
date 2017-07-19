

if ('serviceWorker' in navigator) {
	
	// console.log( wp_sw_cache_settings );
	
	// var settings = wp_sw_cache_settings;
	
	window.addEventListener('load', function() {
	
		if( wp_sw_cache_settings['sw_enable'] == '1' ){
			
			
			
    		navigator.serviceWorker.register(wp_sw_cache_settings['sw_js_url']).then(function(registration) {
      			// Registration was successful
      			console.log('ServiceWorker registration successful with scope: ', registration.scope);
    		}, function(err) {
      			// registration failed :(
      			console.log('ServiceWorker registration failed: ', err);
    		});
    		
    	}
    	else{
    		
    		console.log('Uninstalling the Service Workers');
    			
    		navigator.serviceWorker.getRegistrations().then(function(registrations) {
 				for(let registration of registrations) {
  					registration.unregister()
				} 
			});
    		
    	}
  	});
}
