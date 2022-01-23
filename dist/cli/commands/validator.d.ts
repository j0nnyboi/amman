export declare type ValidatorCommandArgs = {
    config?: string;
};
export declare function handleValidatorCommand(args: ValidatorCommandArgs): Promise<{
    needHelp: boolean;
}>;
export declare function validatorHelp(): string;
