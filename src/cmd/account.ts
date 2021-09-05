import { loadWallet } from "./wallet";
import { connection } from "../connection";

export const fetchAccount = async (walletFilePath: string) => {
	const wallet = await loadWallet(walletFilePath);
	const account = await connection.getAccountInfo(wallet.keypair.publicKey);
	console.log(account);
};
