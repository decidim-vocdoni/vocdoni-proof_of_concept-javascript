// A vote component, to send the real votes to the Vocdoni API, using the Vocdoni SDK

import { submitVote } from "../voter"

export class VoteComponent {
  constructor({ electionUniqueId, wallet }) {
    this.electionUniqueId = electionUniqueId;
    this.wallet = wallet;
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

            if (ballot.status == "OK") {
              onFinish(ballot.voteId);
            } else {
              onInvalid();
            }
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
    console.log("- WALLET => ", this.wallet);
    console.log("- VALUE => ", vote);
    const response = await submitVote(this.electionUniqueId, this.wallet, vote);

    return response;
  }
}
