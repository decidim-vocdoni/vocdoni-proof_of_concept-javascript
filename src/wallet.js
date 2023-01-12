import { Wallet } from "@ethersproject/wallet";

/* 
 * Creates a random wallet with ethers.js
 *
 * @link {https://docs.ethers.org/v5/api/signer/#Wallet}
 *
 * @returns {object} wallet The wallet created
 * @returns {string} wallet.privateKey The private key of the wallet that allows generating it again.
 * @returns {string} wallet.mnemonicPhrase The mnemonic phrase that allows generating the wallet again. 
 *  
 */
export const createRandomWallet = () => {
  const wallet = Wallet.createRandom({locale: "en"})
  return {
    privateKey: wallet.privateKey,
    mnemonicPhrase: wallet.mnemonic.phrase
  }
}

/*
 * Get a wallet from a private key.
 *
 * @link {https://docs.ethers.org/v5/api/signer/#Wallet}
 *
 * @param {string} privateKey The private key of the wallet.
 * 
 * @returns {object} the Wallet object from ethers.js
 */
export const getWallet = (privateKey) => {
  const wallet = new Wallet(privateKey);
  return wallet;
}
