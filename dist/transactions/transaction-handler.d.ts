import { Connection, Keypair, SendOptions, Signer, Transaction } from '@safecoin/web3.js';
import { ConfirmedTransactionDetails, TransactionHandler } from './types';
/**
 * A {@link TransactionHandler} backed by a payer {@link Keypair}.
 * @category transactions
 */
export declare class PayerTransactionHandler implements TransactionHandler {
    private readonly connection;
    private readonly payer;
    /**
     * Creates a {@link PayerTransactionHandler}.
     *
     * @param connection to use to handle transactions
     * @param payer to use to sign transactions
     */
    constructor(connection: Connection, payer: Keypair);
    /**
     * Public key of the payer
     */
    get publicKey(): import("@safecoin/web3.js").PublicKey;
    /**
     * Sends and confirms the transaction {@link TransactionHandler['sendAndConfirmTransaction']}.
     */
    sendAndConfirmTransaction(transaction: Transaction, signers: Array<Signer>, options?: SendOptions): Promise<ConfirmedTransactionDetails>;
}
