import { ConfirmedTransaction, Connection, PublicKey, RpcResponseAndContext, SendOptions, SignatureResult, Signer, Transaction, TransactionError, TransactionSignature } from '@safecoin/web3.js';
export declare type SendTransaction = (connection: Connection, transaction: Transaction, signers: Array<Signer>, options?: SendOptions) => Promise<TransactionSignature>;
/**
 * Derived from a {@link ConfirmedTransaction} this summary eases assertions and logging.
 *
 * @property logMessages obtained from the {@link ConfirmedTransaction['meta']} property
 * @property fee charged for the transaction execution
 * @property slot same as {@link ConfirmedTransaction['slot']
 * @property err obtained from the {@link ConfirmedTransaction['meta']} property
 */
export declare type TransactionSummary = {
    logMessages: string[];
    fee: number | undefined;
    slot: number;
    blockTime: number;
    err: TransactionError | null | undefined;
};
/**
 * Result returned by {@link TransactionHandler#sendAndConfirmTransaction}.
 *
 * @property txSignature {@link TransactionSignature} string of sent transaction
 * @property txRpcResponse initial response of sent transaction
 * @property txConfirmed the result of confirming the transaction
 * @property txSummary a summary of the confirmed transaction
 *
 * @category transactions
 */
export declare type ConfirmedTransactionDetails = {
    txSignature: string;
    txRpcResponse: RpcResponseAndContext<SignatureResult>;
    txConfirmed: ConfirmedTransaction;
    txSummary: TransactionSummary;
};
export declare type TransactionHandler = {
    publicKey: PublicKey;
    /**
     * Sends and confirms the given transaction after signing it.
     *
     * @param transaction to send
     * @param signers with which the transaction should be signed
     * @param options used to send the transaction
     */
    sendAndConfirmTransaction(transaction: Transaction, signers: Array<Signer>, options?: SendOptions): Promise<ConfirmedTransactionDetails>;
};
