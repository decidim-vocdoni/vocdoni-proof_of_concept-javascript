import { Election, EnvironmentInitialitzationOptions, PlainCensus, VocdoniSDKClient } from "@vocdoni/sdk"

import { ethers } from "ethers";

const ethereumButton = document.querySelector(".js-signin-metamask-button");
const metaMaskNotInstalledMessage = document.querySelector(".js-metamask-not-installed-message");
const metaMaskNoPermissionsMessage = document.querySelector(".js-metamask-no-permissions-message");

/*
 * Check if there's any wallet available
 * @returns {boolean} true if it's installed
 */
const isWalletInstalled = () => {

  /*
   * Show the error message when the MetaMask Wallet is not installed
   * @returns {void}
   */
  const showNotInstalledMessage = () => {
    metaMaskNotInstalledMessage.classList.toggle("hide");
  }

  console.log("Checking if there's an Ethereum Wallet in the browser...");
  let result = false;
  if (typeof window.ethereum === "undefined") {
    console.log("There isn't one. Showing the error message.");
    showNotInstalledMessage();
    result = false;
  } else {
    console.log("There's one!");
    result = true;
  }
  return result;
}

/*
 * Get the wallet from the window.ethereum API (MetaMask).
 * TODO: we should add support to WalletConnect
 * @returns {Promise<account>|void} A promise to the account instance or nothing if it doesn't have permission
 */
const getWallet = async () => {
  /*
   * Show the error message that the MetaMask Wallet has no permissions
   * @returns {void}
   */
  const showNoPermissionsMessage = () => {
    metaMaskNoPermissionsMessage.classList.toggle("hide");
    ethereumButton.classList.toggle("hide");
  }

  console.log("Asking permission to wallet");

  return new Promise((resolve) => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    provider.send("eth_requestAccounts", []).then(() => {
      const signer = provider.getSigner();
      resolve(signer);
    }).catch((exception) => {
      if (exception.code === -32002 || exception.code === 4001) {
        console.log("No permissions! Show the error message");
        showNoPermissionsMessage();
      } else {
        console.log("No permissions! Invalid exception => ", exception);
      }
    });
  });
}

/* Sets up the account in the Vocdoni API. 
 * @param {Object} client
 * @returns {void}
 */
const setupAccount = async (client) => {
  console.log("Set up account");
  await client.createAccount();
}

/* Sets up the census. This is only for demo purposes.
 * We should study the different kind of Censuses to see which apply to our usecase
 * @param {Object} creator
 * @returns {} census
 * @see {@link https://github.com/vocdoni/vocdoni-sdk/tree/main/src/types/census|GitHub}
 * @see {@link https://docs.vocdoni.io/architecture/census/census-overview.html|Documentation}
 */
const setupCensus = async (creator) => {
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
const setupElection = (census) => {
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

/* 
 * Create the Election in Vocdoni API
 * @param {VocdoniSDKClient} client An instance of the client with the account created
 * @param {Election} election An election instance already configured
 * @returns {Promise<electionId>} A promise to the electionId in the Vocodni API.
 */
const createElection = (client, election) => {
  return new Promise((resolve) => {
    const electionId = client.createElection(election)
    client.setElectionId(electionId);
    resolve(electionId);
  });
}

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
  setupAccount(client);

  console.log("Initializing the census...");
  const census = await setupCensus(creator);
  console.log("CENSUS => ", census);

  console.log("Initializing the election...");
  const election = setupElection(census);
  console.log("ELECTION => ", election);

  console.log("Creating the election in Vocdoni API...");
  const electionId = await createElection(client, election); 
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
