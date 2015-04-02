function cryptoWebWorker () {



window	= this;

var onmessageQueue		= [];
var incomingMessages	= {};
var outgoingMessages	= [];
var receivedMessages	= {};
var currentMessageId	= 0;
var incomingMessageId	= 0;
var incomingMessagesMax	= 0;
var otr, isInitiator, sharedSecret, processIncomingMessagesTimeoutID;

function chunkString (s, n) {
	var arr	= [];

	while (s.length) {
		arr.push(s.substr(0, n));
		s	= s.substr(n);
	}

	return arr;
}

function getPadding () {
	return Array.prototype.slice.call(
		crypto.getRandomValues(new Uint8Array(crypto.getRandomValues(new Uint8Array(1))[0] + 100))
	).join('');
}

var paddingDelimiter	= '☁☁☁ PRAISE BE TO CYPH ☀☀☀';

function padMessage (message) {
	return btoa(unescape(encodeURIComponent(getPadding() + paddingDelimiter + message + paddingDelimiter + getPadding())));
}

function padMessageRemove (message) {
	return decodeURIComponent(escape(atob(message))).split(paddingDelimiter)[1];
}

window.importScriptsAndRetry	= function () {
	var origin	= location.origin && location.origin != 'null' ?
		location.origin :
		'http://localhost:8082'
	;

	for (var i = 0 ; i < arguments.length ; ++i) {
		try {
			importScripts(origin + arguments[i]);
		}
		catch (e) {
			if (e.name == 'NetworkError') {
				--i;
			}
			else {
				throw e;
			}
		}
	}
};


onmessage	= function (e) { onmessageQueue.push(e) };

function eventLoop () {
	var delay	= 10;

	try {
		/*** Original onmessage logic ****/

		if (onmessageQueue.length) {
			var e	= onmessageQueue.shift();

			switch (e.data.method) {
				/* Init */
				case 0:
					sharedSecret	= e.data.message.sharedSecret;

					/* Safely disable console */
					var noop	= function () {};
					var methods	= [
						'assert',
						'clear',
						'count',
						'debug',
						'dir',
						'dirxml',
						'error',
						'exception',
						'group',
						'groupCollapsed',
						'groupEnd',
						'info',
						'log',
						'markTimeline',
						'profile',
						'profiles',
						'profileEnd',
						'show',
						'table',
						'time',
						'timeEnd',
						'timeline',
						'timelineEnd',
						'timeStamp',
						'trace',
						'warn'
					];
					console	= {};
					for (var i = 0 ; i < methods.length ; ++i) {
						console[methods[i]]	= noop;
					}
					delete noop;
					delete methods;


					if (typeof atob == 'undefined' || typeof btoa == 'undefined') {
						window.importScriptsAndRetry('/lib/bower_components/base64/base64.min.js');
					}

					if (typeof crypto == 'undefined') {
						if (typeof msCrypto != 'undefined') {
							crypto	= msCrypto;
						}
						else {
							window.importScriptsAndRetry('/cryptolib/bower_components/isaac.js/isaac.js');
							isaac.seed(e.data.message.randomSeed);
							crypto	= {
								getRandomValues: function (array) {
									var max	= Math.pow(2, (array.BYTES_PER_ELEMENT || 4) * 8) - 1;

									for (var i = 0 ; i < array.length ; ++i) {
										array[i]	= Math.floor(isaac.random() * max);
									}

									return array;
								}
							};
						}
					}

					window.importScriptsAndRetry('/cryptolib/bower_components/otr4-em/build/otr-web.js');

					var user	= new OTR.User().account('me', 'cyph');

					user.generateInstag(function () {
						user.generateKey(function () {
							otr	= user.contact('friend').openSession({
								policy: OTR.POLICY.ALLOW_V3,
								MTU: 15872
							});

							otr.on('smp', function (type) {
								switch (type) {
									case 'request':
										otr.smpRespond(sharedSecret);
										break;

									case 'complete':
										postMessage({eventName: 'authenticated', message: isInitiator});
										break;

									case 'failed':
									case 'aborted':
										postMessage({eventName: 'abort'});
										break;
								}
							});

							otr.on('message', function (message, wasEncrypted) {
								if (wasEncrypted) {
									var o	= JSON.parse(message);

									if (!receivedMessages[o.id]) {
										receivedMessages[o.id]	= {
											pieces: [],
											total: 0
										}
									}

									receivedMessages[o.id].pieces[o.index]	= padMessageRemove(o.message);

									if (++receivedMessages[o.id].total == o.total) {
										postMessage({eventName: 'ui', message: receivedMessages[o.id].pieces.join('')});
										delete receivedMessages[o.id];
									}
								}
							});

							otr.on('inject_message', function (message) {
								if (message && message.indexOf('otr.cypherpunks.ca') > -1) {
									message	= '?OTRv3?';
								}

								postMessage({eventName: 'io', message: JSON.stringify({
									id: currentMessageId++,
									message: message
								})});
							});

							var isConnected;
							otr.on('gone_secure', function () {
								if (!isConnected) {
									isConnected	= true;

									postMessage({eventName: 'connected'});

									if (isInitiator) {
										otr.smpStart(sharedSecret);
									}
								}
							});

							setTimeout(function () {
								postMessage({eventName: 'ready'});
							}, 500);
						});
					});
					break;

				/* Send query message */
				case 1:
					isInitiator	= true;
					otr.start();
					break;

				/* Send message */
				case 2:
					var id			= crypto.getRandomValues(new Uint32Array(1))[0];
					var messages	= chunkString(e.data.message, 5120);

					for (var i = 0 ; i < messages.length ; ++i) {
						outgoingMessages.push(JSON.stringify({
							id: id,
							index: i,
							total: messages.length,
							message: padMessage(messages[i])
						}));
					}
					break;

				/* Receive message */
				case 3:
					var o	= JSON.parse(e.data.message);

					if (o.id >= incomingMessageId) {
						incomingMessages[o.id]	= o.message;
						incomingMessagesMax		= Math.max(incomingMessagesMax, o.id);
					}
					break;
			}
		}


		/*** otr.send ***/

		else if (outgoingMessages.length) {
			otr.send(outgoingMessages.shift());
		}


		/*** otr.recv ***/

		else if (incomingMessageId <= incomingMessagesMax && incomingMessages[incomingMessageId]) {
			otr.recv(incomingMessages[incomingMessageId]);
			delete incomingMessages[incomingMessageId];
			++incomingMessageId;

			if (incomingMessageId == 1) {
				postMessage({eventName: 'firstmessage'});
			}
		}


		/*** else ***/

		else {
			delay	= 100;
		}
	}
	finally {
		setTimeout(eventLoop, delay);
	}
}

eventLoop();



}