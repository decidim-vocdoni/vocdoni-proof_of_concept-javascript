import { ethers } from "ethers";

/*
 * Check if there's any wallet available
 * @returns {boolean} true if it's installed, false if not
 */
export const isWalletInstalled = () => {
  let result = false;
  if (typeof window.ethereum === "undefined") {
    result = false;
  } else {
    result = true;
  }
  return result;
}

/*
 * Get the wallet from the window.ethereum API (MetaMask).
 * TODO: we should add support to WalletConnect
 * @param {Object} metaMaskNoPermissionsMessage the Element with the message for showing that the user didn't give
 *                                              permissions to their wallet installed in this browser
 * @param {Object} signinMetamaskButton the Element of the button that initiates this action, so we can hide it
 * @returns {Promise<account>|void} A promise to the account instance or nothing if it doesn't have permission
 */
export const getWallet = async (metaMaskNoPermissionsMessage, signinMetamaskButton) => {
  return new Promise((resolve) => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    provider.send("eth_requestAccounts", []).then(() => {
      const signer = provider.getSigner();
      resolve(signer);
    }).catch((exception) => {
      if (exception.code === -32002 || exception.code === 4001) {
        metaMaskNoPermissionsMessage.classList.remove("hide");
        signinMetamaskButton.classList.add("hide");
      } else {
        console.log("No permissions! Invalid exception => ", exception);
      }
    });
  });
}

