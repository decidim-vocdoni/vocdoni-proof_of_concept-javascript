import { ethers } from "ethers";
import { EnvironmentInitialitzationOptions, VocdoniSDKClient, Vote } from '@vocdoni/sdk';

/*
 * @param {string} electionId
 * @param {string} mnemonicPhrase
 * @param {array} voteValue
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

/*
 * @param {object} accessCodeForm The Element with the access code form for accessing the election
 */
export const validateVoteMnemonicPhrase = (accessCodeForm) => {
  if (accessCodeForm === null) {
    return;
  }

  // const electionIdInput = accessCodeForm.querySelector("input[name=election-id]");

  accessCodeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const voteMnemonicInput = accessCodeForm.querySelector("#login_access_code");
    const accessCodeErrorMessage = accessCodeForm.querySelector(".js-login_access_code_error");
    if (voteMnemonicInput.value.split(" ").length === 12) {
      accessCodeErrorMessage.classList.add("hide");
      $("#identification").foundation("toggle");
      $("#step-0").foundation("toggle");
    } else {
      accessCodeErrorMessage.classList.remove("hide");
    }
  });
}

