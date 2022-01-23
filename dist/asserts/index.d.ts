import { ConfirmedTransaction } from '@safecoin/web3.js';
import { TransactionSummary } from '../transactions';
/**
 * The minimum methods that the first argument passed to assert functions like
 * {@link assertConfirmedTransaction} needs to have.
 *
 * @cateogory asserts
 */
export declare type Assert = {
    equal(actual: any, expected: any, msg?: string): void;
    ok(value: any, msg?: string): void;
};
/**
 * Asserts details about a confirmed transaction
 *
 * @param t
 * @param tx the confirmed transaction to verify
 * @param args specify what details should be verified
 * @cateogory asserts
 */
export declare function assertConfirmedTransaction(t: Assert, tx: ConfirmedTransaction, args?: {
    fee?: number;
}): void;
/**
 * Asserts details about a {@link TransactionSummary}.
 *
 * @param t
 * @param summary transaction summary to verify
 * @param args specify what details should be verified
 * @cateogory asserts
 */
export declare function assertTransactionSummary(t: Assert, summary: TransactionSummary, args?: {
    fee?: number;
    msgRx?: RegExp[];
}): void;
/**
 * Asserts details about the provided error.
 *
 * @param t
 * @param err error to verify
 * @param msgRxs list of {@link RegExp} which will be matched on the error _message_ or `err.logs`.
 * @cateogory asserts
 */
export declare function assertError(t: Assert, err: Error & {
    logs?: string[];
}, msgRxs: RegExp[]): void;
