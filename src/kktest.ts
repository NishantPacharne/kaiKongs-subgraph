import {
  Transfer as TransferEvent,
  KKTEST as TokenContract,
  KKTEST
} from '../generated/KKTEST/KKTEST'

import {
  Kong, User
} from '../generated/schema'

import { ipfs, json } from '@graphprotocol/graph-ts'

const ipfshash = "bafybeicc7qf4nu6scvwse7xt3g3uadcmf2t467qus75arezj3m57ei4qvq"


export function handleTransfer(event: TransferEvent): void {
  /* load the token from the existing Graph Node */
  let token = Kong.load(event.params.tokenId.toString())
  if (!token) {
      /* if the token does not yet exist, create it */
      token = new Kong(event.params.tokenId.toString())
      token.tokenID = event.params.tokenId

      token.tokenURI = "/" + event.params.tokenId.toString() + ".json"
      token.ipfsURI = 'ipfs.io/ipfs/' + ipfshash + token.tokenURI
  }

  token.owner = event.params.to.toHexString()
  token.save()

  let user = User.load(event.params.to.toHexString())
  if (!user) {
    user = new User(event.params.to.toHexString())
    user.save()
  }
}


