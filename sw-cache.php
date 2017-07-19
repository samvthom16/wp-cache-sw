<?php
   /*
   Plugin Name: Offline Cache
   Plugin URI: 
   Description: A plugin to enhance offline capabilities using a service worker
   Version: 1.0
   Author: Mr. Samuel Thomas
   Author URI: 
   License: GPL2
   */


	add_action('wp_footer', function(){
	
		wp_enqueue_script('sw-cache', plugins_url('sw-cache/js/main.js'), array(), '2.0');
		
		
		$url = site_url('service-worker.js') . "?file=" . plugins_url('sw-cache/js/sdk.js')."?v=1";
		
		
		wp_localize_script('sw-cache', 'settings', array( 
			'sw_js_url'	=> $url,
			'sw_enable'	=> true
		));
	});

