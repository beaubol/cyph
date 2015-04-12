/// <reference path="env.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />


/* Load assets only for the current platform */

$(
	'.' +
	Env.platformString +
	'-only [deferred-src], [deferred-src].' +
	Env.platformString +
	'-only'
).each(function () {
	let $this	= $(this);
	$this.attr('src', $this.attr('deferred-src'));
});



/* Custom event handlers */

$('[on-enterpress]').each(function () {
	let $this			= $(this);
	let enterpressOnly	= $this.attr('enterpress-only');

	if (!enterpressOnly || enterpressOnly == Env.platformString) {
		let onenterpress	= $this.attr('on-enterpress');

		$this.keypress(function (e) {
			if (e.keyCode == 13 && !e.shiftKey) {
				if (onenterpress) {
					eval(onenterpress);
					e.preventDefault();
				}
			}
		});
	}
});

['click', 'change'].forEach(function (eventName) {
	let attribute	= 'on-' + eventName;

	$('[' + attribute + ']').each(function () {
		let $this	= $(this);

		$this.on(eventName, function () {
			eval($this.attr(attribute));
		});
	});
});



/* Support button-links */

$('button > a').each(function () {
	let $this	= $(this);
	let $button	= $this.parent();

	$this.css('pointer-events', 'none');

	/* Using mouseup instead of click because of Angular Material weirdness */
	$button.on('mouseup', function () {
		setTimeout(function () {
			$this[0].click();
		}, 500);
	});
});



/* Temporary workaround for Angular Material bug */

if (Env.isMobile) {
	let previousCoordinates	= {};

	$(window).click(function (e) {
		let coordinates	= Math.floor(e.clientX || 0) + ',' + Math.floor(e.clientY || 0);

		if (coordinates == '0,0') {
			return;
		}

		if (previousCoordinates[coordinates]) {
			e.preventDefault();
			e.stopPropagation();
		}
		else {
			try {
				previousCoordinates[coordinates]	= true;
			}
			finally {
				setTimeout(function () {
					delete previousCoordinates[coordinates];
				}, 2000);
			}
		}
	});
}



/* Polyfill for weird browsers */

if (!HTMLElement.prototype.click) {
	HTMLElement.prototype.click	= function () {
		let e	= document.createEvent('MouseEvents');
		e.initEvent('click', true, true);
		this.dispatchEvent(e);
	}
}
