

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
	
		if( settings['sw_enable'] ){
			
			
			
    		navigator.serviceWorker.register(settings['sw_js_url']).then(function(registration) {
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
