import { JSDOM } from "jsdom"

import { isWalletInstalled, getWallet } from "./wallet"

describe("isWalletInstalled", () => {
  let subject = isWalletInstalled();

  const content = `
    <div class="hide js-metamask-not-installed-message">Not installed</div>
  `;
  let dom = new JSDOM(content);
  let doc = dom.window.document;

  describe("not installed", () => {
    it("returns false", () => {
      expect(subject).toBeFalsy;
    });

    it("has the hide class", () => {
      expect(doc.querySelector(".js-metamask-not-installed-message").classList.contains("hide")).toBeTruthy;
    });
  });

  describe("installed", () => {
    beforeEach(() => {
      window.ethereum = jest.fn();
    });

    it("returns true", () => {
      expect(subject).toBeTruthy;
    });

    it("hasn't the hide class", () => {
      expect(doc.querySelector(".js-metamask-not-installed-message").classList.contains("hide")).toBeFalsy;
    });
  });

});

