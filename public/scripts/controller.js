app.controller("Ctrl", function($scope) {
	$(document).ready(function() {
		$('#name').animate({
			opacity: 1,
			letterSpacing: "10px"
		}, 1600, 'easeInOutBack');
		$('.style-link').animate({
			opacity: 1,
			letterSpacing: "2px"
		}, 1600, 'easeInOutBack');
		var backgroundImage = $('#pic').css('background-image').split("=")[0] + "=" + (10000000 * Math.random()).toString();
		$('#pic').css({'background-image': backgroundImage});
	});
});
