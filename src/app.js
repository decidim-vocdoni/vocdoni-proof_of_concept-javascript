import { EnvironmentInitialitzationOptions, VocdoniSDKClient } from "@vocdoni/sdk"

import { isWalletInstalled, getWallet } from "./wallet"  
import { showAccountInfo } from "./account"
import { setupCensus, setupElection } from "./election"
import { submitVote } from "./voter"

const ethereumButton = document.querySelector(".js-signin-metamask-button");
const createElectionButton = document.querySelector(".js-create-election-button");
const electionCreatedMessage = document.querySelector(".js-vocdoni-election-created");
const electionCreatedLink = electionCreatedMessage.querySelector(".js-vocdoni-election-created-link");

const voteMnemonicForm = document.querySelector(".js-vote-mnemonic-form");
const voteForm = document.querySelector(".js-vote-form");

/*
 * Calls the different methods for setting up an election with the Vocdoni API
 * using the Vocdoni SDK. Based on the TypeScript example provided in the GitHub repository.
 * @see {@link https://developer.vocdoni.io|Documentation}
 * @see {@link https://github.com/vocdoni/vocdoni-sdk/blob/ad03822f537fd8c4d43c85d447475fd38b62909c/examples/typescript/src/index.ts|TypeScript example}
 */
const main = async () => {
  console.log("Starting the demo!");

  console.log("Initializing the wallet...");
  const creator = await getWallet();
  console.log("CREATOR => ", creator);

  const client = new VocdoniSDKClient({
    env: EnvironmentInitialitzationOptions.DEV,
    wallet: creator
  })
  console.log("CLIENT => ", client);

  console.log("Creating account...");
  await client.createAccount();
  console.log("Getting the account information...");
  const accountInformation = await client.fetchAccountInfo();
  console.log("ACCOUNT INFORMATION => ", accountInformation);
  showAccountInfo(accountInformation);

  console.log("Let's change the buttons");
  ethereumButton.classList.toggle("hide");
  createElectionButton.classList.toggle("hide");
  createElectionButton.addEventListener("click", () => {
    createElectionButton.disabled = true;
    createDemoElection(client, creator)
  })
}

/* 
 * Create the demo election in Vocdoni API
 * @param {VocdoniSDKClient} client An instance of the client with the account created
 * @param {Object} creator The Wallet object instance from ethers
 */
const createDemoElection = async (client, creator) => {
  console.log("Initializing the census...");
  const census = await setupCensus(creator);
  console.log("CENSUS => ", census);

  console.log("Initializing the election...");
  const election = await setupElection(census);
  console.log("ELECTION => ", election);

  console.log("Creating the election in Vocdoni API...");
  const electionId = await client.createElection(election)
  console.log("Election created!");
  console.log("ELECTION ID => ", electionId);
  electionCreatedMessage.classList.toggle("hide");
  electionCreatedLink.href = `https://dev.explorer.vote/processes/show/#/${electionId}`
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Ready to start the Proof of Concept. DOMContentLoaded event.");

  // For election set-up page
  if (ethereumButton !== null && isWalletInstalled()) {
    console.log("Set-up form loaded");
    console.log("Let's show the button");
    ethereumButton.classList.toggle("hide");
    ethereumButton.addEventListener("click", () => main())
  };

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

// TODO: listen for the network change event to reload the page
