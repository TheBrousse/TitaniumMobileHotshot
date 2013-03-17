//
// prints out fps(frame per second) on every 5 seconds
//
game.enableOnFpsEvent = true; // onfps event is disabled by default so enable this
game.onFpsInterval    = 5000; // set onfps interval msec (default value equals 5,000 msec)

game.addEventListener('onfps', function(e) {
    if (game.debug) {
	   Ti.API.debug(e.fps.toFixed(2) + " fps");
	}
});

quicktigame2d.addEventListener('onlowmemory', function(e) {
    Ti.API.warn("Low Memory");
})