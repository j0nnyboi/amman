import { Keypair, PublicKey } from '@safecoin/web3.js';
/**
 * Represents anything that can be used to extract the base58 representation
 * of a public key.
 */
export declare type KeyLike = string | PublicKey | Keypair;
export declare type AddLabel = (label: string, key: KeyLike) => void;
export declare type GenKeypair = (label?: string) => [PublicKey, Keypair];
/**
 * Manages address labels in order to improve logging and provide them to tools
 * like the safecoin explorer.
 *
 * @category diagnostics
 */
export declare class AddressLabels {
    private readonly knownLabels;
    private readonly logLabel;
    private readonly persistLabelsPath?;
    /**
     * Creates an instance of {@link AddressLabels}.
     *
     * @param knownLabels labels known ahead of time, i.e. program ids.
     * @param logLabel if provided to added labels are logged using this function
     * @param persistLabelsPath  path to which labels are persisted so other tools can pick them up
     *  WARN: this will most likely be replaced soon with either a URL to post labels to or
     *  something else that integrates with the (yet to come) amman address label server
     */
    constructor(knownLabels: Record<string, string>, logLabel?: (msg: string) => void, persistLabelsPath?: string | undefined);
    /**
     * Adds the provided label for the provided key.
     */
    addLabel: AddLabel;
    /**
     * Generates a keypair and returns its public key and the keypair itself as a Tuple.
     *
     * @param label if provided the key will be added to existing labels
     * @return [publicKey, keypair ]
     */
    genKeypair: GenKeypair;
    /**
     * Returns a function that allows comparing the provided key with another and
     * can be used for assertion tools like {@link spok | https://github.com/thlorenz/spok }.
     */
    isKeyOf: (key: KeyLike) => {
        (otherKey: KeyLike): boolean;
        $spec: string;
    };
}
