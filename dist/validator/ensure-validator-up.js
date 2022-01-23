"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureValidatorIsUp = void 0;
const web3_js_1 = require("@safecoin/web3.js");
const utils_1 = require("../utils");
const wait_on_1 = __importDefault(require("wait-on"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/*
 * Right after a local test validator is started up it doesn't seem to charge
 * fees at times.
 * Here we make sure we don't consider it started up until it does charge fees.
 */
async function ensureValidatorIsUp(connectionURL, verifyFees) {
    (0, utils_1.logDebug)('Waiting for validator to come up ...');
    await (0, wait_on_1.default)({
        resources: [connectionURL],
        interval: 1000,
        validateStatus: (status) => status === 405,
        log: false,
    });
    if (verifyFees) {
        (0, utils_1.logDebug)('Ensuring validator charges fees ...');
        const payer = web3_js_1.Keypair.generate();
        const connection = new web3_js_1.Connection(connectionURL, 'confirmed');
        await (0, utils_1.airdrop)(connection, payer.publicKey, 200);
        return ensureFees(connectionURL, payer);
    }
}
exports.ensureValidatorIsUp = ensureValidatorIsUp;
async function ensureFees(connectionURL, payer) {
    var _a;
    const receiver = web3_js_1.Keypair.generate();
    const connection = new web3_js_1.Connection(connectionURL, 'confirmed');
    const transferIx = web3_js_1.SystemProgram.transfer({
        lamports: 1000,
        fromPubkey: payer.publicKey,
        toPubkey: receiver.publicKey,
    });
    const transaction = new web3_js_1.Transaction().add(transferIx);
    const recentBlockhash = (await connection.getRecentBlockhash('confirmed'))
        .blockhash;
    transaction.recentBlockhash = recentBlockhash;
    const sig = await connection.sendTransaction(transaction, [payer]);
    await connection.confirmTransaction(sig);
    const confirmedTx = await connection.getConfirmedTransaction(sig);
    if (((_a = confirmedTx === null || confirmedTx === void 0 ? void 0 : confirmedTx.meta) === null || _a === void 0 ? void 0 : _a.fee) === 0) {
        (0, utils_1.logDebug)('Transaction completed without charging fees, trying again ...');
        await sleep(2000);
        return ensureFees(connectionURL, payer);
    }
}
//# sourceMappingURL=ensure-validator-up.js.map