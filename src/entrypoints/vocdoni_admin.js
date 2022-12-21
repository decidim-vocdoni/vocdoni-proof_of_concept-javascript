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
    const setupElectionStepWrapper = document.querySelector("#setup-election-step");
    setupElectionStepWrapper.classList.remove("hide");
    const signinMetamaskButton = setupElectionStepWrapper.querySelector(".js-signin-metamask-button");
    const electionCreatedMessage = document.querySelector(".js-vocdoni-election-created");
    const electionCreatedLink = electionCreatedMessage.querySelector(".js-vocdoni-election-created-link");

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
    const electionCreatedStepWrapper = document.querySelector("#election-created-step");
    const signinMetamaskButton = electionCreatedStepWrapper.querySelector(".js-signin-metamask-button");
    const electionCreatedLink = electionCreatedStepWrapper.querySelector(".js-vocdoni-election-created-link");
    const electionCreatedMetadataDiv = electionCreatedStepWrapper.querySelector(".js-election-created-metadata");
    const electionId = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_ID_ITEM);

    electionCreatedLink.href = `https://dev.explorer.vote/processes/show/#/${electionId}`;
    console.log("ELECTION ID => ", electionId);

    electionCreatedStepWrapper.classList.remove("hide");
    new FetchVocdoniElectionMetadata({
      electionId: electionId,
      signinMetamaskButton: signinMetamaskButton,
      metaMaskNoPermissionsMessage: metaMaskNoPermissionsMessage,
      electionCreatedMetadataDiv: electionCreatedMetadataDiv,
      localStorageElectionStatusItem: LOCAL_STORAGE_ELECTION_STATUS_ITEM
    });
  }

  switch (electionStatus) {
    case "READY":
      electionCreatedStep();
      break;
    default:
      setupElectionStep();
  }
});
