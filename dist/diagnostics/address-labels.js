"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressLabels = void 0;
const web3_js_1 = require("@safecoin/web3.js");
const fs_1 = __importDefault(require("fs"));
function publicKeyString(key) {
    if (typeof key === 'string') {
        return key;
    }
    if (typeof key.toBase58 === 'function') {
        return key.toBase58();
    }
    if (typeof key.publicKey !== null) {
        return key.publicKey.toBase58();
    }
    return key.toString();
}
/**
 * Manages address labels in order to improve logging and provide them to tools
 * like the safecoin explorer.
 *
 * @category diagnostics
 */
class AddressLabels {
    /**
     * Creates an instance of {@link AddressLabels}.
     *
     * @param knownLabels labels known ahead of time, i.e. program ids.
     * @param logLabel if provided to added labels are logged using this function
     * @param persistLabelsPath  path to which labels are persisted so other tools can pick them up
     *  WARN: this will most likely be replaced soon with either a URL to post labels to or
     *  something else that integrates with the (yet to come) amman address label server
     */
    constructor(knownLabels, logLabel = (_) => { }, persistLabelsPath) {
        this.knownLabels = knownLabels;
        this.logLabel = logLabel;
        this.persistLabelsPath = persistLabelsPath;
        /**
         * Adds the provided label for the provided key.
         */
        this.addLabel = (label, key) => {
            const keyString = publicKeyString(key);
            this.logLabel(`🔑 ${label}: ${keyString}`);
            this.knownLabels[keyString] = label;
            if (this.persistLabelsPath == null)
                return;
            fs_1.default.writeFileSync(this.persistLabelsPath, JSON.stringify(this.knownLabels, null, 2), 'utf8');
        };
        /**
         * Generates a keypair and returns its public key and the keypair itself as a Tuple.
         *
         * @param label if provided the key will be added to existing labels
         * @return [publicKey, keypair ]
         */
        this.genKeypair = (label) => {
            const kp = web3_js_1.Keypair.generate();
            if (label != null) {
                this.addLabel(label, kp);
            }
            return [kp.publicKey, kp];
        };
        /**
         * Returns a function that allows comparing the provided key with another and
         * can be used for assertion tools like {@link spok | https://github.com/thlorenz/spok }.
         */
        this.isKeyOf = (key) => {
            const keyString = publicKeyString(key);
            const label = this.knownLabels[keyString];
            const fn = (otherKey) => {
                const otherKeyString = publicKeyString(otherKey);
                return keyString === otherKeyString;
            };
            if (label != null) {
                fn.$spec = `isKeyOf('${label}')`;
            }
            return fn;
        };
    }
}
exports.AddressLabels = AddressLabels;
//# sourceMappingURL=address-labels.js.map