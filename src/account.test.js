import { showAccountInfo } from "./account"

describe("showAccountInfo", () => {
  const accountInformation = {
    address: "0x123456789",
    balance: 1000
  };
  const content = `
    <dl class="hide js-account-information">
      <dt>Address</dt>
      <dd data-account="address"></dd>
      <dt>Balance</dt>
      <dd data-account="balance"></dd>
    </dl>
  `;
  document.body.innerHTML = content
  const expected_content = `
    <dl class="js-account-information">
      <dt>Address</dt>
      <dd data-account="address">0x123456789</dd>
      <dt>Balance</dt>
      <dd data-account="balance">1000</dd>
    </dl>
  `;
  const subject = showAccountInfo(accountInformation);

  it("has the hide class", () => {
    expect(document.querySelector(".js-account-information").classList.contains("hide")).toBeTruthy;
  });

  it("updates the DOM", () => {
    expect(document.body.innerHTML).toEqual(expected_content);
  });
});
