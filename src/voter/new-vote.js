/* eslint-disable no-console */
import VoteQuestionsComponent from "./vote_questions.component";
// The voting component might come from set-preview.js or setup-vote.js, it depends if it's a preview
// so in the view template we load the component and attach it to window
const { setupVoteComponent } = window.Decidim;

$(async () => {
  // UI Elements
  const $voteWrapper = $(".vote-wrapper");

  // Use the questions component
  const questionsComponent = new VoteQuestionsComponent($voteWrapper);
  questionsComponent.init();
  $(document).on("on.zf.toggler", () => {
    // On some ocassions, when adding the Identification step in the same document,
    // the $currentStep isn't set correctly
    //
    // Adding a slight delay works as a workaround
    setTimeout(() => {
      // continue and back btn
      questionsComponent.init();
    }, 100);
  });

  // Get the vote component and bind it to all UI events
  const voteComponent = setupVoteComponent($voteWrapper);
  await voteComponent.bindEvents({
    onBindSubmitButton(onEventTriggered) {
      $(".button.confirm").on("click", onEventTriggered);
    },
    onStart() {},
    onBallotSubmission(validVoteFn) {
      const votes = new Array(
        $voteWrapper.
        find(".answer_input:checked").
        attr("value").
        replace("answer-", "")
      );
      validVoteFn(votes);
      questionsComponent.voteCasted = true;
    },
    onFinish() {
      $voteWrapper.find("#submitting").addClass("hide");
      $voteWrapper.find("#vote_sent").removeClass("hide");
    },
    onBindVerifyBallotButton(onEventTriggered) {
      $(".verify_ballot").on("click", onEventTriggered);
    },
    onVerifyBallot(auditedData, auditedDataFileName) {
      // TODO
      const vote = JSON.stringify(auditedData);
      const link = document.createElement("a");
      $voteWrapper.find(".button.cast_ballot").addClass("hide");
      $voteWrapper.find(".button.back").removeClass("hide");
      questionsComponent.voteCasted = true;

      link.setAttribute("href", `data:text/plain;charset=utf-8,${vote}`);
      link.setAttribute("download", auditedDataFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onVerifyComplete() {
      console.log("Verify completed");
    },
    onClose() {
      console.log("Voting finished");
    },
    onInvalid() {
      $voteWrapper.find("#submitting").addClass("hide");
      $voteWrapper.find("#vote_fail").removeClass("hide");
    }
  });
});
