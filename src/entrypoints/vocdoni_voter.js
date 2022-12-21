import "../voter/setup-preview"
import "../voter/new-vote"

import { submitVote, validateVoteMnemonicPhrase } from "../voter"

document.addEventListener("DOMContentLoaded", () => {
  const accessCodeForm = document.querySelector("#new_login");
  validateVoteMnemonicPhrase(accessCodeForm);
  // const voteForm = document.querySelector(".js-vote-form");
});

// For voting form
// if (voteForm !== null) {
//   console.log("Voter form loaded");
//   voteForm.addEventListener("submit", event => {
//     event.preventDefault();
//     voteForm.querySelector("button").disabled = true;
//     let voteValue = [];
//     voteValue.push(voteForm.querySelector("input[type=radio]:checked").value);
//
//     console.log("Submiting vote with:");
//     console.log("- ELECTION ID => ", electionIdInput.value);
//     console.log("- WALLET => ", voteMnemonicInput.value);
//     console.log("- VALUE => ", voteValue);
//     submitVote(electionIdInput.value, voteMnemonicInput.value, voteValue);
//   });
// }
