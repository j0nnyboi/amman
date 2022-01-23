"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initValidator = exports.DEFAULT_VALIDATOR_CONFIG = void 0;
const utils_1 = require("../utils");
const child_process_1 = require("child_process");
const prepare_config_1 = require("./prepare-config");
const ensure_validator_up_1 = require("./ensure-validator-up");
/**
 * @private
 */
exports.DEFAULT_VALIDATOR_CONFIG = {
    killRunningValidators: true,
    programs: [],
    jsonRpcUrl: utils_1.LOCALHOST,
    websocketUrl: '',
    commitment: 'confirmed',
    ledgerDir: (0, utils_1.tmpLedgerDir)(),
    resetLedger: true,
    verifyFees: false,
};
/**
 * @private
 */
async function initValidator(configArg) {
    const { killRunningValidators, programs, jsonRpcUrl, websocketUrl, commitment, ledgerDir, resetLedger, verifyFees, } = { ...exports.DEFAULT_VALIDATOR_CONFIG, ...configArg };
    if (killRunningValidators) {
        try {
            (0, child_process_1.execSync)('pkill -f safecoin-test-validator');
            (0, utils_1.logInfo)('Killed currently running safecoin-test-validator');
            await (0, utils_1.sleep)(1000);
        }
        catch (err) { }
    }
    const { configPath, cleanupConfig } = await (0, prepare_config_1.safecoinConfig)({
        websocketUrl,
        jsonRpcUrl,
        commitment,
    });
    const args = ['--quiet', '-C', configPath, '--ledger', ledgerDir];
    if (resetLedger)
        args.push('-r');
    if (programs.length > 0) {
        for (const { programId, deployPath } of programs) {
            args.push('--bpf-program');
            args.push(programId);
            args.push(deployPath);
        }
    }
    const cmd = `safecoin-test-validator ${args.join(' \\\n  ')}`;
    if (utils_1.logTrace.enabled) {
        (0, utils_1.logTrace)('Launching validator with the following command');
        console.log(cmd);
    }
    const child = (0, child_process_1.spawn)('safecoin-test-validator', args, {
        detached: true,
        stdio: 'inherit',
    });
    child.unref();
    (0, utils_1.logInfo)('Spawning new safecoin-test-validator with programs predeployed and ledger at %s', ledgerDir);
    await (0, ensure_validator_up_1.ensureValidatorIsUp)(jsonRpcUrl, verifyFees);
    await cleanupConfig();
    (0, utils_1.logInfo)('safecoin-test-validator is up');
}
exports.initValidator = initValidator;
//# sourceMappingURL=init-validator.js.map