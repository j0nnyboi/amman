"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.airdrop = exports.createHash = exports.sleep = exports.tmpLedgerDir = exports.logTrace = exports.logDebug = exports.logInfo = exports.logError = exports.LOCALHOST = void 0;
const debug_1 = __importDefault(require("debug"));
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const web3_js_1 = require("@safecoin/web3.js");
/**
 * URL at which a locally running safecoin test validator listens on by default
 * @category utils
 */
exports.LOCALHOST = 'http://127.0.0.1:8899/';
exports.logError = (0, debug_1.default)('amman:error');
exports.logInfo = (0, debug_1.default)('amman:info');
exports.logDebug = (0, debug_1.default)('amman:debug');
exports.logTrace = (0, debug_1.default)('amman:trace');
/**
 * Gets the path to a temporary directory in which to store the test
 * validator ledger.
 *
 * @param testLabel label used to name that directory
 * @category utils
 */
function tmpLedgerDir(testLabel = 'amman-ledger') {
    return path_1.default.join((0, os_1.tmpdir)(), testLabel);
}
exports.tmpLedgerDir = tmpLedgerDir;
/**
 * @private
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
/**
 * @private
 */
function createHash(s) {
    return crypto_1.default.createHash('sha256').update(s).digest('hex');
}
exports.createHash = createHash;
/**
 * Drops the specified amount of tokens to the provided public key.
 *
 * @param connection to safecoin JSON RPC node
 * @param publicKey to drop sols to
 * @param sol amount of sols to drop
 *
 * @category utils
 */
async function airdrop(connection, publicKey, sol = 1) {
    const sig = await connection.requestAirdrop(publicKey, sol * web3_js_1.LAMPORTS_PER_SAFE);
    return connection.confirmTransaction(sig);
}
exports.airdrop = airdrop;
//# sourceMappingURL=utils.js.map