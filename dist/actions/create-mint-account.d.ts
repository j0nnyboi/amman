import { Connection, Keypair, PublicKey, Transaction } from '@safecoin/web3.js';
/**
 * Transaction that is used to create a mint.
 *
 * @category actions
 */
export declare class CreateMint extends Transaction {
    /**
     * Constructs a {@link CreateMint} transaction.
     * @private
     */
    private constructor();
    /**
     * Exposed via {@link Actions} API.
     * @private
     */
    static createMintAccount(connection: Connection, payer: PublicKey): Promise<{
        mint: Keypair;
        createMintTx: CreateMint;
    }>;
}
