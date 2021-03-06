import { ConfirmedTransaction } from '@safecoin/web3.js'
import { TransactionSummary } from '../transactions'

/**
 * The minimum methods that the first argument passed to assert functions like
 * {@link assertConfirmedTransaction} needs to have.
 *
 * @cateogory asserts
 */
export type Assert = {
  equal(actual: any, expected: any, msg?: string): void
  ok(value: any, msg?: string): void
}

/**
 * Asserts details about a confirmed transaction
 *
 * @param t
 * @param tx the confirmed transaction to verify
 * @param args specify what details should be verified
 * @cateogory asserts
 */
export function assertConfirmedTransaction(
  t: Assert,
  tx: ConfirmedTransaction,
  args: { fee?: number } = {}
) {
  t.equal(tx.meta?.err, null, 'confirmed transaction has no error')

  if (args.fee != null) {
    t.equal(tx.meta?.fee, args.fee, 'confirmed transaction fee matches')
  }
}

/**
 * Asserts details about a {@link TransactionSummary}.
 *
 * @param t
 * @param summary transaction summary to verify
 * @param args specify what details should be verified
 * @cateogory asserts
 */
export function assertTransactionSummary(
  t: Assert,
  summary: TransactionSummary,
  args: { fee?: number; msgRx?: RegExp[] } = {}
) {
  t.equal(summary.err, null, 'transaction summary has no error')
  if (args.fee != null) {
    t.equal(summary.fee, args.fee, 'transaction summary fee matches')
  }
  if (args.msgRx != null) {
    for (const msgRx of args.msgRx) {
      const hasMatch = summary.logMessages.some((x) => msgRx.test(x))
      if (!hasMatch) {
        console.error('Failed to find %s inside', msgRx.toString())
        console.error(summary.logMessages.join('\n  '))
      }

      t.ok(
        hasMatch,
        `match '${msgRx.toString()}' in transaction summary log messages`
      )
    }
  }
}

/**
 * Asserts details about the provided error.
 *
 * @param t
 * @param err error to verify
 * @param msgRxs list of {@link RegExp} which will be matched on the error _message_ or `err.logs`.
 * @cateogory asserts
 */
export function assertError(
  t: Assert,
  err: Error & { logs?: string[] },
  msgRxs: RegExp[]
) {
  t.ok(err != null, 'error encountered')
  const errorMessages = err
    .toString()
    .split('\n')
    .concat(err.logs ?? [])

  for (const msgRx of msgRxs) {
    const hasMatch = errorMessages.some((x) => msgRx.test(x))
    if (!hasMatch) {
      console.error('Failed to find %s inside', msgRx.toString())
      console.error(errorMessages.join('\n  '))
    }

    t.ok(hasMatch, `match '${msgRx.toString()}' in error message`)
  }
}
