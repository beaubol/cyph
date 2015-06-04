module Cyph {
	export module Crypto {
		/**
		 * The Castle encryption protocol. This version includes an OTR-like
		 * feature set, with group/async/persistence coming later.
		 */
		export class CastleCore {
			private static sodium: any	= self['sodium'];
			private static ntru: any	= self['ntru'];


			private isAborted: boolean			= false;
			private isConnected: boolean		= false;
			private shouldRatchetKeys: boolean	= true;

			private friendKeySets: {
				sodium: Uint8Array;
				ntru: Uint8Array;
			}[]	= [];

			private keySets: {
				sodium: { publicKey: Uint8Array; privateKey: Uint8Array; };
				ntru: { publicKey: Uint8Array; privateKey: Uint8Array; };
			}[]	= [];

			private sharedSecret: Uint8Array;

			private abort () : void {
				this.isAborted		= true;
				this.isConnected	= false;

				this.handlers.send('');
				this.handlers.abort();
			}

			private decrypt (
				cyphertext: Uint8Array,
				ntru: Uint8Array,
				nonce: Uint8Array,
				friendKeySet: {
					sodium: Uint8Array;
					ntru: Uint8Array;
				},
				keySet: {
					sodium: { publicKey: Uint8Array; privateKey: Uint8Array; };
					ntru: { publicKey: Uint8Array; privateKey: Uint8Array; };
				}
			) : string {
				const shortNonce: Uint8Array	= new Uint8Array(
					nonce.buffer,
					0,
					CastleCore.sodium.crypto_box_NONCEBYTES
				);

				return CastleCore.sodium.crypto_box_open_easy(
					CastleCore.sodium.crypto_secretbox_open_easy(
						cyphertext,
						nonce,
						CastleCore.ntru.decrypt(
							ntru,
							keySet.ntru.privateKey
						)
					),
					shortNonce,
					friendKeySet.sodium,
					keySet.sodium.privateKey,
					'text'
				);
			}

			private encrypt (
				data: string,
				keySet: {
					sodium: { publicKey: Uint8Array; privateKey: Uint8Array; };
					ntru: { publicKey: Uint8Array; privateKey: Uint8Array; };
				}
			) : string {
				const friendKeySet	= this.friendKeySets[0];

				const symmetricKey: Uint8Array	= CastleCore.sodium.randombytes_buf(
					CastleCore.sodium.crypto_secretbox_KEYBYTES
				);

				const nonce: Uint8Array			= CastleCore.sodium.randombytes_buf(
					CastleCore.sodium.crypto_secretbox_NONCEBYTES
				);

				const shortNonce: Uint8Array	= new Uint8Array(
					nonce.buffer,
					0,
					CastleCore.sodium.crypto_box_NONCEBYTES
				);

				return JSON.stringify({
					nonce: CastleCore.sodium.to_hex(nonce),
					ntru: CastleCore.sodium.to_hex(
						CastleCore.ntru.encrypt(
							symmetricKey,
							friendKeySet.ntru
						)
					),
					cyphertext: CastleCore.sodium.crypto_secretbox_easy(
						CastleCore.sodium.crypto_box_easy(
							data,
							shortNonce,
							friendKeySet.sodium,
							keySet.sodium.privateKey
						),
						nonce,
						symmetricKey,
						'hex'
					)
				});
			}

			private generateKeySet () : Uint8Array {
				this.keySets.unshift({
					sodium: CastleCore.sodium.crypto_box_keypair(),
					ntru: CastleCore.ntru.keyPair()
				});

				if (this.keySets.length > 2) {
					const oldKeySet	= this.keySets.pop();

					CastleCore.sodium.memzero(oldKeySet.sodium.privateKey);
					CastleCore.sodium.memzero(oldKeySet.ntru.privateKey);
					CastleCore.sodium.memzero(oldKeySet.sodium.publicKey);
					CastleCore.sodium.memzero(oldKeySet.ntru.publicKey);
				}

				const sodiumKey	= this.keySets[0].sodium.publicKey;
				const ntruKey	= this.keySets[0].ntru.publicKey;

				const bytes: Uint8Array	= new Uint8Array(sodiumKey.length + ntruKey.length);
				bytes.set(sodiumKey);
				bytes.set(ntruKey, sodiumKey.length);

				return bytes;
			}

			private importFriendKeySet (friendKeySet: Uint8Array) : void {
				this.friendKeySets.unshift({
					sodium: new Uint8Array(
						friendKeySet.buffer,
						0,
						CastleCore.sodium.crypto_box_PUBLICKEYBYTES
					),
					ntru: new Uint8Array(
						friendKeySet.buffer,
						CastleCore.sodium.crypto_box_PUBLICKEYBYTES
					)
				});

				if (this.friendKeySets.length > 2) {
					const oldKeySet	= this.friendKeySets.pop();

					CastleCore.sodium.memzero(oldKeySet.sodium);
					CastleCore.sodium.memzero(oldKeySet.ntru);
				}
			}

			/**
			 * Receive incoming cyphertext.
			 * @param message Data to be decrypted.
			 */
			public receive (message: string) : void {
				if (this.isAborted) {
					return;
				}

				if (this.friendKeySets.length < 1) {
					try {
						this.importFriendKeySet(
							CastleCore.sodium.crypto_secretbox_open_easy(
								CastleCore.sodium.from_hex(message),
								new Uint8Array(
									CastleCore.sodium.crypto_secretbox_NONCEBYTES
								),
								this.sharedSecret
							)
						);

						this.send('');
					}
					catch (_) {
						this.abort();
					}
					finally {
						CastleCore.sodium.memzero(this.sharedSecret);
					}
				}
				else {
					try {
						const cyphertextData: {
							nonce: string;
							ntru: string;
							cyphertext: string;
						}	= JSON.parse(message);

						const nonce: Uint8Array			= CastleCore.sodium.from_hex(
							cyphertextData.nonce
						);

						const ntru: Uint8Array			= CastleCore.sodium.from_hex(
							cyphertextData.ntru
						);

						const cyphertext: Uint8Array	= CastleCore.sodium.from_hex(
							cyphertextData.cyphertext
						);


						let keySetUsed;

						const data: {
							message: string;
							newKey: string;
						}	= (() => {
							for (const friendKeySet of this.friendKeySets) {
								for (const keySet of this.keySets) {
									try {
										const data	= JSON.parse(
											this.decrypt(
												cyphertext,
												ntru,
												nonce,
												friendKeySet,
												keySet
											)
										);

										keySetUsed	= keySet;

										return data;
									}
									catch (_) {}
								}
							}
						})();

						if (!data) {
							throw data;
						}

						if (keySetUsed === this.keySets[0]) {
							this.shouldRatchetKeys	= true;
						}

						if (data.newKey) {
							this.importFriendKeySet(
								CastleCore.sodium.from_hex(
									data.newKey
								)
							);
						}

						if (data.message) {
							this.handlers.receive(data.message);
						}

						if (!this.isConnected) {
							this.isConnected	= true;
							this.handlers.connect();
						}
					}
					catch (_) {
						if (!this.isConnected) {
							this.abort();
						}
					}
				}
			}

			/**
			 * Send outgoing text.
			 * @param message Data to be encrypted.
			 */
			public send (message: string) : void {
				const keySet	= this.keySets[0];

				const data		= {
					message,
					newKey: undefined
				};

				if (this.shouldRatchetKeys) {
					this.shouldRatchetKeys	= false;
					data.newKey				= CastleCore.sodium.to_hex(this.generateKeySet());
				}

				this.handlers.send(
					this.encrypt(
						JSON.stringify(data),
						keySet
					)
				);
			}

			public constructor (
				sharedSecret: string,
				private handlers: {
					abort: Function;
					connect: Function;
					receive: (message: string) => void;
					send: (message: string) => void;
				}
			) {
				this.sharedSecret	= CastleCore.sodium.crypto_pwhash_scryptsalsa208sha256(
					sharedSecret,
					new Uint8Array(
						CastleCore.sodium.crypto_pwhash_scryptsalsa208sha256_SALTBYTES
					),
					0,
					0,
					CastleCore.sodium.crypto_secretbox_KEYBYTES
				);

				this.handlers.send(
					CastleCore.sodium.crypto_secretbox_easy(
						this.generateKeySet(),
						new Uint8Array(
							CastleCore.sodium.crypto_secretbox_NONCEBYTES
						),
						this.sharedSecret,
						'hex'
					)
				);
			}
		}
	}
}
