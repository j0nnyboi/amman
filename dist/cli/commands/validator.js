"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHelp = exports.handleValidatorCommand = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const utils_1 = require("../../utils");
const validator_1 = require("../../validator");
async function handleValidatorCommand(args) {
    let config, configPath;
    try {
        ;
        ({ config, configPath } = await resolveConfig(args));
        if (configPath != null) {
            (0, utils_1.logInfo)('Loading config from %s', configPath);
        }
        if (config.validator == null) {
            console.error(`This config ${config} is missing a 'validator' property`);
            process.exit(1);
        }
        (0, utils_1.logInfo)(`Running validator with ${config.validator.programs.length} custom program(s) preloaded`);
        (0, utils_1.logDebug)(config.validator);
        await (0, validator_1.initValidator)(config.validator);
        return { needHelp: false };
    }
    catch (err) {
        console.error(err);
        console.error(`Having trouble loading amman config from ${config} which resolved to ${configPath}`);
        return { needHelp: true };
    }
}
exports.handleValidatorCommand = handleValidatorCommand;
function resolveConfig({ config }) {
    if (config == null) {
        return tryLoadLocalConfigRc();
    }
    else {
        const configPath = path_1.default.resolve(config);
        return { config: require(configPath), configPath };
    }
}
async function tryLoadLocalConfigRc() {
    const configPath = path_1.default.join(process.cwd(), '.ammanrc.js');
    if (await canAccess(configPath)) {
        const config = require(configPath);
        (0, utils_1.logInfo)('Found `.ammanrc.js` in current directory and using that as config');
        return { config, configPath };
    }
    else {
        console.error('\n  No config provided nor an `.ammanrc.js` file found in current directory, using default config, run with `--help` for more info\n');
        return { config: { validator: {} }, configPath: null };
    }
}
async function canAccess(p) {
    try {
        await fs_1.promises.access(p);
        return true;
    }
    catch (_) {
        return false;
    }
}
function validatorHelp() {
    return `
amman validator <config.js>

The config should be a JavaScript module exporting 'validator' with any of the below properties:

killRunningValidators: if true will kill any safecoin-test-validators currently running on the system.

programs: bpf programs which should be loaded into the test validator

jsonRpcUrl: the URL at which the test validator should listen for JSON RPC requests

websocketUrl: for the RPC websocket

ledgerDir: where the safecoin test validator writes the ledger

resetLedger: if true the ledger is reset to genesis at startup

verifyFees: if true the validator is not considered fully started up until it charges transaction fees
`;
}
exports.validatorHelp = validatorHelp;
//# sourceMappingURL=validator.js.map