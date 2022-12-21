import { EnvironmentInitialitzationOptions, VocdoniSDKClient } from "@vocdoni/sdk"
import { getWallet } from "./wallet"

/*
 *
 * @param {object} options
 *
 * @property (string) options.electionId The election ID from Vocdoni API of which we'll fetch the metadata
 * @property (string) options.electionMetadataDiv The Element to add the election metadata
 * @property {object} options.signinMetamaskButton The Element with the "Sign in with MetaMask" text
 * @property {object} options.metaMaskNoPermissionsMessage The Element with the "You didn't give permissions to MetaMask" text
 * @property (string) options.localStorageElectionStatusItem The string with the key where we'll save the election status in the LocalStorage API. Used for demo purposes only.
 */
export default class FetchVocdoniElectionMetadata {
  constructor(options = {}) {
    this.electionId = options.electionId;
    this.signinMetamaskButton = options.signinMetamaskButton;
    this.metaMaskNoPermissionsMessage = options.metaMaskNoPermissionsMessage;
    this.electionMetadataDiv = options.electionMetadataDiv;
    this.localStorageElectionStatusItem = options.localStorageElectionStatusItem;
    this.creator = null;
    this.client = null;

    this.run();
  }

  run() {
    this.signinMetamaskButton.disabled = false;
    this.signinMetamaskButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.signinMetamaskButton.classList.toggle("hide");

      this._setCreatorWalletAndClient();
      this._fetchElection().then(electionMetadata => {
        this._showElectionMetadata(electionMetadata);
        this._updateStatus(electionMetadata);
      });
    });
  }

  /*
   * Gets the wallet and initialize the Vocdoni SDK Client with it
   * Binds the creator and client to the instance
   *
   * @returns {void}
   */
  async _setCreatorWalletAndClient() {
    this.creator = await getWallet(this.metaMaskNoPermissionsMessage, this.signinMetamaskButton);
    console.log("CREATOR => ", this.creator);

    this.client = new VocdoniSDKClient({
      env: EnvironmentInitialitzationOptions.DEV,
      wallet: this.creator
    })
    console.log("CLIENT => ", this.client);

    const clientInfo = await this.client.createAccount();
    console.log("CLIENT INFO => ", clientInfo);
    if (clientInfo.balance == 0) {
      this.client.collectFaucetTokens();
    }
  }

  _fetchElection() {
    // Add a bit of delay to give time to the client to be set up
    return new Promise(resolve => {
      setTimeout(() => {
      this.client.setElectionId(this.electionId)
      this.client.fetchElection()
        .then(data => {
          console.log("ELECTION METADATA => ", data);
          resolve(data);
        });
    }, 100);
    });
  }

  _showElectionMetadata(electionMetadata) {
    this.electionMetadataDiv.parentElement.classList.remove("hide");
    this.electionMetadataDiv.textContent = JSON.stringify(electionMetadata, null, 4);
  }

  _updateStatus(electionMetadata) {
    window.localStorage.setItem(this.localStorageElectionStatusItem, electionMetadata.status);
  }
}

