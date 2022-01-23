import { ValidatorConfig } from './types';
/**
 * @private
 */
export declare const DEFAULT_VALIDATOR_CONFIG: ValidatorConfig;
/**
 * @private
 */
export declare function initValidator(configArg: Partial<ValidatorConfig>): Promise<void>;
