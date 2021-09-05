import * as web3 from "@solana/web3.js";

export interface Wallet {
	keypair: web3.Keypair;
}
