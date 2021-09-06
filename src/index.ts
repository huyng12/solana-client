#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generateWallet } from "./cmd/wallet";
import { fetchAccount } from "./cmd/account";

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
		"account",
		"Fetch account information",
		(yargs) =>
			yargs.option("path", {
				global: true,
				alias: "p",
				type: "string",
				default: "wallet.json",
				describe: "Wallet file path",
			}),
		(argv) => fetchAccount(argv.path)
	)
	.help().argv;
