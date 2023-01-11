import { EnvOptions, VocdoniSDKClient } from "@vocdoni/sdk"
import { getWallet } from "./wallet"

/*
 *
 * @param {object} options
 * @param {function} onSuccess A callback function to be run when the Election metadata is fetch from the API
 *
 * @property {object} options.walletPrivateKey The private key from the wallet that will fetch the Election metadata
 * @property (string) options.electionId The election ID from Vocdoni API of which we'll fetch the metadata
 * @property (string) options.electionMetadataDiv The Element to add the election metadata
 * @property (string) options.localStorageElectionStatusItem The string with the key where we'll save the election status in the LocalStorage API. Used for demo purposes only.
 */
export default class FetchVocdoniElectionMetadata {
  constructor(options = {}, onSuccess) {
    this.walletPrivateKey = options.walletPrivateKey;
    this.electionId = options.electionId;
    this.electionMetadataDiv = options.electionMetadataDiv;
    this.localStorageElectionStatusItem = options.localStorageElectionStatusItem;
    this.onSuccess = onSuccess;
    this.creator = null;
    this.client = null;

    this.run();
  }

  run() {
    this._setCreatorWalletAndClient();
    this._fetchElection().then(electionMetadata => {
      this._showElectionMetadata(electionMetadata);
      this._updateStatus(electionMetadata);
      if (typeof this.onSuccess === "function") {
        this.onSuccess(electionMetadata);
      }
    });
  }

  /*
   * Gets the wallet and initialize the Vocdoni SDK Client with it
   * Binds the creator and client to the instance
   *
   * @returns {void}
   */
  async _setCreatorWalletAndClient() {
    this.creator = getWallet(this.walletPrivateKey);
    console.log("CREATOR => ", this.creator);

    this.client = new VocdoniSDKClient({
      env: EnvOptions.STG,
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
    // There's a possible bug in the client.fetchElection method, seems like the `electionMetadata.status` is always "READY"
    // As a workaround, we infer the status with the startDate and endDate.
    const now = new Date().getTime();
    const startDate = Date.parse(electionMetadata.startDate);
    const endDate = Date.parse(electionMetadata.endDate);
    let status = "";

    if (now < startDate) {
      status = "READY"
    } else if (now > startDate && now < endDate) {
      status = "VOTE_PERIOD"
    } else {
      status = "RESULTS"
    }

    window.localStorage.setItem(this.localStorageElectionStatusItem, status);
  }
}

