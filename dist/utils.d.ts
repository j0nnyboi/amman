/// <reference types="node" />
import debug from 'debug';
import { Connection, PublicKey } from '@safecoin/web3.js';
/**
 * URL at which a locally running safecoin test validator listens on by default
 * @category utils
 */
export declare const LOCALHOST = "http://127.0.0.1:8899/";
export declare const logError: debug.Debugger;
export declare const logInfo: debug.Debugger;
export declare const logDebug: debug.Debugger;
export declare const logTrace: debug.Debugger;
/**
 * Gets the path to a temporary directory in which to store the test
 * validator ledger.
 *
 * @param testLabel label used to name that directory
 * @category utils
 */
export declare function tmpLedgerDir(testLabel?: string): string;
/**
 * @private
 */
export declare const sleep: (ms: number) => Promise<unknown>;
/**
 * @private
 */
export declare function createHash(s: Buffer): string;
/**
 * Drops the specified amount of tokens to the provided public key.
 *
 * @param connection to safecoin JSON RPC node
 * @param publicKey to drop sols to
 * @param sol amount of sols to drop
 *
 * @category utils
 */
export declare function airdrop(connection: Connection, publicKey: PublicKey, sol?: number): Promise<import("@safecoin/web3.js").RpcResponseAndContext<import("@safecoin/web3.js").SignatureResult>>;
