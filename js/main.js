

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
			
			navigator.serviceWorker.onmessage = function( evt ){
				
				var message = JSON.parse(evt.data);
				
				
				var html = message.html;
				
				
				var jQuerybody = jQuery(jQuery.parseHTML(html.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0], document, true));
				
				jQuery('body').html(jQuerybody);
				
				/* update the body class */
				var body_class = /body([^>]*)class=(["']+)([^"']*)(["']+)/gi.exec(html.substring(html.indexOf("<body"), html.indexOf("</body>") + 7));
				if(body_class){body_class = body_class[3];}
				jQuery('body').attr('class',body_class);
				
				jQuery('body').trigger('body:refresh', [jQuery('body')]);
				
			}
    		
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
