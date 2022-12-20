import { ethers } from "ethers";
import { EnvironmentInitialitzationOptions, VocdoniSDKClient, Election, PlainCensus } from "@vocdoni/sdk"
import { getWallet } from "./wallet"

// How many addresses we'll create for the Demo
const TEST_CENSUS = 5;

// TODO: change hardcoded componentId
// When this is integrated in Decidim we should extract this from the URL
const COMPONENT_ID = 22;

/*
 * Instantiates the Wallet of the creator and the Vocdoni SDK client
 * Based on the TypeScript example provided in the GitHub repository.
 *
 * @param {object} options All the different HTML Elements that interact with setting up an Election
 *
 * @property {object} options.signinMetamaskButton The Element with the "Sign in with MetaMask" text
 * @property {object} options.createElectionButton The Element with the "Create election in the Vocdoni API" text
 * @property {object} options.metaMaskNoPermissionsMessage The Element with the "You didn't give permissions to MetaMask" text
 * @property {object} options.electionCreatedMessage The Element with the "Election created in the Voconi API" text
 * @property {object} options.electionCreatedLink The Element where we'll add the Vocdoni Explorer link
 * @property {object} options.divDemoCensus The Element with the textarea where we'll add the Demo census
 * @property {object} options.electionCreateErrorMessage The Element with the "Fix the election configuration" text
 * @property {string} options.localStorageElectionItem The string with the key where we'll save the electionId in the LocalStorage API
 *
 * @see {@link https://developer.vocdoni.io|Documentation}
 * @see {@link https://github.com/vocdoni/vocdoni-sdk/blob/ad03822f537fd8c4d43c85d447475fd38b62909c/examples/typescript/src/index.ts|TypeScript example}
 */
export default class SetupVocdoniElection {
  // TODO: listen for the network change event to reload the page
  constructor(options = {}) {
    this.signinMetamaskButton = options.signinMetamaskButton;
    this.createElectionButton = options.createElectionButton;
    this.metaMaskNoPermissionsMessage = options.metaMaskNoPermissionsMessage;
    this.electionCreatedMessage = options.electionCreatedMessage;
    this.electionCreatedLink = options.electionCreatedLink;
    this.divDemoCensus = options.divDemoCensus;
    this.electionCreateErrorMessage = options.electionCreateErrorMessage;
    this.localStorageElectionItem = options.localStorageElectionItem;
    this.creator = null;
    this.client = null;

    this.run();
  }

  /*
   * Listens to the "Sign in with MetaMask" and "Create election in Vocdoni API" buttons
   * and runs the methods when they're clicked, changing the visiblity of the buttons.
   *
   * @returns {void}
   */
  run() {
    this.signinMetamaskButton.disabled = false;
    this.signinMetamaskButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._creatorWalletAndClient();
      this.signinMetamaskButton.classList.toggle("hide");
      this.createElectionButton.classList.toggle("hide");

      this.createElectionButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.createElectionButton.disabled = true;
        this._createDemoElection();
      })
    })
  }

  /*
   * Gets the wallet and initialize the Vocdoni SDK Client with it
   * Binds the creator and client to the instance
   *
   * @returns {void}
   */
  async _creatorWalletAndClient() {
    this.creator = await getWallet(this.metaMaskNoPermissionsMessage, this.signinMetamaskButton);
    console.log("CREATOR => ", this.creator);

    this.client = new VocdoniSDKClient({
      env: EnvironmentInitialitzationOptions.DEV,
      wallet: this.creator
    })
    console.log("CLIENT => ", this.client);

    const clientInfo = await this.client.createAccount();
    if (clientInfo.balance === 0) {
      this.client.collectFaucetTokens();
    }
  }

  /*
   * Create the demo election in Vocdoni API.
   * For the demo purposes, it saves the electionId in localStorage browser
   *
   * @returns {void}
   */
  async _createDemoElection() {
    const census = await this._initializeCensus(this.creator);
    console.log("CENSUS => ", census);

    const election = await this._initializeElection(census);
    console.log("ELECTION => ", election);

    try {
      const electionId = await this.client.createElection(election);
      console.log("ELECTION ID => ", electionId);

      this.electionCreatedMessage.classList.toggle("hide");
      this.electionCreatedLink.href = `https://dev.explorer.vote/processes/show/#/${electionId}`;
      window.localStorage.setItem(this.localStorageElectionItem, electionId);
    } catch (error) {
      this.electionCreateErrorMessage.classList.remove("hide");
    }
  }

  /* Sets up the census. This is only for demo purposes.
   * We should study the different kind of Censuses to see which apply to our usecase
   *
   * @returns {object} census The Census from Vocdoni SDK with all the participants' wallets
   *
   * @see {@link https://github.com/vocdoni/vocdoni-sdk/tree/main/src/types/census|GitHub}
   * @see {@link https://docs.vocdoni.io/architecture/census/census-overview.html|Documentation}
   */
  async _initializeCensus() {
    const showDemoCensus = () => {
      this.divDemoCensus.classList.toggle("hide");
      return this.divDemoCensus.querySelector("textarea");
    }

    const census = new PlainCensus();
    census.add(await this.creator.getAddress());
    const textareaDemoCensus = showDemoCensus();
    textareaDemoCensus.rows = TEST_CENSUS;
    textareaDemoCensus.value = "";
    for (let i = 1; i < TEST_CENSUS+1; i++) {
      const wallet = ethers.Wallet.createRandom({locale: "en"});
      const mnemonic = wallet.mnemonic.phrase;
      console.log("VOTER ", i, " =>", mnemonic);
      textareaDemoCensus.value += `${mnemonic}\n`;
      census.add(await wallet.getAddress());
    };

    return census;
  }

  /*
   * Parses the election metadata and instantiates an Election object using Vocdoni SDK
   * This metadata and configuration are fetch with the Decidim GraphQL API using the demo-graphql app
   *
   * @param {string} defaultLocale Optional. A string with the value of the default locale (for instance "en")
   *    Required by Vocdoni.
   *
   * @returns {object} election The election object with the metadata
   */
  async _initializeElection(census, defaultLocale = "en") {

    /*
     * Transform the locales to the required format with a default locale
     *
     * @param {array} array An array with the following format:
     *    [{"text": "Nom", "locale": "ca"}, {"text": "Name","locale": "en"}]
     * @param {string} defaultLocale A string with the value of the default locale (for instance "en")
     *    Required by Vocdoni
     *
     * @returns {object} An object with the following format:
     *    {ca: "Nom", default: "Name"}
     */
    const transformLocales = (array, defaultLocale) => {
      return array.reduce((obj, elem) => {
        obj[defaultLocale == elem.locale ? "default" : elem.locale] = elem.text;
        return obj;
      }, {});
    }

    let electionMetadata = await this._getElectionMetadata(COMPONENT_ID);
    electionMetadata = electionMetadata.data.component.elections.nodes[0];

    // TODO: get header field from the real API
    const election = new Election({
      title: transformLocales(electionMetadata.title.translations, defaultLocale),
      description: transformLocales(electionMetadata.description.translations, defaultLocale),
      header: "https://source.unsplash.com/random",
      streamUri: electionMetadata.streamUri,
      startDate: Date.parse(electionMetadata.startTime),
      endDate: Date.parse(electionMetadata.endTime),
      census,
      electionType: null
    });

    // TODO: create description field in the real API
    // TODO: create value field in the real API
    electionMetadata.questions.forEach((question) => {
      election.addQuestion(
        transformLocales(question.title.translations, defaultLocale),
        transformLocales(question.description.translations, defaultLocale),
        question.answers.map((answer) => {
          return {
            title: transformLocales(answer.title.translations, defaultLocale),
            value: answer.value
          }
        })
      );
    })

    return election;
  }

  /*
   * Gets the election Metadata from the Decidim GraphQL API
   *
   * @param {number} componentId The component ID of the Vocdoni Election we want to create
   *
   * @returns {Promise<object>} data The promise of the response in JSON format
   */
  async _getElectionMetadata(componentId) {
    const query = `{
      component(id: $componentId) {
        id
        name { translations { text locale } }
        ... on VocdoniElections {
          name { translations { text locale } }
          elections {
            nodes {
              status
              id
              title { translations { text locale } }
              description { translations { text locale } }
              attachments { thumbnail url type }
              streamUri
              startTime
              endTime
              questions { title { translations { text locale } }
                answers { title { translations { text locale } } }
              }
            }
          }
        }
      }
    }`

    return new Promise((resolve) => {
      fetch("http://localhost:8081/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { componentId },
        })
      })
        .then(r => r.json())
        .then(data => resolve(data));
    });
  }
}
