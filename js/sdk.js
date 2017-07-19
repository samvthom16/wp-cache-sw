// Inside your sw.js:
function wait(ms) {
	
	return new Promise(resolve => {
    	
    	setTimeout(resolve, ms);
  	
  	});

}


function promiseAny(promises) {
  
  	return new Promise((resolve, reject) => {
    	
    	promises = promises.map(p => Promise.resolve(p));
    	
    	promises.forEach(p => p.then(resolve));
    	
    	promises.reduce((a, b) => a.catch(() => b)).catch(() => reject(Error("All failed")));
  	
  	});

};


self.addEventListener('install', event => {
	
	console.log('Worker: has been successfully installed');
	
	event.waitUntil( self.skipWaiting() );
  	
});

self.addEventListener('fetch', event => {
	
	if( event.request.method !== 'GET' ){
		
		return;
		
	}
	
	if ( event.request.url.indexOf('/wp-json') !== -1 || event.request.url.indexOf('/wp-admin') !== -1 || event.request.url.indexOf('/wp-includes') !== -1 || event.request.url.indexOf('preview=true') !== -1 ) {
    	
    	return;
    	
    }
    
    
	
	const fetchPromise = fetch(event.request);
	
	const cachePromise = caches.match(event.request);

	
	
	event.respondWith(
		
		promiseAny([
      		fetchPromise
      			.then( networkResponse => {
      				
      				console.log('Worker: Server ' + event.request.url );
			
					var responseClone = networkResponse.clone();
			
					caches.open('mycache').then( cache => cache.put( event.request, responseClone ) );
			
					return networkResponse;
      				
      				
      			})
      			.catch(() => cachePromise),
      		wait(50).then(() => cachePromise).then(r => r || fetchPromise)
    	])
		
	);
	
});