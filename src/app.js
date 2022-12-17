import { EnvironmentInitialitzationOptions, VocdoniSDKClient } from "@vocdoni/sdk"

import { isWalletInstalled, getWallet } from "./wallet"  
import { showAccountInfo } from "./account"
import { setupCensus, setupElection } from "./election"

const ethereumButton = document.querySelector(".js-signin-metamask-button");
const createElectionButton = document.querySelector(".js-create-election-button");
const electionCreatedMessage = document.querySelector(".js-vocdoni-election-created");

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
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Ready to start the Proof of Concept. DOMContentLoaded event.");

  if (isWalletInstalled()) {
    console.log("Let's show the button");
    ethereumButton.classList.toggle("hide");
    ethereumButton.addEventListener("click", () => main())
  };
});

// TODO: listen for the network change event to reload the page
