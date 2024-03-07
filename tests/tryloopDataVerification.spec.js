import { test, locator, page, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage.js";
import {LOGIN_DETAILS} from"../utils/Constant.js"
import Transaction from "../pages/transactionspage.js";

test.describe("Create category and article", () => {
  let page;
  test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      console.log("Before tests");
      const loginPage = new LoginPage(page);
      await loginPage.gotoUrl();
      await loginPage.login(LOGIN_DETAILS.EMAIL_ID, LOGIN_DETAILS.PASSWORD);
      test.setTimeout(120000);
  });

test("Verified grand total", async () => {
  const loginPage = new LoginPage(page);
    await loginPage.gotoChargeBack();
    await loginPage.webtable();
});
test("Verified transction section", async () => {
    const tranPage = new Transaction(page);
    await tranPage.gotoTransationUrl();
    await tranPage.applyLocationFilter();
    await tranPage.applyMarketplaceFilter();
    await tranPage.selectPerPage();
    const table = await page.locator("//table[contains(@class,'MuiTable-root')]");
    const collum = await table.locator("thead tr th");
    console.log("Collum :  ", await collum.count());
    const rows = await table.locator("tbody tr");
    console.log("Rows are :  ", await rows.count());
   

    const rowMatch = rows.filter({
        has: page.locator("td div span"),
        hasText: [''],
    });
    for (let i = 0; i < (await rowMatch.count()); i++) {
        const rowdata = await rowMatch
            .locator("td div span")
            .nth(i)
            .textContent();
        console.log("adasdad :  ", rowdata);
    }

});
});