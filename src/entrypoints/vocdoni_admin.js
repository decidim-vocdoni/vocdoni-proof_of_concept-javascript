import { createRandomWallet } from "../wallet"
import SetupVocdoniElection from "../election"
import FetchVocdoniElectionMetadata from "../election-fetch-metadata"

document.addEventListener("DOMContentLoaded", () => {
  const createElectionButton = document.querySelector(".js-create-election-button");
  const divDemoCensus = document.querySelector(".js-demo-census");
  const electionCreateErrorMessage = document.querySelector(".js-election-create-error-message");

  const LOCAL_STORAGE_ELECTION_ID_ITEM = "vocdoni-demo-election-id";
  const LOCAL_STORAGE_ELECTION_STATUS_ITEM = "vocdoni-demo-election-status";
  const LOCAL_STORAGE_WALLET_PRIVATE_KEY = "vocdoni-demo-wallet-private-key";

  document.querySelector(".js-clean-local-storage").addEventListener("click", (event) => {
    const cleanLocalStorageItems = () => {
      const items = [ LOCAL_STORAGE_ELECTION_ID_ITEM, LOCAL_STORAGE_ELECTION_STATUS_ITEM ];
      for (const item of items) {
        window.localStorage.removeItem(item);
      }
    }

    event.preventDefault();
    cleanLocalStorageItems();
    window.location.reload();
  });

  const electionStatus = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_STATUS_ITEM);

  // Steps logic
  const setupWalletStep = () => {
    // Setup wallet step
    const wrapper = document.querySelector("#setup-wallet-step");

    wrapper.classList.remove("hide");
    document.querySelector(".js-create-wallet").addEventListener("click", (event) => {
      event.preventDefault();
      const wallet = createRandomWallet();
      window.localStorage.setItem(LOCAL_STORAGE_ELECTION_STATUS_ITEM, "SETUP_ELECTION");
      window.localStorage.setItem(LOCAL_STORAGE_WALLET_PRIVATE_KEY, wallet.privateKey);
      document.querySelector(".js-wallet-created-message").classList.remove("hide");
      document.querySelector(".js-wallet-created-phrase").value = wallet.mnemonicPhrase;
    });
  }

  const setupElectionStep = () => {
    // Setup election step
    const wrapper = document.querySelector("#setup-election-step");
    const electionCreatedMessage = document.querySelector(".js-vocdoni-election-created");
    const electionCreatedLink = electionCreatedMessage.querySelector(".js-vocdoni-election-created-link");

    wrapper.classList.remove("hide");

    new SetupVocdoniElection({
      walletPrivateKey: window.localStorage.getItem(LOCAL_STORAGE_WALLET_PRIVATE_KEY),
      createElectionButton: createElectionButton,
      electionCreatedMessage: electionCreatedMessage,
      electionCreatedLink: electionCreatedLink,
      divDemoCensus: divDemoCensus,
      electionCreateErrorMessage: electionCreateErrorMessage,
      localStorageElectionIdItem: LOCAL_STORAGE_ELECTION_ID_ITEM,
      localStorageElectionStatusItem: LOCAL_STORAGE_ELECTION_STATUS_ITEM
    });
  }

  const electionCreatedStep = () => {
    // Election created step
    const wrapper = document.querySelector("#election-created-step");
    const signinMetamaskButton = wrapper.querySelector(".js-signin-metamask-button");
    const electionLink = wrapper.querySelector(".js-vocdoni-election-created-link");
    const electionMetadataDiv = wrapper.querySelector(".js-election-metadata");
    const electionId = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_ID_ITEM);

    electionLink.href = `https://dev.explorer.vote/processes/show/#/${electionId}`;
    console.log("ELECTION ID => ", electionId);

    wrapper.classList.remove("hide");

    new FetchVocdoniElectionMetadata({
      electionId: electionId,
      electionMetadataDiv: electionMetadataDiv,
      localStorageElectionStatusItem: LOCAL_STORAGE_ELECTION_STATUS_ITEM
    });
  }

  const votePeriodStep = () => {
    // Vote period step
    const wrapper = document.querySelector("#vote-period-step");
    const signinMetamaskButton = wrapper.querySelector(".js-signin-metamask-button");
    const electionLink = wrapper.querySelector(".js-vocdoni-election-created-link");
    const electionMetadataDiv = wrapper.querySelector(".js-election-metadata");
    const electionId = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_ID_ITEM);

    electionLink.href = `https://dev.explorer.vote/processes/show/#/${electionId}`;
    console.log("ELECTION ID => ", electionId);

    wrapper.classList.remove("hide");

    new FetchVocdoniElectionMetadata({
      electionId: electionId,
      signinMetamaskButton: signinMetamaskButton,
      metaMaskNoPermissionsMessage: metaMaskNoPermissionsMessage,
      electionMetadataDiv: electionMetadataDiv,
      localStorageElectionStatusItem: LOCAL_STORAGE_ELECTION_STATUS_ITEM
    });
  }

  switch (electionStatus) {
    case "SETUP_ELECTION":
      setupElectionStep();
      break;
    case "READY":
      electionCreatedStep();
      break;
    case "VOTE_PERIOD":
      votePeriodStep();
      break;
    default:
      setupWalletStep();
  }
});
