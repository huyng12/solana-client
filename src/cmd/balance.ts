import { loadWallet } from "./wallet";
import { connection } from "../connection";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const getBalance = async (walletFilePath: string) => {
	const wallet = await loadWallet(walletFilePath);
	const lamports = await connection.getBalance(wallet.keypair.publicKey);
	const balance = lamports / LAMPORTS_PER_SOL;
	console.log(`Your current balance: ${balance} SOL`);
};
