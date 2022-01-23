"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayerTransactionHandler = void 0;
const assert_1 = require("assert");
const _1 = require(".");
function transactionSummary(tx) {
    var _a, _b, _c, _d, _e;
    const logMessages = (_b = (_a = tx.meta) === null || _a === void 0 ? void 0 : _a.logMessages) !== null && _b !== void 0 ? _b : [];
    const fee = (_c = tx.meta) === null || _c === void 0 ? void 0 : _c.fee;
    const slot = tx.slot;
    const blockTime = (_d = tx.blockTime) !== null && _d !== void 0 ? _d : 0;
    const err = (_e = tx.meta) === null || _e === void 0 ? void 0 : _e.err;
    return { logMessages, fee, slot, blockTime, err };
}
/**
 * A {@link TransactionHandler} backed by a payer {@link Keypair}.
 * @category transactions
 */
class PayerTransactionHandler {
    /**
     * Creates a {@link PayerTransactionHandler}.
     *
     * @param connection to use to handle transactions
     * @param payer to use to sign transactions
     */
    constructor(connection, payer) {
        this.connection = connection;
        this.payer = payer;
    }
    /**
     * Public key of the payer
     */
    get publicKey() {
        return this.payer.publicKey;
    }
    /**
     * Sends and confirms the transaction {@link TransactionHandler['sendAndConfirmTransaction']}.
     */
    async sendAndConfirmTransaction(transaction, signers, options) {
        transaction.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
        const txSignature = await this.connection.sendTransaction(transaction, [this.payer, ...signers], options !== null && options !== void 0 ? options : _1.defaultSendOptions);
        const txRpcResponse = await this.connection.confirmTransaction(txSignature);
        const txConfirmed = await this.connection.getConfirmedTransaction(txSignature);
        (0, assert_1.strict)(txConfirmed != null, 'confirmed transaction should not be null');
        const txSummary = transactionSummary(txConfirmed);
        return { txSignature, txRpcResponse, txConfirmed, txSummary };
    }
}
exports.PayerTransactionHandler = PayerTransactionHandler;
//# sourceMappingURL=transaction-handler.js.map