// A vote component, to send the real votes to the Vocdoni API, using the Vocdoni SDK

import { submitVote } from "../voter"

class VoteComponent {
  constructor({ electionUniqueId, voterPhrase }) {
    this.electionUniqueId = electionUniqueId;
    this.voterPhrase = voterPhrase;
  }

  async bindEvents({
    onBindSubmitButton,
    onStart,
    onBallotSubmission,
    onFinish,
    onBindVerifyBallotButton,
    onVerifyBallot,
    onVerifyComplete,
    onClose,
    onInvalid
  }) {
    onBindSubmitButton(async () => {
      onStart();
      onBallotSubmission(
        (vote) => {
          console.log(vote);
          this.submit(vote).then((ballot) => {
            console.log(ballot);
            onFinish();
          });
        },
        () => {
          onInvalid();
        }
      );
    });
  }
  async submit(vote) {
    console.log("Submiting vote to Vocdoni API with:");
    console.log("- ELECTION ID => ", this.electionUniqueId);
    console.log("- WALLET => ", this.voterPhrase);
    console.log("- VALUE => ", vote);
    const voteHash = await submitVote(this.electionUniqueId, this.voterPhrase, vote);

    return {
      vote: vote,
      voteHash: voteHash,
    };
  }
}

export default function setupVoteComponent($voteWrapper) {
  const voterPhrase = $voteWrapper.data("voterPhrase");
  const electionUniqueId = $voteWrapper.data("electionUniqueId");

  return new VoteComponent({
    electionUniqueId,
    voterPhrase
  });
}

window.Decidim = window.Decidim || {};
window.Decidim.setupVoteComponent = setupVoteComponent;
