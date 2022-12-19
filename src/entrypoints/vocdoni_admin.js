import { isWalletInstalled } from "../wallet"
import SetupVocdoniElection from "../election"

document.addEventListener("DOMContentLoaded", () => {
  const signinMetamaskButton = document.querySelector(".js-signin-metamask-button");
  const metaMaskInstalledMessage = document.querySelector(".js-metamask-installed-message");
  const metaMaskNotInstalledMessage = document.querySelector(".js-metamask-not-installed-message");
  const metaMaskNoPermissionsMessage = document.querySelector(".js-metamask-no-permissions-message");

  const createElectionButton = document.querySelector(".js-create-election-button");
  const electionCreatedMessage = document.querySelector(".js-vocdoni-election-created");
  const electionCreatedLink = electionCreatedMessage.querySelector(".js-vocdoni-election-created-link");
  const divDemoCensus = document.querySelector(".js-demo-census");

  const LOCAL_STORAGE_ELECTION_ITEM = "vocdoni-demo-election";

  if (isWalletInstalled()) {
    metaMaskInstalledMessage.classList.toggle("hide");
  } else {
    metaMaskNotInstalledMessage.classList.toggle("hide");
  }

  if (window.localStorage.getItem("vocdoni-demo-election")) {
    // Election created step
    const electionId = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_ITEM);
    console.log("ELECTION ID => ", electionId);
  } else {
    // Setup election step
    if (signinMetamaskButton !== null && isWalletInstalled()) {
      new SetupVocdoniElection({
        signinMetamaskButton: signinMetamaskButton,
        createElectionButton: createElectionButton,
        electionCreatedMessage: electionCreatedMessage,
        electionCreatedLink: electionCreatedLink,
        metaMaskNoPermissionsMessage: metaMaskNoPermissionsMessage,
        divDemoCensus: divDemoCensus,
        localStorageElectionItem: LOCAL_STORAGE_ELECTION_ITEM
      });
    };
  }
});
