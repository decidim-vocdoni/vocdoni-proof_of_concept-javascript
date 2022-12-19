import "../voter/setup-preview"
import "../voter/new-vote"

import { submitVote } from "../voter"

const voteMnemonicForm = document.querySelector(".js-vote-mnemonic-form");
const voteForm = document.querySelector(".js-vote-form");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Ready to start the Proof of Concept. DOMContentLoaded event.");

  // For voting form
  if (voteMnemonicForm !== null) {
    console.log("Voter wallet form loaded");
    const voteMnemonicInput = voteMnemonicForm.querySelector("input[name=mnemonic]");
    const electionIdInput = voteMnemonicForm.querySelector("input[name=election-id]");

    voteMnemonicForm.addEventListener("submit", event => {
      event.preventDefault();

      if (voteMnemonicInput.value.split(" ").length === 12) {
        voteForm.classList.toggle("hide");
        voteMnemonicInput.disabled = true;
        electionIdInput.disabled = true;
        voteMnemonicForm.querySelector("button").disabled = true;
      } else {
        console.log("Check that the wallet mnemonic phrase is correct and send it again");
      }
    });

    if (voteForm !== null) {
      console.log("Voter form loaded");
      voteForm.addEventListener("submit", event => {
        event.preventDefault();
        voteForm.querySelector("button").disabled = true;
        let voteValue = [];
        voteValue.push(voteForm.querySelector("input[type=radio]:checked").value);

        console.log("Submiting vote with:");
        console.log("- ELECTION ID => ", electionIdInput.value);
        console.log("- WALLET => ", voteMnemonicInput.value);
        console.log("- VALUE => ", voteValue);
        submitVote(electionIdInput.value, voteMnemonicInput.value, voteValue);
      });
    }
  }
});
