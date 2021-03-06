/// <reference path="ichannel.ts" />
/// <reference path="aws.ts" />


module Cyph {
	export module Channel {
		/**
		 * Most basic IChannel implementation; this is a
		 * unidirectional queue.
		 */
		export class Queue implements IChannel {
			private static nonExistentQueueError: string = 'AWS.SimpleQueueService.NonExistentQueue';

			/** Used to prefix queue names in SQS. */
			public static queueNamespace: string	= 'channels-';

			/**
			 * Used for toggling the message retention period
			 * between half an hour and half an hour + 1 second,
			 * as a method of "touching" active SQS queues to
			 * indicate that they're still in use.
			 * @param b
			 */
			public static retentionPeriodValues (b?: boolean) : string {
				return b ? '1800' : '1801';
			}

			/**
			 * Creates SQS object and wraps it with retry logic.
			 * @param config SQS configuration.
			 */
			public static sqsWrapper (config: any = {}) : ({
				base: any;
				createQueue: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
				deleteMessage: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
				deleteMessageBatch: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
				deleteQueue: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
				getQueueUrl: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
				receiveMessage: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
				sendMessage: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
				sendMessageBatch: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
				setQueueAttributes: (o: any, callback: Function, shouldretryUntilComplete?: boolean) => void;
			}) {
				if (Env.awsEndpoint) {
					config.endpoint	= Env.awsEndpoint;
				}

				const wrapper	= {
					base: new AWS.base.SQS(config),
					createQueue: null,
					deleteMessage: null,
					deleteMessageBatch: null,
					deleteQueue: null,
					getQueueUrl: null,
					receiveMessage: null,
					sendMessage: null,
					sendMessageBatch: null,
					setQueueAttributes: null
				};

				Object.keys(wrapper).filter(k => k !== 'base').forEach((method: string) =>
					wrapper[method]	= (
						o: any,
						callback: Function = () => {},
						shouldretryUntilComplete?: boolean
					) => {
						Util.retryUntilComplete(retry =>
							wrapper.base[method](
								o,
								(err, data) => {
									if (shouldretryUntilComplete && err) {
										retry();
									}
									else {
										callback(err, data);
									}
								}
							)
						);
					}
				);

				return wrapper;
			}


			private isQueueAlive: boolean	= true;

			public queueUrl: string;
			public sqs: any;

			public close (callback: Function = () => {}) : void {
				if (this.isQueueAlive) {
					this.isQueueAlive	= false;

					this.sqs.deleteQueue(
						{QueueUrl: this.queueUrl},
						(err, data) => callback(err, data)
					);
				}
				else {
					callback();
				}
			}

			public isAlive () : boolean {
				return this.isQueueAlive;
			}

			public receive (
				messageHandler: (message: string) => void = m => {},
				onComplete: Function = () => {},
				maxNumberOfMessages: number = 10,
				waitTimeSeconds: number = 20,
				onLag?: Function
			) : void {
				if (this.isQueueAlive) {
					this.sqs.receiveMessage({
						QueueUrl: this.queueUrl,
						AttributeNames: ['ApproximateFirstReceiveTimestamp', 'SentTimestamp'],
						MaxNumberOfMessages: maxNumberOfMessages,
						WaitTimeSeconds: waitTimeSeconds
					}, (err, data) => {
						try {
							const messages: any[]	= Util.getValue(data, 'Messages', []);

							if (messages.length > 0) {
								if (onLag) {
									const attributes: any	= Util.getValue(
										messages[0],
										'Attributes',
										{}
									);

									const lag: number		=
										parseInt(attributes.ApproximateFirstReceiveTimestamp, 10) -
										parseInt(attributes.SentTimestamp, 10)
									;

									if (lag > 5000) {
										onLag(lag);
									}
								}

								this.sqs.deleteMessageBatch({
									QueueUrl: this.queueUrl,
									Entries: messages.map(message => ({
										Id: message.MessageId,
										ReceiptHandle: message.ReceiptHandle
									}))
								}, () => {});

								if (messageHandler) {
									for (const message of messages) {
										let messageBody: string	= message.Body;

										try {
											messageBody	= JSON.parse(messageBody).message;
										}
										catch (_) {}

										messageHandler(messageBody);
									}
								}
							}
						}
						finally {
							onComplete(err, data);
						}
					});
				}
			}

			public send (
				message: string|string[],
				callback?: Function|Function[],
				isSynchronous?: boolean
			) : void {
				if (this.isQueueAlive) {
					const delay: number	= Util.random(250);

					if (typeof message === 'string') {
						const messageBody: string	= JSON.stringify({message: message});

						/* Fake SQS doesn't like Cyph.Channel.AWS requests */
						if (isSynchronous && Env.isMainThread && !Env.isLocalEnv) {
							/* Using handrolled implementation because the
								code path for the AWS SDK's synchronous
								requests is still asynchronous */
							AWS.request({
								action: 'SendMessage',
								url: this.queueUrl,
								service: 'sqs',
								region: this.sqs.base.config.region,
								isSynchronous: true,
								params: {
									MessageBody: messageBody
								}
							}, callback);
						}
						else {
							setTimeout(() =>
								this.sqs.sendMessage({
									QueueUrl: this.queueUrl,
									MessageBody: messageBody
								}, callback, true)
							, delay);
						}
					}
					else if (
						isSynchronous ||
						/* SQS limit */
						message.join('').length > 60000
					) {
						for (let i = 0 ; i < message.length ; ++i) {
							this.send(
								message[i],
								callback instanceof Array ?
									callback[i] :
									i === message.length - 1 ?
										callback :
										undefined
								,
								isSynchronous
							);
						}
					}
					else {
						if (callback instanceof Array) {
							const callbacks: Function[]	= <Function[]> callback;

							callback	= (err, data) => {
								for (const callback of callbacks) {
									if (callback) {
										try {
											callback(err, data);
										}
										catch (err) {
											setTimeout(() => { throw err }, 0);
										}
									}
								}
							};
						}

						setTimeout(() =>
							this.sqs.sendMessageBatch({
								QueueUrl: this.queueUrl,
								Entries: message.map((s: string, i: number) => ({
									Id: (i + 1).toString(),
									MessageBody: JSON.stringify({message: s})
								}))
							}, callback, true)
						, delay);
					}
				}
			}

			/**
			 * @param queueName Name used to identify this queue with SQS.
			 * @param handlers Event handlers for this channel.
			 * @param config SQS configuration.
			 */
			public constructor (
				public queueName: string,
				handlers: ({
					onclose?: (err: any, data: any) => void;
					onlag?: (lag: number, region: string) => void;
					onmessage?: (message: string) => void;
					onopen?: () => void;
				}) = {},
				config: any = {}
			) {
				this.sqs	= Queue.sqsWrapper(config);

				this.sqs.createQueue({
					QueueName: Queue.queueNamespace + this.queueName,
					Attributes: {
						MessageRetentionPeriod: Queue.retentionPeriodValues(true),
						ReceiveMessageWaitTimeSeconds: '20'
					}
				}, (err, data) => {
					if (data) {
						this.queueUrl	= data.QueueUrl.replace(
							Config.awsEndpointFake,
							Env.awsEndpoint
						);
					}

					if (handlers.onopen) {
						handlers.onopen();
					}

					if (handlers.onmessage) {
						let onlag: Function;
						let lastReceiveTime: number	= 0;

						setTimeout(() => onlag = handlers.onlag, 60000);

						Util.retryUntilComplete(retry =>
							this.receive(handlers.onmessage, (err, data) => {
								if (err && err.code === Queue.nonExistentQueueError) {
									this.isQueueAlive	= false;

									if (handlers.onclose) {
										handlers.onclose(err, data);
									}
								}
								else if (this.isQueueAlive) {
									const now: number		= Date.now();
									const isEmpty: boolean	= Util.getValue(data, 'Messages', []).length < 1;

									const delay: number		=
										isEmpty && (now - lastReceiveTime) < 10000 ?
											2500 :
											50
									;

									lastReceiveTime	= now;
									retry(delay);
								}
							}, null, null, onlag && (lag => {
								if (onlag) {
									const f	= onlag;
									onlag	= null;
									setTimeout(() => f(lag, this.sqs.base.config.region), 0);
								}
							}))
						);
					}
					else if (handlers.onclose) {
						Util.retryUntilComplete(retry =>
							this.sqs.getQueueUrl({
								QueueName: Queue.queueNamespace + this.queueName
							}, (err, data) => {
								if (err && err.code === Queue.nonExistentQueueError) {
									this.isQueueAlive	= false;
									handlers.onclose(err, data);
								}
								else if (this.isQueueAlive) {
									retry(30000);
								}
							})
						);
					}
				}, true);
			}
		}
	}
}
