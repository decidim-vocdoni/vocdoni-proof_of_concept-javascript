// A preview vote component, to try out the UI without actually sending any vote.

// The wait time used to simulate the submission of the vote during the preview
const FAKE_SUBMISSION_TIME = 1000;

export default class PreviewVoteComponent {
  constructor({ electionUniqueId}) {
    this.electionUniqueId = electionUniqueId;
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
    console.log("- VALUE => ", vote);

    return {
      vote: vote,
      voteHash: vote,
    };
  }
}

