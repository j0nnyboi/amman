import { LOCALHOST, logInfo, logTrace, sleep, tmpLedgerDir } from '../utils'

import { execSync as exec, spawn } from 'child_process'
import { safecoinConfig } from './prepare-config'
import { ensureValidatorIsUp } from './ensure-validator-up'
import { ValidatorConfig } from './types'

/**
 * @private
 */
export const DEFAULT_VALIDATOR_CONFIG: ValidatorConfig = {
  killRunningValidators: true,
  programs: [],
  jsonRpcUrl: LOCALHOST,
  websocketUrl: '',
  commitment: 'confirmed',
  ledgerDir: tmpLedgerDir(),
  resetLedger: true,
  verifyFees: false,
}

/**
 * @private
 */
export async function initValidator(configArg: Partial<ValidatorConfig>) {
  const {
    killRunningValidators,
    programs,
    jsonRpcUrl,
    websocketUrl,
    commitment,
    ledgerDir,
    resetLedger,
    verifyFees,
  }: ValidatorConfig = { ...DEFAULT_VALIDATOR_CONFIG, ...configArg }

  if (killRunningValidators) {
    try {
      exec('pkill -f safecoin-test-validator')
      logInfo('Killed currently running safecoin-test-validator')
      await sleep(1000)
    } catch (err) {}
  }

  const { configPath, cleanupConfig } = await safecoinConfig({
    websocketUrl,
    jsonRpcUrl,
    commitment,
  })

  const args = ['--quiet', '-C', configPath, '--ledger', ledgerDir]
  if (resetLedger) args.push('-r')

  if (programs.length > 0) {
    for (const { programId, deployPath } of programs) {
      args.push('--bpf-program')
      args.push(programId)
      args.push(deployPath)
    }
  }

  const cmd = `safecoin-test-validator ${args.join(' \\\n  ')}`
  if (logTrace.enabled) {
    logTrace('Launching validator with the following command')
    console.log(cmd)
  }

  const child = spawn('safecoin-test-validator', args, {
    detached: true,
    stdio: 'inherit',
  })
  child.unref()

  logInfo(
    'Spawning new safecoin-test-validator with programs predeployed and ledger at %s',
    ledgerDir
  )

  await ensureValidatorIsUp(jsonRpcUrl, verifyFees)
  await cleanupConfig()

  logInfo('safecoin-test-validator is up')
}
