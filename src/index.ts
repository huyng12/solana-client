#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generateWallet } from "./cmd/wallet";
import { getBalance } from "./cmd/balance";
import { sendSOL } from "./cmd/send";

yargs(hideBin(process.argv))
	.command(
		"generate",
		"Generate Solana wallet",
		(yargs) =>
			yargs.option("path", {
				global: true,
				alias: "p",
				type: "string",
				default: "wallet.json",
				describe: "Wallet file path",
			}),
		(argv) => generateWallet(argv.path)
	)
	.command(
		"balance",
		"Get your current balance",
		(yargs) =>
			yargs.option("path", {
				global: true,
				alias: "p",
				type: "string",
				default: "wallet.json",
				describe: "Wallet file path",
			}),
		(argv) => getBalance(argv.path)
	)
	.command(
		"send <pubkey> <amount>",
		"Send SOL to another wallet",
		(yargs) =>
			yargs
				.positional("pubkey", {
					type: "string",
					describe: "Receiver public key",
				})
				.positional("amount", {
					type: "number",
					describe: "Amount of SOL",
				})
				.option("path", {
					global: true,
					alias: "p",
					type: "string",
					default: "wallet.json",
					describe: "Wallet file path",
				}),
		(argv) => sendSOL(argv.path, argv.pubkey!, argv.amount!)
	)
	.help().argv;
