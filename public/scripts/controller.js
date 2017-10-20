angular.module("MyApp", [])
.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix("");
})
.controller("Ctrl", function($scope, $http) {
	// Responsive Text
		var size = $(window).width() > 768 ? 'sm' : 'md';
		var triggers = {
			'#name': [
				[
					'font-size', 
					{
						'down': '2.5rem',
						'up': '4rem'
					}
				]
			],
			'#style-link': [
				[
					'font-size', 
					{
						'down': '2rem',
						'up': '2rem'
					}
				]
			]
		}

		function trigger(dir) {
			if (dir == 'down') {
				return size == 'md' && $(window).width() < 768;
			} else if (dir == 'up') {
				return size == 'sm' && $(window).width() >= 768;
			}
		}
		function prepTrigger(dir) {
			size = (dir == "up" ? "sm" : "md");
		}
		function resize() {
			var triggered = trigger('up') ? 'up' : (trigger('down') ? 'down' : 'none');
			var nextTrigger = triggered == 'done' ? 'none' : (triggered == 'up' ? 'down' : 'up');
			if (triggered != 'none') {
				for (var key in triggers) {
					for (var index in triggers[key]) {
						var propVal = triggers[key][index];
						var cssObj = {};
						cssObj[propVal[0]] = propVal[1][triggered];
						$(key).css(cssObj);
					}
				}
				prepTrigger(nextTrigger);
			}
		}

		$(window).on("resize", resize);

	// Text Animation, Background SVG Cache Trick
	$(document).ready(function() {
		$('#name').animate({
			opacity: 1,
			letterSpacing: "10px"
		}, 3200, 'easeInOutBack');
		$('.style-link').animate({
			opacity: 1,
			letterSpacing: "2px"
		}, 3200, 'easeInOutBack');

		// cache won't reload background images, so opening svg animation doesn't reload
		// solution: change lastMod id of svg so that cache doesn't recognize it as the
		// previous background
		var backgroundImage = $('#pic').css('background-image').split("=")[0] + "=" + (10000000 * Math.random()).toString();
		$('#pic').css({'background-image': backgroundImage});

		resize();
	});
});
