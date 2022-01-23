"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMint = void 0;
const assert_1 = require("assert");
const safe_token_1 = require("@safecoin/safe-token");
const web3_js_1 = require("@safecoin/web3.js");
/**
 * Transaction that is used to create a mint.
 *
 * @category actions
 */
class CreateMint extends web3_js_1.Transaction {
    /**
     * Constructs a {@link CreateMint} transaction.
     * @private
     */
    constructor(options, params) {
        const { feePayer } = options;
        (0, assert_1.strict)(feePayer != null, 'need to provide non-null feePayer');
        const { newAccountPubkey, lamports, decimals, owner, freezeAuthority } = params;
        super(options);
        this.add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: feePayer,
            newAccountPubkey,
            lamports,
            space: safe_token_1.MintLayout.span,
            programId: safe_token_1.TOKEN_PROGRAM_ID,
        }));
        this.add(safe_token_1.Token.createInitMintInstruction(safe_token_1.TOKEN_PROGRAM_ID, newAccountPubkey, decimals !== null && decimals !== void 0 ? decimals : 0, owner !== null && owner !== void 0 ? owner : feePayer, freezeAuthority !== null && freezeAuthority !== void 0 ? freezeAuthority : feePayer));
    }
    /**
     * Exposed via {@link Actions} API.
     * @private
     */
    static async createMintAccount(connection, payer) {
        const mint = web3_js_1.Keypair.generate();
        const mintRent = await connection.getMinimumBalanceForRentExemption(safe_token_1.MintLayout.span, 'confirmed');
        const createMintTx = new CreateMint({ feePayer: payer }, {
            newAccountPubkey: mint.publicKey,
            lamports: mintRent,
        });
        return { mint, createMintTx };
    }
}
exports.CreateMint = CreateMint;
//# sourceMappingURL=create-mint-account.js.map