#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generateWallet } from "./cmd/wallet";
import { getBalance } from "./cmd/balance";

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
	.help().argv;
