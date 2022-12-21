/* eslint-disable require-jsdoc */
// The wait time used to simulate the submission of the vote during the preview
const FAKE_SUBMISSION_TIME = 1000;

class PreviewVoteComponent {
  constructor({ electionUniqueId, voterUniqueId }) {
    this.electionUniqueId = electionUniqueId;
    this.voterUniqueId = voterUniqueId;
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
          this.fakeSubmission(vote).then((ballot) => {
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
  async fakeSubmission(vote) {
    await new Promise((resolve) => setTimeout(resolve, FAKE_SUBMISSION_TIME));

    return {
      vote: vote,
      voteHash: vote,
    };
  }
}

export default function setupVoteComponent($voteWrapper) {
  const voterUniqueId = $voteWrapper.data("voterId");
  const electionUniqueId = $voteWrapper.data("electionUniqueId");

  return new PreviewVoteComponent({
    electionUniqueId,
    voterUniqueId
  });
}

window.Decidim = window.Decidim || {};
window.Decidim.setupVoteComponent = setupVoteComponent;

