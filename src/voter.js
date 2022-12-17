import { ethers } from "ethers";
import { EnvironmentInitialitzationOptions, VocdoniSDKClient, Vote } from '@vocdoni/sdk';

/*
 * @param {String} electionId
 * @param {String} mnemonicPhrase
 * @param {Array} voteValue
 */
export const submitVote = (electionId, mnemonicPhrase, voteValue) => {
  const voter = ethers.Wallet.fromMnemonic(mnemonicPhrase);
  const client = new VocdoniSDKClient({
    env: EnvironmentInitialitzationOptions.DEV,
    wallet: voter,
  });
  client.setElectionId(electionId);

  console.log('Voting...');
  const vote = new Vote(voteValue);
  client.submitVote(vote).
    then((voteHash) => console.log("Vote sent! CONFIRMATION ID => ", voteHash)).
    catch((error) => {
      const votingErrorMessage = document.querySelector(".js-voting-error");
      votingErrorMessage.classList.toggle("hide");
      votingErrorMessage.querySelector("i").innerHTML = error;
    });
}
