import fs from "fs";
import * as web3 from "@solana/web3.js";
import { Wallet } from "../types/wallet";

interface WalletFileContents {
	publicKey: string;
	secretKey: string;
}

export const loadWallet = async (walletFilePath: string): Promise<Wallet> => {
	if (!fs.existsSync(walletFilePath)) {
		throw Error("wallet file is not existing");
	}

	const raw = fs.readFileSync(walletFilePath).toString();
	const json = JSON.parse(raw) as WalletFileContents;
	const secretKey = Uint8Array.from(
		json.secretKey.split(",").map((v) => parseInt(v, 10))
	);

	const keypair = web3.Keypair.fromSecretKey(secretKey);
	return { keypair };
};

export const generateWallet = async (outputFilePath: string) => {
	if (fs.existsSync(outputFilePath)) {
		throw Error("output file is already existed");
	}

	const wallet = web3.Keypair.generate();
	const contents: WalletFileContents = {
		publicKey: wallet.publicKey.toString(),
		secretKey: wallet.secretKey.toString(),
	};

	const json = JSON.stringify(contents, null, 4);
	fs.writeFileSync(outputFilePath, json, { encoding: "utf-8" });

	console.log(`Wallet is generated at ${outputFilePath}`);
};
