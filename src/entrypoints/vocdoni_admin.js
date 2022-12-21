import { isWalletInstalled } from "../wallet"
import SetupVocdoniElection from "../election"
import FetchVocdoniElectionMetadata from "../election-fetch-metadata"

document.addEventListener("DOMContentLoaded", () => {
  const metaMaskInstalledMessage = document.querySelector(".js-metamask-installed-message");
  const metaMaskNotInstalledMessage = document.querySelector(".js-metamask-not-installed-message");
  const metaMaskNoPermissionsMessage = document.querySelector(".js-metamask-no-permissions-message");

  const createElectionButton = document.querySelector(".js-create-election-button");
  const divDemoCensus = document.querySelector(".js-demo-census");
  const electionCreateErrorMessage = document.querySelector(".js-election-create-error-message");

  const LOCAL_STORAGE_ELECTION_ID_ITEM = "vocdoni-demo-election-id";
  const LOCAL_STORAGE_ELECTION_STATUS_ITEM = "vocdoni-demo-election-status";

  if (isWalletInstalled()) {
    metaMaskInstalledMessage.classList.toggle("hide");
  } else {
    metaMaskNotInstalledMessage.classList.toggle("hide");
  }

  const electionStatus = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_STATUS_ITEM);

  const setupElectionStep = () => {
    // Setup election step
    const wrapper = document.querySelector("#setup-election-step");
    const signinMetamaskButton = wrapper.querySelector(".js-signin-metamask-button");
    const electionCreatedMessage = document.querySelector(".js-vocdoni-election-created");
    const electionCreatedLink = electionCreatedMessage.querySelector(".js-vocdoni-election-created-link");

    wrapper.classList.remove("hide");

    if (signinMetamaskButton !== null && isWalletInstalled()) {
      new SetupVocdoniElection({
        signinMetamaskButton: signinMetamaskButton,
        createElectionButton: createElectionButton,
        electionCreatedMessage: electionCreatedMessage,
        electionCreatedLink: electionCreatedLink,
        metaMaskNoPermissionsMessage: metaMaskNoPermissionsMessage,
        divDemoCensus: divDemoCensus,
        electionCreateErrorMessage: electionCreateErrorMessage,
        localStorageElectionIdItem: LOCAL_STORAGE_ELECTION_ID_ITEM,
        localStorageElectionStatusItem: LOCAL_STORAGE_ELECTION_STATUS_ITEM
      });
    };
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
      signinMetamaskButton: signinMetamaskButton,
      metaMaskNoPermissionsMessage: metaMaskNoPermissionsMessage,
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
    case "READY":
      electionCreatedStep();
      break;
    case "VOTE_PERIOD":
      votePeriodStep();
      break;
    default:
      setupElectionStep();
  }
});
