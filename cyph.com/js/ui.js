angular.
	module('Cyph', ['ngMaterial']).
	controller('CyphController', ['$scope', '$mdSidenav', '$mdToast', function ($scope, $mdSidenav, $mdToast) {
		var $window				= $(window);
		var $body				= $('#main > :first-child');
		var $heroText			= $('#hero-text');
		var $newCyph			= $('#new-cyph');
		var $newCyphShadow		= $('#new-cyph-shadow');
		var $bouncingDownArrow	= $('#bouncing-down-arrow');
		var $video				= $('#background-video > video');
		var $fixedHeaderStuff	= $newCyph.add('#main-toolbar').add($bouncingDownArrow);
		var fixedHeaderClass	= 'fixed-header';



		/* https://coderwall.com/p/ngisma */
		function apply (fn) {
			var phase = $scope['$root']['$$phase'];

			if (phase == '$apply' || phase == '$digest') {
				fn && (typeof(fn) === 'function') && fn();
			}
			else {
				$scope.$apply(fn);
			}
		}



		isMobile	= (function () {
			try {
				document.createEvent('TouchEvent');
				return true;
			}
			catch (e) {
				return false;
			}
		}());


		$.fn.tap	= function (callback, onOrOff, once) {
			var $this		= $(this);
			var eventName	= isMobile ? 'touchstart' : 'click';

			if (!callback) {
				$this.trigger(eventName);
			}
			else if (onOrOff === false) {
				$this.off(eventName, callback);
			}
			else if (once === true) {
				$this.one(eventName, callback);
			}
			else {
				$this.on(eventName, callback);
			}

			return $this;
		}



		$scope.baseButtonClick	= function () {
			$mdSidenav('menu').close();
		};


		$scope.openMobileMenu	= function () {
			$mdSidenav('menu').open();
		};


		$scope.scrollDown	= function () {
			$heroText.removeClass('bounceInDown').addClass('bounceOutRight');

			setTimeout(function () {
				$body.animate({
					scrollTop: $window.height()
				}, 1000);

				setTimeout(function () {
					$heroText.removeClass('bounceOutRight').addClass('bounceInDown');
				}, 250);
			}, 250);
		};



		/* OS X-style scrollbars */

		scrolling	= {
			isNanoScroller: true, // !isMobile && navigator.userAgent.indexOf('mac os x') < 0,
			update: function () {
				if (this.isNanoScroller) {
					$('.nano').nanoScroller();
				}
			}
		};

		if (!scrolling.isNanoScroller) {
			$('.nano, .nano-content').removeClass('nano').removeClass('nano-content');
		}


		$('md-button').tap(function () {
			setTimeout(function () {
				$('md-button, md-button *').blur();
			}, 500);
		});



		/* Header / new cyph button animation */

		$body.scroll(function () {
			var viewportHeight	= Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			var scrollTop		= this.scrollTop;

			if (scrollTop == 0) {
				$newCyph.css({transform: '', top: ''});
				$fixedHeaderStuff.removeClass(fixedHeaderClass);
			}
			else if (scrollTop >= parseInt($newCyphShadow.css('top'), 10)) {
				$fixedHeaderStuff.addClass(fixedHeaderClass);
			}
			else {
				$fixedHeaderStuff.removeClass(fixedHeaderClass);

				var ratio	= (viewportHeight - scrollTop) / viewportHeight;

				if (ratio > 0.62) {
					$newCyph.css('transform', 'scale(' + ratio + ')');
				}
			}
		});

		setInterval(function () {
			$bouncingDownArrow.removeClass('bounce');

			setTimeout(function () {
				$bouncingDownArrow.addClass('bounce');
			}, 100);
		}, 2500);



		/* Background video dimensions */

		function adjustVideoMargins () {
			$video.css({
				'margin-left': 0 - ($video.width() - $window.width()) / 2,
				'margin-top': 0 - ($video.height() - $window.height()) / 2
			});
		}

		$video[0].onplay	= adjustVideoMargins;
		setTimeout(adjustVideoMargins, 5000);
		$window.on('resize', adjustVideoMargins);



		/* Do the move lad */

		scrolling.update();

		/*
			$(function () {
				$('#pre-load').addClass('load-complete');
			});
		*/
	}])
;