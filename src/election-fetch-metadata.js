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

  /*
   * Fetch the Election metadata fron the Vocdoni API
   *
   * @returns {Promise<object>} A promise of the Election metadata
   */
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

  /*
   * Shows the Election metadata in the markup
   *
   * @param {object} electionMetadata The full response with the Election metadata from the Vocdoni API
   *
   * @returns {void}
   */
  _showElectionMetadata(electionMetadata) {
    this.electionMetadataDiv.parentElement.classList.remove("hide");
    this.electionMetadataDiv.textContent = JSON.stringify(electionMetadata, null, 4);
  }

  /*
   * Update the status of the election. For demo purposes, we store it in window.localStorage.
   * In the real app, this will be handled with the rake task `bin/rails decidim_elections:scheduled_tasks`
   *
   * @link {https://docs.vocdoni.io/architecture/smart-contracts/process.html#process-status}
   *
   * @param {object} electionMetadata The full response with the Election metadata from the Vocdoni API
   *
   * @returns {void}
   */
  _updateStatus(electionMetadata) {
    const now = new Date().getTime();
    const startDate = Date.parse(electionMetadata.startDate);
    const endDate = Date.parse(electionMetadata.endDate);
    const isVotePeriod = now > startDate && endDate > now;
    const status = isVotePeriod ? "VOTE_PERIOD" : electionMetadata.status;

    window.localStorage.setItem(this.localStorageElectionStatusItem, status);
  }
}

