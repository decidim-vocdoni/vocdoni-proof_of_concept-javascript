// Only add one setup, depending if its real or a preview
import "../voter/setup-vote"
// import "../voter/setup-preview"

import "../voter/new-vote"

import { validateVoteMnemonicPhrase } from "../voter"

document.addEventListener("DOMContentLoaded", () => {
  const accessCodeForm = document.querySelector("#new_login");
  const $voteWrapper = $(".vote-wrapper");

  // FIXME: we actually hardcode the voteMnemonicPhrase instead of using it from
  // the voteWrapper data attribute, as we should radically change the current
  // demo flow for this to work:
  //
  // As window.Decidim.setupVoteComponent is bound on load, it can't
  // get the voteMnemonicPhrase that we're adding afterguards.
  // So, as this is flow need to be reviews and approved, for now
  // we'll take it from our good old friend localStorage
  const voteMnemonicPhrase = window.localStorage.getItem("vocdoni-demo-voter-phrase");
  console.log("MNEMONIC PHRASE => ", voteMnemonicPhrase);
  $voteWrapper.attr("data-voter-phrase", voteMnemonicPhrase);

  validateVoteMnemonicPhrase(accessCodeForm, (voteMnemonicPhrase) => {
    // console.log("MNEMONIC PHRASE => ", voteMnemonicPhrase);
    // $voteWrapper.attr("data-voter-phrase", voteMnemonicPhrase);
  });

  const LOCAL_STORAGE_ELECTION_ID_ITEM = "vocdoni-demo-election-id";
  const electionId = window.localStorage.getItem(LOCAL_STORAGE_ELECTION_ID_ITEM);
  console.log("ELECTION ID => ", electionId);
  $voteWrapper.attr("data-election-unique-id", electionId);

  // const voteForm = document.querySelector(".js-vote-form");
});
