// Responsive Text
let size = $(window).width() > 768 ? 'sm' : 'md';
const triggers = {
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
}
const N = 12;
const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

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
	const triggered = trigger('up') ? 'up' : (trigger('down') ? 'down' : 'none');
	const nextTrigger = triggered == 'done' ? 'none' : (triggered == 'up' ? 'down' : 'up');
	if (triggered != 'none') {
		for (const key in triggers) {
			for (const index in triggers[key]) {
				const propVal = triggers[key][index];
				if (propVal[0] == 'html') {
					$(key).html(propVal[1][triggered]);
					continue;
				}
				const cssObj = {};
				cssObj[propVal[0]] = propVal[1][triggered];
				$(key).css(cssObj);
			}
		}
		prepTrigger(nextTrigger);
	}
	for (let i = 0; i < N; i += 1) {
		const percentage = 2.2 * (N - i) / N;
		const percentageCirc = 2.15 * (N - (i + 1)) / N;
		$(`#pic-${i}`).css({
			width: `${percentage * vh}px`,
			height: `${100 * percentage}vh`,
			left: `${(vw - percentage * vh) / 2}px`,
			top: `${(vh * (1 - percentage)) / 2}px`,
			backgroundSize: `${2 * 100 / percentage}%`
		});
		$(`#circ-${i}`).css({
			width: `${percentageCirc * vh}px`,
			height: `${100 * percentageCirc}vh`,
			left: `${vh / 2 * (percentage - percentageCirc)}px`,
			top: `${vh / 2 * (percentage - percentageCirc)}px`
		});
	}
}
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(window).on("resize", resize);


$(document).ready(function() {
	resize();

	const backgroundImage = $(`#home-content-container`).css('background-image').split("=")[0] + "=" + (10000000 * Math.random()).toString();
	$('#home-content-container').css('backgroundImage', backgroundImage);

	$('#home-content-container').css('backgroundSize', `100%`);

	$('#name').animate({
		opacity: 1,
		letterSpacing: "10px"
	}, 3200, 'easeInOutBack');

	$('#github-link, #linkedin-link, #resume-link').animate({
		opacity: 1,
		letterSpacing: "2px"
	}, 3200, 'easeInOutBack');

	setTimeout(function() {
		$('#letter-of-recommendation-link, #innovation-content-link, #statement-dot-1, #creativity-content-link, #statement-dot-2, #coffee-content-link').animate({'opacity': '1'}, 2000);
	}, 3200);

	$('#github-link').click(function(e) {
		const url = jQuery(this).attr('href');
		$('#home-content').fadeOut(function() {
			window.location.href = url;
		});
		e.preventDefault();
	});

	$('#linkedin-link').click(function(e) {
		$('body').css({'background-color': '#e5e5e5'});
		const url = jQuery(this).attr('href');
		$('#home-content').fadeOut(function() {
			window.location.href = url;
		});
		e.preventDefault();
	});

	if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
		$('#resume-link').click(function(e) {
			$('body').css({'background-color': '#262626'});
			const url = jQuery(this).attr('href');
			$('#home-content').fadeOut(function() {
				window.location.href = url;
			});
			e.preventDefault();
		});
	}

	$('#innovation-content-link').click(() => {
		let count = 0;
		const keys = shuffle([...Array(N).keys()]);
		keys.forEach(i => {
			setTimeout(() => $(`#pic-${i}`).css('opacity', 0), count * 100);
			count += 1;
		});
		count = 0;
		keys.forEach(i => {
			setTimeout(() => $(`#pic-${i}`).css('opacity', 1), 300 + count * 100);
			count += 1;
		});
		count = 0;
		keys.forEach(i => {
			setTimeout(() => $(`#pic-${i}`).css('opacity', 0), 600 + count * 100);
			count += 1;
		});
		count = 0;
		keys.forEach(i => {
			setTimeout(() => $(`#pic-${i}`).css('opacity', 1), 900 + count * 100);
			count += 1;
		});
		count = 0;
		keys.forEach(i => {
			setTimeout(() => $(`#pic-${i}`).css('opacity', 0), 1200 + count * 100);
			count += 1;
		});
		anime({
			targets: '#home-content-container',
			opacity: {
				value: 0,
				delay: 1200,
				duration: 500,
				easing: 'linear',
			}
		});
		setTimeout(() => {
			$('#home-content').fadeOut();
			$('#innovation-content').fadeIn();
		}, 1100 + N * 100);
	});

	$('#creativity-content-link').click(() => {
		[...Array(N).keys()].forEach(i => {
			anime({
				targets: `#pic-${i}`,
				rotate: {
			    value: 360,
					duration: 1250 + (N - i) * 200,
					delay: (N - i) * 200,
			    easing: 'easeInOutSine'
			  },
				opacity: {
					value: 0,
					delay: 1250 + (N - i) * 200,
					duration: (N - i) * 200,
					easing: 'linear',
				}
			});
		});
		anime({
			targets: '#home-content-container',
			opacity: {
				value: 0,
				delay: 1500,
				duration: 500,
				easing: 'linear',
			}
		});
		setTimeout(() => {
			$('#home-content').fadeOut();
			$('#creativity-content').fadeIn();
		}, 1250 + 2 * N * 200);
	});

	$('#coffee-content-link').click(() => {
		$(`.circ`).css('opacity', 0);
		[...Array(N).keys()].forEach(i => {
			anime({
				targets: `#pic-${i}`,
				width: 0,
				height: 0,
				opacity: 0,
				translateX: 2.2 * (N - i) / N * vh / 2,
				translateY: 2.2 * (N - i) / N * vh / 2,
				backgroundSize: 12.5 * 100 / (2.2 * (N - i) / N),
				duration: 1500,
				delay: Math.pow(N - i, 0.8) * 300,
				easing: 'easeInOutQuint',
				elasticity: 100,
			});
		});
		anime({
			targets: '#home-content-container',
			opacity: {
				value: 0,
				delay: 1500,
				duration: 500,
				easing: 'linear',
			}
		});
		setTimeout(() => {
			$('#home-content').fadeOut();
			$('#coffee-content').fadeIn();
		}, 1500 + Math.pow(N, 0.8) * 300);
	});

	$('#letter-of-recommendation-link').click(() => {
		$('#home-content').fadeOut(() => {
			$('#letter-of-recommendation-content').fadeIn();
			$('body').css({'overflow-y': 'auto'});
		});
	});

	$('.return-home-link, .arrow').click(() => {
		$('.arrow').animate({'margin-left': '-800px', 'padding-right': '800px'}, 1200, 'easeInOutBack');
		setTimeout(() => {
			$('#coffee-content').fadeOut();
			$('#creativity-content').fadeOut();
			$('#innovation-content').fadeOut();
			$('#letter-of-recommendation-content').fadeOut();
			$('#home-content-container').css('opacity', 1);
			$('.pic').css('opacity', 1);
			window.scrollTo(0, 0);
			anime({
				targets: '.pic',
				translateX: 0,
				translateY: 0,
				duration: 0,
			});
			resize();
			$('#home-content').fadeIn();
			$('body').css({'overflow-y': 'hidden'});
			$('.arrow').animate({'margin-left': '-36px', 'padding-right': '0px'});
		}, 900);
	});
});
