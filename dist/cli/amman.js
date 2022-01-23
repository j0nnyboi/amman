#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const commands_1 = require("./commands");
const commands = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).command('validator [config]', 'Launches a safecoin-test-validator', (args) => {
    return args
        .positional('config', {
        describe: 'File containing config with `validator` property.',
    })
        .help('help', (0, commands_1.validatorHelp)());
});
async function main() {
    const args = commands.parseSync();
    if (args._.length === 0 || args._[0] !== 'validator') {
        commands.showHelp();
    }
    else {
        const { needHelp } = await (0, commands_1.handleValidatorCommand)(args);
        if (needHelp) {
            commands.showHelp();
        }
    }
}
main()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=amman.js.map