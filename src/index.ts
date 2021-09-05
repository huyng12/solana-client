#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generateWallet } from "./cmd/wallet";
import { fetchAccount } from "./cmd/account";

yargs(hideBin(process.argv))
	.command(
		"generate <path>",
		"Generate Solana wallet at path <path>",
		(yargs) =>
			yargs.positional("path", {
				describe: "Output wallet file path",
				type: "string",
			}),
		(argv) => generateWallet(argv.path!)
	)
	.command(
		"account <path>",
		"Fetch account information",
		(yargs) =>
			yargs.positional("path", {
				describe: "Wallet file path",
				type: "string",
			}),
		(argv) => fetchAccount(argv.path!)
	)
	.help().argv;
