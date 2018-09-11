// Responsive Text
	var size = $(window).width() > 768 ? 'sm' : 'md';
	var triggers = {
		'#name': [
			[ 'font-size', { 'down': '2.6rem', 'up': '4rem' } ]
		],
		'.style-link': [
			[ 'font-size', { 'down': '2.1rem', 'up': '2.3rem' } ]
		],
		'#footer-banner': [
			[ 'margin-left', {'down': '-152px', 'up': '-171px'}],
			[ 'bottom', {'down': '50px', 'up': '30px'}]
		],
		'#statement': [
			[ 'font-size', { 'down': '2.2rem', 'up': '3rem' } ],
			[ 'html', {
				'up': 'Innovation • Creativity • Coffee'
			}]
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
					if (propVal[0] == 'html') {
						$(key).html(propVal[1][triggered]);
						continue;
					}
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
		resize();

		// Background Image
			// cache won't reload background images, so opening svg animation doesn't reload
			// solution: change lastMod id of svg so that cache doesn't recognize it as the
			// previous background
			var backgroundImage = $('#pic').css('background-image').split("=")[0] + "=" + (10000000 * Math.random()).toString();
			$('#pic').css({'background-image': backgroundImage});

		// Page Hide

			$('#recommendation').hide();

		// Opening Animations
			$('#name').animate({
				opacity: 1,
				letterSpacing: "10px"
			}, 3200, 'easeInOutBack');

			$('#gl, #ll, #rl').animate({
				opacity: 1,
				letterSpacing: "2px"
			}, 3200, 'easeInOutBack');

			setTimeout(function() {
				$('#lrl').animate({'opacity': '1'}, 3200);
			}, 4000);

			$(function() {
				$('#statement').textillate({
					initialDelay: 1600,
					in: {
						delay: 1600 / $('#statement').html().length,
						effect: 'fadeIn'
					}
				})
			});

		// Click Handlers
			// Github Link
			$('#gl').click(function(e) {
				$('#recommendation').fadeOut();
				var url = jQuery(this).attr('href');
				$('#content').fadeOut(function() {
					window.location.href = url;
				});
				e.preventDefault();
			});

			// LinkedIn Click
			$('#ll').click(function(e) {
				$('body').css({'background-color': '#e5e5e5'});
				$('#recommendation').fadeOut();
				var url = jQuery(this).attr('href');
				$('#content').fadeOut(function() {
					window.location.href = url;
				});
				e.preventDefault();
			});

			// Non-Mobile Resume Click
			if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
				$('#rl').click(function(e) {
					$('body').css({'background-color': '#262626'});
					$('#recommendation').fadeOut();
					var url = jQuery(this).attr('href');
					$('#content').fadeOut(function() {
						window.location.href = url;
					});
					e.preventDefault();
				});
			}

			// Letter of Recommendation Click
			$('#lrl').click(function() {
				$('#content').fadeOut(function() {
					$('#recommendation').fadeIn();
					$('body').css({'overflow-y': 'auto'});
				});
			});

			// Return Click
			$('#rel, #arrow').click(function() {
				$('#arrow').animate({'margin-left': '-800px', 'padding-right': '800px'}, 1200, 'easeInOutBack');
				setTimeout(function() {
					$('#recommendation').fadeOut(function() {
						$('#content').fadeIn();
						$('body').css({'overflow-y': 'hidden'});
						$('#arrow').animate({'margin-left': '-36px', 'padding-right': '0px'});
					});
				}, 900);
			});
	});
