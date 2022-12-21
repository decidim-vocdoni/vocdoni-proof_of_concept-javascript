import { ethers } from "ethers";
import { EnvironmentInitialitzationOptions, VocdoniSDKClient, Vote } from '@vocdoni/sdk';

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
export const submitVote = (electionId, mnemonicPhrase, voteValue) => {
  const voter = ethers.Wallet.fromMnemonic(mnemonicPhrase);
  const client = new VocdoniSDKClient({
    env: EnvironmentInitialitzationOptions.DEV,
    wallet: voter,
  });
  client.setElectionId(electionId);

  console.log('Voting...');
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

/*
 * @param {object} accessCodeForm The Element with the access code form for accessing the election
 * @param {function} onSuccess
 */
export const validateVoteMnemonicPhrase = (accessCodeForm, onSuccess) => {
  if (accessCodeForm === null) {
    return;
  }

  accessCodeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const voteMnemonicInput = accessCodeForm.querySelector("#login_access_code");
    const accessCodeErrorMessage = accessCodeForm.querySelector(".js-login_access_code_error");
    if (voteMnemonicInput.value.split(" ").length === 12) {
      accessCodeErrorMessage.classList.add("hide");
      onSuccess(voteMnemonicInput.value);
      $("#identification").foundation("toggle");
      $("#step-0").foundation("toggle");
    } else {
      accessCodeErrorMessage.classList.remove("hide");
    }
  });
}

