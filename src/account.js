/* Show the account information in a description list (<DL>) with the "js-account-information" HTML class
 * @param {Object} accountInformation The account information with the key and value
 *   The object keys that we want to show must correspond with the key in the DD markup (<dd data-account="key"></dd>)
 * @returns {void}
 */
export const showAccountInfo = (accountInformation) => {
  const accountInformationDescription = document.querySelector(".js-account-information");
  accountInformationDescription.classList.toggle("hide");
  accountInformationDescription.querySelectorAll("dd").forEach((element) => {
    element.innerHTML = accountInformation[element.dataset["account"]];
  })
}

