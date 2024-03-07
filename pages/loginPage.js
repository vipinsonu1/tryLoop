import { expect } from "@playwright/test";
import { URL_DETAILS } from "../utils/Urls.js";

class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]"
    );
    this.password = page.locator("//input[@type='password']");
    this.table = page.locator("table.MuiTable-root");
  }
  async gotoUrl() {
    await this.page.goto("https://app.tryloop.ai/login/password");
    await expect
      .soft(
        this.page.locator(
          'xpath = //h4[text() ="Log in with email and password"]'
        )
      )
      .toContainText("Log in with email and password");
  }

  async login(email, pass) {
    await this.page.getByTestId("login-email").click();
    await this.email.fill(email);
    await this.password.fill(pass);
    await this.page.getByTestId("login-button").click();
   
  }
  async gotoChargeBack() {
    await this.page.goto("https://app.tryloop.ai/chargebacks/stores/view");
    await this.page.waitForSelector("table");
    await this.page.waitForTimeout(20000);
  }
  async webtable() {
    const table = await this.table;
    const column = await table.locator("thead tr th");
    console.log("Column ", await column.count());
    let rows = table.locator("tbody tr");
    console.log("rows in table ", await rows.count());

    for (let i = 2; i < (await column.count()) - 1; i++) {
      await this.page.reload();
      await this.page.waitForTimeout(4000);
      await this.page
        .locator("(//div[contains(@class,'MuiSelect-select')])[2]")
        .click();
      await this.page.waitForSelector(`th:nth-child(${i}) h6`);
      await this.page.locator("li[data-value='50']").click();
      await this.page.waitForTimeout(4000);
      await this.page.waitForSelector(`th:nth-child(${i}) h6`);
      const monthName = await table
        .locator(`th:nth-child(${i}) h6`)
        .textContent();
      console.log("Column wise month data :  ", monthName);
      let b = 0;
      let isNextPageEnabled = true;
      do {
        for (let j = 1; j < (await rows.count()) - 1; j++) {
          let text = await this.page
            .locator(`tbody tr:nth-child(${j}) td:nth-child(${i}) h6`)
            .textContent();
          //console.log("value of  : ", +j + " and value of i:  ", i);
          let a = parseFloat(text.split("$")[1]);
          console.log("value is :  ", a);
          b = b + a;
        }
        await this.page.waitForTimeout(2000);
        const nextPageButton = await this.page.getByTestId("pagination-next");
        isNextPageEnabled = await nextPageButton.isEnabled();
        if (isNextPageEnabled) {
          await nextPageButton.click();
          await this.page.waitForTimeout(3000); // Adjust wait time as needed
        }
        //console.log(`Gross Sum: ${parseFloat(b.toFixed(2))} for column: ${i}`);
      } while (isNextPageEnabled);
      let GrossTotal = parseFloat(b.toFixed(2));
      console.log(`Gross Sum: ${GrossTotal} for Column: ${i}`);

      let total;
      let GrandTotal;
      switch (i) {
        case 2:
          total = await this.page
            .locator(
              `(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`
            )
            .textContent();
          GrandTotal = parseFloat(total.replace(/[$,]/g, ""));
          expect.soft(GrossTotal).toBe(GrandTotal);
          break;
        case 3:
          total = await this.page
            .locator(
              `(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`
            )
            .textContent();
          GrandTotal = parseFloat(total.replace(/[$,]/g, ""));
          expect.soft(GrossTotal).toBe(GrandTotal);
          console.log("coloum : ", i + "  " + GrandTotal);
          break;
        case 4:
          total = await this.page
            .locator(
              `(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`
            )
            .textContent();
          GrandTotal = parseFloat(total.replace(/[$,]/g, ""));
          expect.soft(GrossTotal).toBe(GrandTotal);
          console.log("coloum : ", i + "  " + GrandTotal);
          break;
        case 5:
          total = await this.page
            .locator(
              `(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`
            )
            .textContent();
          GrandTotal = parseFloat(total.replace(/[$,]/g, ""));
          expect.soft(GrossTotal).toBe(GrandTotal);
          break;
        case 6:
          total = await this.page
            .locator(
              `(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`
            )
            .textContent();
          GrandTotal = parseFloat(total.replace(/[$,]/g, ""));
          expect.soft(GrossTotal).toBe(GrandTotal);
          break;
        case 7:
          total = await this.page
            .locator(
              `(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`
            )
            .textContent();
          GrandTotal = parseFloat(total.replace(/[$,]/g, ""));
          expect.soft(GrossTotal).toBe(GrandTotal);
          break;
        case 8:
          total = await this.page
            .locator(
              `(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`
            )
            .textContent();
          GrandTotal = parseFloat(total.replace(/[$,]/g, ""));
          expect.soft(GrossTotal).toBe(GrandTotal);
        default:
          GrandTotal = "Oh No";
      }

      await this.page.waitForTimeout(4000);
    }
  }
}
export default LoginPage;
