import { EnvironmentInitialitzationOptions, VocdoniSDKClient } from "@vocdoni/sdk"
import { getWallet } from "./wallet"

/*
 *
 * @param {object} options 
 *
 * @property (string) options.electionId The election ID from Vocdoni API of which we'll fetch the metadata
 * @property (string) options.electionCreatedMetadataDiv The Element to add the election metadata
 * @property {object} options.signinMetamaskButton The Element with the "Sign in with MetaMask" text
 * @property {object} options.metaMaskNoPermissionsMessage The Element with the "You didn't give permissions to MetaMask" text
 */
export default class FetchVocdoniElectionMetadata {
  constructor(options = {}) {
    this.electionId = options.electionId;
    this.signinMetamaskButton = options.signinMetamaskButton;
    this.metaMaskNoPermissionsMessage = options.metaMaskNoPermissionsMessage;
    this.electionCreatedMetadataDiv = options.electionCreatedMetadataDiv;
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
      this._fetchElection();
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
    setTimeout(() => {
      this.client.setElectionId(this.electionId)
      this.client.fetchElection()
        .then(data => {
          console.log("ELECTION METADATA => ", data);
          this.electionCreatedMetadataDiv.parentElement.classList.remove("hide");
          this.electionCreatedMetadataDiv.textContent = JSON.stringify(data, null, 4);
        });
    }, 1000);
  }
}

