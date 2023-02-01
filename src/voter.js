import { VocdoniSDKClient, Vote } from "@vocdoni/sdk";
import { configuration } from "./configuration"

/*
 * @param {string} electionId
 * @param {string} mnemonicPhrase
 * @param {array} voteValue
 *
 * @return {Promise<object>} A Promise of an object with two possible reposnses, depending if the
 *   vote was successfull or not.
 *   - If it was sucessful, the format will be `{status: "OK", voteHash: voteHash}`
 *   - If it was a failure, the format will be `{status: "ERROR", message: error}`
 */
export const submitVote = (electionId, wallet, voteValue) => {
  const client = new VocdoniSDKClient({
    env: configuration.environment,
    wallet: wallet
  });
  client.setElectionId(electionId);

  console.log("Voting...");
  const vote = new Vote(voteValue);
  return new Promise((resolve) => {
    client.submitVote(vote).
      then((voteHash) => {
        console.log("Vote sent! CONFIRMATION ID => ", voteHash);
        resolve({status: "OK", voteHash: voteHash});
      }).
      catch((error) => {
        resolve({status: "ERROR", message: error});
      });
  });
}
