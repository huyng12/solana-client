import { loadWallet } from "./wallet";
import { connection } from "../connection";

export const getBalance = async (walletFilePath: string) => {
	const wallet = await loadWallet(walletFilePath);
	const balance = await connection.getBalance(wallet.keypair.publicKey);
	console.log(`Your current balance: ${balance} SOL`);
};
