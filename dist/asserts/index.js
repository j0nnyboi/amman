"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertError = exports.assertTransactionSummary = exports.assertConfirmedTransaction = void 0;
/**
 * Asserts details about a confirmed transaction
 *
 * @param t
 * @param tx the confirmed transaction to verify
 * @param args specify what details should be verified
 * @cateogory asserts
 */
function assertConfirmedTransaction(t, tx, args = {}) {
    var _a, _b;
    t.equal((_a = tx.meta) === null || _a === void 0 ? void 0 : _a.err, null, 'confirmed transaction has no error');
    if (args.fee != null) {
        t.equal((_b = tx.meta) === null || _b === void 0 ? void 0 : _b.fee, args.fee, 'confirmed transaction fee matches');
    }
}
exports.assertConfirmedTransaction = assertConfirmedTransaction;
/**
 * Asserts details about a {@link TransactionSummary}.
 *
 * @param t
 * @param summary transaction summary to verify
 * @param args specify what details should be verified
 * @cateogory asserts
 */
function assertTransactionSummary(t, summary, args = {}) {
    t.equal(summary.err, null, 'transaction summary has no error');
    if (args.fee != null) {
        t.equal(summary.fee, args.fee, 'transaction summary fee matches');
    }
    if (args.msgRx != null) {
        for (const msgRx of args.msgRx) {
            const hasMatch = summary.logMessages.some((x) => msgRx.test(x));
            if (!hasMatch) {
                console.error('Failed to find %s inside', msgRx.toString());
                console.error(summary.logMessages.join('\n  '));
            }
            t.ok(hasMatch, `match '${msgRx.toString()}' in transaction summary log messages`);
        }
    }
}
exports.assertTransactionSummary = assertTransactionSummary;
/**
 * Asserts details about the provided error.
 *
 * @param t
 * @param err error to verify
 * @param msgRxs list of {@link RegExp} which will be matched on the error _message_ or `err.logs`.
 * @cateogory asserts
 */
function assertError(t, err, msgRxs) {
    var _a;
    t.ok(err != null, 'error encountered');
    const errorMessages = err
        .toString()
        .split('\n')
        .concat((_a = err.logs) !== null && _a !== void 0 ? _a : []);
    for (const msgRx of msgRxs) {
        const hasMatch = errorMessages.some((x) => msgRx.test(x));
        if (!hasMatch) {
            console.error('Failed to find %s inside', msgRx.toString());
            console.error(errorMessages.join('\n  '));
        }
        t.ok(hasMatch, `match '${msgRx.toString()}' in error message`);
    }
}
exports.assertError = assertError;
//# sourceMappingURL=index.js.map