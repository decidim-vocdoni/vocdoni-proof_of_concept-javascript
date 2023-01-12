import { ethers } from "ethers";
import { EnvOptions, VocdoniSDKClient, Election, PlainCensus } from "@vocdoni/sdk"
import { getWallet } from "./wallet"

// How many addresses we'll create for the Demo
const TEST_CENSUS = 5;

// TODO: change hardcoded componentId
// When this is integrated in Decidim we should extract this from the URL
const COMPONENT_ID = 22;

/*
 * Creates an Election in the Vocdoni API 
 * Instantiates the Wallet of the creator and the Vocdoni SDK client
 * Based on the TypeScript example provided in the GitHub repository.
 *
 * @param {object} options All the different options that interact with setting up an Election.
 *   They're mostly HTML Elements where we show messages or bind events.
 * @param {function} onSuccess A callback function to be run when the Election is successfully sent to the API
 * @param {function} onFailure A callback function to be run when the Election sent to the API has a failure
 *
 * @property {object} options.walletPrivateKey The private key from the wallet that will create the Election
 * @property {object} options.divDemoCensus The Element with the textarea where we'll add the Demo census
 *
 * @see {@link https://developer.vocdoni.io|Documentation}
 * @see {@link https://github.com/vocdoni/vocdoni-sdk/blob/ad03822f537fd8c4d43c85d447475fd38b62909c/examples/typescript/src/index.ts|TypeScript example}
 */
export default class SetupVocdoniElection {
  // TODO: listen for the network change event to reload the page
  constructor(options = {}, onSuccess, onFailure) {
    this.walletPrivateKey = options.walletPrivateKey;
    this.divDemoCensus = options.divDemoCensus;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.creator = null;
    this.client = null;

    this.run();
  }

  /*
   * Listens to the "Create election in Vocdoni API" button and runs the methods when they're clicked.
   *
   * @returns {void}
   */
  run() {
    this._setCreatorWalletAndClient();
    this._createElection();
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
    if (clientInfo.balance === 0) {
      this.client.collectFaucetTokens();
    }
  }

  /*
   * Create the demo election in Vocdoni API.
   *
   * @returns {void}
   */
  async _createElection() {
    const census = await this._initializeCensus(this.creator);
    console.log("CENSUS => ", census);

    const election = await this._initializeElection(census);
    console.log("ELECTION => ", election);

    try {
      const electionId = await this.client.createElection(election);
      console.log("ELECTION ID => ", electionId);

      this.onSuccess(electionId);
    } catch (error) {
      console.log("ERROR ", error);
      this.onFailure();
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
      this.divDemoCensus.classList.remove("hide");
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
    const election = Election.from({
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

