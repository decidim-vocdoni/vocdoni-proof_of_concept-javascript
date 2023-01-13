import { EnvOptions, VocdoniSDKClient, Election } from "@vocdoni/sdk"
import { getWallet } from "./wallet"

/*
 * Creates an Election in the Vocdoni API 
 * Instantiates the Vocdoni SDK client using the Wallet's private key given as parameter.
 * Based on the TypeScript example provided in the GitHub repository.
 *
 * @param {object} options All the different options that interact with setting up an Election.
 * @property {string} options.walletPrivateKey The private key from the wallet that will create the Election
 * @property {array} options.census An array with all the public keys of the census participants
 * @property {string} options.graphql_api_url The URL for the GraphQL API where to extract the Election metadata
 * @property {number|string} options.vocdoni_component_id The ID of the Vocdoni Component in Decidim
 * @param {function} onSuccess A callback function to be run when the Election is successfully sent to the API
 * @param {function} onFailure A callback function to be run when the Election sent to the API has a failure
 *
 * @see {@link https://developer.vocdoni.io|Documentation}
 * @see {@link https://github.com/vocdoni/vocdoni-sdk/blob/ad03822f537fd8c4d43c85d447475fd38b62909c/examples/typescript/src/index.ts|TypeScript example}
 */
export default class SetupVocdoniElection {
  // TODO: listen for the network change event to reload the page
  constructor(options = {}, onSuccess, onFailure) {
    this.walletPrivateKey = options.walletPrivateKey;
    this.census = options.census;
    this.graphql_api_url = options.graphql_api_url;
    this.vocdoni_component_id = options.vocdoni_component_id;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.client = null;

    this.run();
  }

  /*
   * Listens to the "Create election in Vocdoni API" button and runs the methods when they're clicked.
   *
   * @returns {void}
   */
  run() {
    this._setVocdoniClient();
    this._createElection();
  }

  /*
   * Gets the wallet and initialize the Vocdoni SDK Client with it
   * Binds the client to the instance
   *
   * @returns {void}
   */
  async _setVocdoniClient() {
    const creator = getWallet(this.walletPrivateKey);
    console.log("CREATOR => ", creator);

    this.client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: creator
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
    console.log("CENSUS => ", this.census);

    const election = await this._initializeElection();
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

  /*
   * Parses the election metadata and instantiates an Election object using Vocdoni SDK
   * This metadata and configuration are fetch with the Decidim GraphQL API using the demo-graphql app
   *
   * @param {string} defaultLocale Optional. A string with the value of the default locale (for instance "en")
   *    Required by Vocdoni.
   *
   * @returns {object} election The election object with the metadata
   */
  async _initializeElection(defaultLocale = "en") {

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

    const census = this.census;
    let electionMetadata = await this._getElectionMetadata();
    electionMetadata = electionMetadata.data.component.elections.nodes[0];
    const header = electionMetadata.attachments[0].url;

    const election = Election.from({
      title: transformLocales(electionMetadata.title.translations, defaultLocale),
      description: transformLocales(electionMetadata.description.translations, defaultLocale),
      header: header.startsWith("http") ? header : `${window.location.origin}${header}`,
      streamUri: electionMetadata.streamUri,
      startDate: Date.parse(electionMetadata.startTime),
      endDate: Date.parse(electionMetadata.endTime),
      census,
    });

    // TODO: add multiple questions support
    electionMetadata.questions.forEach((question) => {
      election.addQuestion(
        transformLocales(question.title.translations, defaultLocale),
        transformLocales(question.description.translations, defaultLocale),
        question.answers.map((answer) => {
          return {
            title: transformLocales(answer.title.translations, defaultLocale),
            value: answer.id
          }
        })
      );
    })

    return election;
  }

  /*
   * Gets the election Metadata from the Decidim GraphQL API
   *
   * @returns {Promise<object>} data The promise of the response in JSON format
   */
  async _getElectionMetadata() {
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
              questions {
                title { translations { text locale } }
                description { translations { text locale } }
                answers { title { translations { text locale } } }
              }
            }
          }
        }
      }
    }`

    return new Promise((resolve) => {
      fetch(this.graphql_api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { this.vocdoni_component_id },
        })
      })
        .then(r => r.json())
        .then(data => resolve(data));
    });
  }
}

