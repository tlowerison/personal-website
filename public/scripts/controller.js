app.controller("Ctrl", function($scope, $http) {
	$(document).ready(function() {
		$('#name').animate({
			opacity: 1,
			letterSpacing: "10px"
		}, 3200, 'easeInOutBack');
		$('.style-link').animate({
			opacity: 1,
			letterSpacing: "2px"
		}, 3200, 'easeInOutBack');
		var backgroundImage = $('#pic').css('background-image').split("=")[0] + "=" + (10000000 * Math.random()).toString();
		$('#pic').css({'background-image': backgroundImage});
	});
});
