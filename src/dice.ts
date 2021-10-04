/* eslint-disable prefer-const */
import { BigInt } from '@graphprotocol/graph-ts'
import { Bet, Player } from '../generated/schema'
import { BetRequested, BetCompleted } from '../generated/Dice/Dice'

export function handleBetRequested(call: BetRequested): void {
  let player = Player.load(call.params.user.toHexString())
  if (!player) {
    player = new Player(call.params.user.toHexString())
    player.save()
  }

  let bet: Bet = new Bet(call.params.user.toHexString() + "_" + call.params.requestId.toHexString())
  bet.player = player.id
  bet.amount = call.params.amount
  bet.expected = call.params.expected
  bet.betTime = call.block.timestamp

  bet.save()
}

export function handleBetCompleted(call: BetCompleted): void {
  let bet = Bet.load(call.params.user.toHexString() + "_" + call.params.requestId.toHexString())
  bet.dice1 = call.params.dice1
  bet.dice2 = call.params.dice2
  bet.result = call.params.result

  bet.save()
}