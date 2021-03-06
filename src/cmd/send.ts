import * as web3 from "@solana/web3.js";
import { loadWallet } from "./wallet";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection } from "../connection";

export const sendSOL = async (
	walletFilePath: string,
	receiverPubKeyRaw: string,
	amount: number
) => {
	const wallet = await loadWallet(walletFilePath);
	const from = wallet.keypair;

	// Transform string to PublicKey object
	const receiverPubKey = new PublicKey(receiverPubKeyRaw);

	// Add transfer instruction to transaction
	const tx = new web3.Transaction().add(
		web3.SystemProgram.transfer({
			fromPubkey: from.publicKey,
			toPubkey: receiverPubKey,
			lamports: amount * LAMPORTS_PER_SOL,
		})
	);

	// Sign transaction and broadcast
	// const signers = [from];
	tx.recentBlockhash = await connection
		.getRecentBlockhash()
		.then((r) => r.blockhash);
	tx.sign(from);

	if (!tx.signature) {
		throw new Error("Can not sign the transaction");
	}

	let signature = tx.signature.toString("base64");
	console.log(`Signature: ${signature}`);

	// Send transaction
	const wireTx = tx.serialize();
	signature = await connection.sendRawTransaction(wireTx);
	console.log(`Send transaction successfully, broadcasting...`);

	// Broadcast transaction
	await connection.confirmTransaction(signature);
	console.log(`Broadcast transaction successfully`);

	console.log("");
	console.log(`Sent ${amount} SOL to ${receiverPubKeyRaw} successfully`);
	console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
};
