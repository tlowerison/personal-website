angular.module("MyApp", [])
.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix("");
})
.controller("Ctrl", function($scope, $http) {
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
	});
	var size = $(window).width() > 768 ? 'sm' : 'md';
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
	$(window).on("resize", function() {
		console.log(size);
		if (trigger('down')) {
			$('#name').css({'font-size': '3rem'});
			$('#style-link').css({'font-size': '1.5rem'});
			prepTrigger('up');
		} else if (trigger('up')) {
			$('#name').css({'font-size': '4rem'});
			$('#style-link').css({'font-size': '2rem'});
			prepTrigger('down');
		}
	});
});
