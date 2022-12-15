import { ethers } from "ethers";

const metaMaskNotInstalledMessage = document.querySelector(".js-metamask-not-installed-message");
const metaMaskNoPermissionsMessage = document.querySelector(".js-metamask-no-permissions-message");
const ethereumButton = document.querySelector(".js-signin-metamask-button");

/*
 * Check if there's any wallet available
 * @returns {boolean} true if it's installed
 */
export const isWalletInstalled = () => {

  /*
   * Show the error message when the MetaMask Wallet is not installed
   * @returns {void}
   */
  const showNotInstalledMessage = () => {
    if (metaMaskNotInstalledMessage === null) {
      return;
    }

    metaMaskNotInstalledMessage.classList.toggle("hide");
  }

  console.log("Checking if there's an Ethereum Wallet in the browser...");
  let result = false;
  if (typeof window.ethereum === "undefined") {
    console.log("There isn't one. Showing the error message.");
    showNotInstalledMessage();
    result = false;
  } else {
    console.log("There's one!");
    result = true;
  }
  return result;
}

/*
 * Get the wallet from the window.ethereum API (MetaMask).
 * TODO: we should add support to WalletConnect
 * @returns {Promise<account>|void} A promise to the account instance or nothing if it doesn't have permission
 */
export const getWallet = async () => {

  /*
   * Show the error message when the MetaMask Wallet has no permissions
   * @returns {void}
   */
  const showNoPermissionsMessage = () => {
    metaMaskNoPermissionsMessage.classList.toggle("hide");
    ethereumButton.classList.toggle("hide");
  }

  /*
   * Handle the exception from ethers
   * @param {Exception} exception The exception object
   * @returns {void}
   */
  const handleException = (exception) => {
    if (exception.code === -32002 || exception.code === 4001) {
      console.log("No permissions! Show the error message");
      showNoPermissionsMessage();
    } else {
      console.log("No permissions! Invalid exception => ", exception);
    }
  }

  console.log("Asking permission to wallet");

  return new Promise((resolve) => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    provider.send("eth_requestAccounts", []).then(() => {
      const signer = provider.getSigner();
      resolve(signer);
    }).catch((exception) => handleException(exception));
  });
}

