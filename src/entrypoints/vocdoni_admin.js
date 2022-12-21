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

  const LOCAL_STORAGE_ELECTION_ITEM = "vocdoni-demo-election";

  if (isWalletInstalled()) {
    metaMaskInstalledMessage.classList.toggle("hide");
  } else {
    metaMaskNotInstalledMessage.classList.toggle("hide");
  }

  if (window.localStorage.getItem("vocdoni-demo-election")) {
    // Election created step
    const electionCreatedStepWrapper = document.querySelector("#election-created-step");
    const signinMetamaskButton = electionCreatedStepWrapper.querySelector(".js-signin-metamask-button");
    const electionCreatedLink = electionCreatedStepWrapper.querySelector(".js-vocdoni-election-created-link");
    const electionCreatedMetadataDiv = electionCreatedStepWrapper.querySelector(".js-election-created-metadata");
    const electionId = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_ITEM);

    electionCreatedLink.href = `https://dev.explorer.vote/processes/show/#/${electionId}`;
    console.log("ELECTION ID => ", electionId);

    electionCreatedStepWrapper.classList.remove("hide");
    new FetchVocdoniElectionMetadata({
      electionId: electionId,
      signinMetamaskButton: signinMetamaskButton,
      metaMaskNoPermissionsMessage: metaMaskNoPermissionsMessage,
      electionCreatedMetadataDiv: electionCreatedMetadataDiv
    });
  } else {
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
        localStorageElectionItem: LOCAL_STORAGE_ELECTION_ITEM
      });
    };
  }
});
