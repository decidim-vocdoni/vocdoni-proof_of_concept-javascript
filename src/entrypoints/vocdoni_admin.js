import { createRandomWallet } from "../wallet"
import SetupVocdoniElection from "../election"
import FetchVocdoniElectionMetadata from "../election-fetch-metadata"

document.addEventListener("DOMContentLoaded", () => {
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
    const createWalletButton = document.querySelector(".js-create-wallet");
    wrapper.classList.remove("hide");

    createWalletButton.addEventListener("click", (event) => {
      event.preventDefault();
      createWalletButton.disabled = true;
      const wallet = createRandomWallet();
      window.localStorage.setItem(LOCAL_STORAGE_ELECTION_STATUS_ITEM, "SETUP_ELECTION");
      window.localStorage.setItem(LOCAL_STORAGE_WALLET_PRIVATE_KEY, wallet.privateKey);
      document.querySelector(".js-wallet-any-message").classList.add("hide");
      document.querySelector(".js-wallet-created-message").classList.remove("hide");
      document.querySelector(".js-wallet-created-phrase").value = wallet.mnemonicPhrase;
    });
  }

  const setupElectionStep = () => {
    // Setup election step
    const onSuccess = (electionId) => {
      const electionCreatedMessage = document.querySelector(".js-vocdoni-election-created");
      const electionCreatedLink = electionCreatedMessage.querySelector(".js-vocdoni-election-created-link");
      electionCreatedMessage.classList.remove("hide");
      electionCreatedLink.href = `https://dev.explorer.vote/processes/show/#/${electionId}`;
      window.localStorage.setItem(LOCAL_STORAGE_ELECTION_ID_ITEM, electionId);
      window.localStorage.setItem(LOCAL_STORAGE_ELECTION_STATUS_ITEM, "READY");
    }

    const onFailure = () => {
      const electionCreateErrorMessage = document.querySelector(".js-election-create-error-message");
      electionCreateErrorMessage.classList.remove("hide");
    }

    const wrapper = document.querySelector("#setup-election-step");
    const createElectionButton = document.querySelector(".js-create-election-button");
    const divDemoCensus = document.querySelector(".js-demo-census");

    wrapper.classList.remove("hide");

    createElectionButton.addEventListener("click", (event) => {
      event.preventDefault();
      createElectionButton.disabled = true;

      new SetupVocdoniElection({
        walletPrivateKey: window.localStorage.getItem(LOCAL_STORAGE_WALLET_PRIVATE_KEY),
        divDemoCensus: divDemoCensus
      }, onSuccess, onFailure);
    })

  }

  const fetchElectionHelper = (wrapperSelector, onSuccess = null) => {
    const wrapper = document.querySelector(wrapperSelector);
    const electionLink = wrapper.querySelector(".js-vocdoni-election-created-link");
    const electionMetadataDiv = wrapper.querySelector(".js-election-metadata");
    const electionId = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_ID_ITEM);

    electionLink.href = `https://dev.explorer.vote/processes/show/#/${electionId}`;
    console.log("ELECTION ID => ", electionId);

    wrapper.classList.remove("hide");

    new FetchVocdoniElectionMetadata({
      walletPrivateKey: window.localStorage.getItem(LOCAL_STORAGE_WALLET_PRIVATE_KEY),
      electionId: electionId,
      electionMetadataDiv: electionMetadataDiv,
      localStorageElectionStatusItem: LOCAL_STORAGE_ELECTION_STATUS_ITEM
    }, onSuccess);
  }

  const electionCreatedStep = () => {
    // Election created step
    fetchElectionHelper("#election-created-step");
  }

  const votePeriodStep = () => {
    // Vote period step
    fetchElectionHelper("#vote-period-step");
  }

  const calculatedResultsStep = () => {
    // Calculated results step
    const onSuccess = (electionMetadata) => {
      // js-answer-0
      console.log("Yeah!", electionMetadata);
    };

    fetchElectionHelper("#calculated-results-step", onSuccess);
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
    case "RESULTS":
      calculatedResultsStep();
      break;
    default:
      setupWalletStep();
  }
});
