import { Commitment } from '@safecoin/web3.js';
export declare function safecoinConfig(config: {
    jsonRpcUrl: string;
    websocketUrl: string;
    commitment: Commitment;
}): Promise<{
    configPath: string;
    cleanupConfig: () => Promise<void>;
}>;
