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

/* Sets up the election. This is only for demo purposes.
 * This metadata and configuration would be fetch with the Decidim GraphQL API
 * @param {Object} census
 * @returns {} election
 */
export const setupElection = (census) => {
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 10);

  const election = new Election({
    title: "Election title",
    description: "Election description",
    header: "https://source.unsplash.com/random",
    streamUri: "https://source.unsplash.com/random",
    endDate: endDate.getTime(),
    census,
    electionType: null
  });

  election.addQuestion("This is a title", "This is a description", [
    {
      title: "Option 1",
      value: 0
    },
    {
      title: "Option 2",
      value: 1
    }
  ]);

  return election;
}
