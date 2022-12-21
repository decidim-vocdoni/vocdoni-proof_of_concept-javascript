// A preview vote component, to try out the UI without actually sending any vote.

// The wait time used to simulate the submission of the vote during the preview
const FAKE_SUBMISSION_TIME = 1000;

class PreviewVoteComponent {
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
          console.log("VOTE => ", vote);
          this.fakeSubmission(vote).then((ballot) => {
            console.log("BALLOT => ", ballot);
            onFinish();
          });
        },
        () => {
          onInvalid();
        }
      );
    });
  }
  async fakeSubmission(vote) {
    await new Promise((resolve) => setTimeout(resolve, FAKE_SUBMISSION_TIME));

    console.log("Fake submitting a fake preview vote...");
    console.log("- ELECTION ID => ", this.electionUniqueId);
    console.log("- WALLET => ", this.voterPhrase);
    console.log("- VALUE => ", vote);

    return {
      vote: vote,
      voteHash: vote,
    };
  }
}

export default function setupVoteComponent($voteWrapper) {
  const voterPhrase = $voteWrapper.data("voterPhrase");
  const electionUniqueId = $voteWrapper.data("electionUniqueId");

  return new PreviewVoteComponent({
    electionUniqueId,
    voterPhrase
  });
}

window.Decidim = window.Decidim || {};
window.Decidim.setupVoteComponent = setupVoteComponent;

