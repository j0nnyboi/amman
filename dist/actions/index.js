"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
const create_mint_account_1 = require("./create-mint-account");
/**
 * API into actions/transactions creation to use during testing.
 * Will use the {@link Connection} provided in the constructor in order to
 * query data like minimum rent exemtion.
 *
 * @category actions
 */
class Actions {
    /**
     * Constructs an {@link Actions} class which will use the provided
     * connection to perform those actions
     * @param connection to safecoin cluster
     */
    constructor(connection) {
        this.connection = connection;
        /**
         * Creates a mint account transaction for the provided payer.
         * Ensures that the mint account will be rent-exempt.
         * The transaction will have to be signed by the [payer].
         *
         * @return promise of { createMintTx: transaction to create the mint; mint: Keypair of the mint }
         */
        this.createMintAccount = (payer) => {
            return create_mint_account_1.CreateMint.createMintAccount(this.connection, payer);
        };
    }
}
exports.Actions = Actions;
//# sourceMappingURL=index.js.map