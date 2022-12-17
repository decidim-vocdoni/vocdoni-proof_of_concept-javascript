import { Election, PlainCensus } from "@vocdoni/sdk"

/* Sets up the census. This is only for demo purposes.
 * We should study the different kind of Censuses to see which apply to our usecase
 * @param {Object} creator The Wallet object instance from ethers
 * @returns {} census
 * @see {@link https://github.com/vocdoni/vocdoni-sdk/tree/main/src/types/census|GitHub}
 * @see {@link https://docs.vocdoni.io/architecture/census/census-overview.html|Documentation}
 */
export const setupCensus = async (creator) => {
  const census = new PlainCensus();
  census.add(await creator.getAddress());
  census.add(await ethers.Wallet.createRandom().getAddress());
  return census;
}

/* Initialize the election object
 * This metadata and configuration are fetch with the Decidim GraphQL API using the demo-graphql app
 * @param {Object} census
 * @returns {Promise<Election>} The promise of the election object
 */
export const setupElection = (census) => {
  // TODO: change hardcoded componentId
  // When this is integrated in Decidim we should extract this from the URL
  const componentId = 22;

  return new Promise((resolve) => {
    getElectionMetadata(componentId)
      .then((resp) => resolve(initializeElection(resp, census)))
  });
}

/*
 * Parses the election metadata and instantiates an Election object using Vocdoni SDK
 * @param {Object} electionMetadata The JSON with the election metadata
 * @param {String} defaultLocale Optional. A string with the value of the default locale (for instance "en")
 *    Required by Vocdoni.
 * @returns {Election} election The election object with the metadata
 */
export const initializeElection = (electionMetadata, census, defaultLocale = "en") => {

  /*
   * Transform the locales to the required format with a default locale
   * @param {Array} array An array with the following format:
   *    [{"text": "Nom", "locale": "ca"}, {"text": "Name","locale": "en"}]
   * @param {String} defaultLocale A string with the value of the default locale (for instance "en")
   *    Required by Vocdoni
   * @result {Object} An object with the following format:
   *    {ca: "Nom", default: "Name"}
   */
  const transformLocales = (array, defaultLocale) => {
    return array.reduce((obj, elem) => {
      obj[defaultLocale == elem.locale ? "default" : elem.locale] = elem.text; 
      return obj;
    }, {});
  }

  // TODO: header
  electionMetadata = electionMetadata.data.component.elections.nodes[0];

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

  electionMetadata.questions.forEach((question) => {
    // TODO: create description in the real API
    election.addQuestion(
      transformLocales(question.title.translations, defaultLocale),
      transformLocales(question.description.translations, defaultLocale),
      question.answers.map((answer) => {
        // TODO: create value in the real API
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
 * @param {Number} componentId The component ID of the Vocdoni Election we want to create
 * @returns {Promise<Object>} data The promise of the response in JSON format
 */
export const getElectionMetadata = (componentId) => {
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
