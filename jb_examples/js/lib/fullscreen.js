var c = document.body;
document.getElementById( 'fullscreenBtn' ).addEventListener( 'click', function( e ) {
	c.onwebkitfullscreenchange = function(e) {
		c.onwebkitfullscreenchange = function() {
		};
	};
	c.onmozfullscreenchange = function(e) {
		c.onmozfullscreenchange = function() {
		};
	};
	if( c.webkitRequestFullScreen ) c.webkitRequestFullScreen();
	if( c.mozRequestFullScreen ) c.mozRequestFullScreen();
	e.preventDefault();
}, false );