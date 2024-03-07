import { test, locator, page, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage.js";
import {LOGIN_DETAILS} from"../utils/Constant.js"
import Transaction from "../pages/transactionspage.js";
import { readFileSync } from 'fs'
const fs = require('fs');

test.describe("Create category and article", () => {
  let page;
  test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      console.log("Before tests");
      const loginPage = new LoginPage(page);
      await loginPage.gotoUrl();
      await loginPage.login(LOGIN_DETAILS.EMAIL_ID, LOGIN_DETAILS.PASSWORD);
      await page.waitForTimeout(2000);
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
   
    await page.waitForSelector("//div//span[contains(@class,'MuiChip-label MuiChip-labelSmall')]");

    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
  
      return rows.map(row => {
        const cols = Array.from(row.querySelectorAll('td'));
        return cols.map(col => col.innerText);
      });
    });
    let csvContent = 'order_id,location,Order_State,Type,Lost_Sale,Net_Payout,Payout_ID,Payout_Date \n';
    data.forEach(row => {
      const [order_id,location,Order_State,Type,Lost_Sale,Net_Payout,Payout_ID,Payout_Date] = row;
      csvContent += `${order_id},${location},${Order_State},${Type},${Lost_Sale},${Net_Payout},${Payout_ID},${Payout_Date}\n`;
    });
    fs.writeFileSync('transactions.csv', csvContent);
  
    console.log('CSV file generated successfully.');
});
test("Verified Bonus Task", async () => {
    const originalContent = fs.readFileSync('/Users/vipinpandey/Documents/Tryloop/tryLoop/data/chargebacks_payouts_overview.csv', 'utf-8');
    const downloadedContent = fs.readFileSync('/Users/vipinpandey/Documents/Tryloop/tryLoop/transactions.csv', 'utf-8');
    const originalLines = originalContent.trim().split('\n');
    const downloadedLines = downloadedContent.trim().split('\n');
    if (originalLines.length !== downloadedLines.length) {
      console.log('CSV files have different number of lines.');
      return;
    }
    for (let i = 0; i < originalLines.length; i++) {
      if (originalLines[i] !== downloadedLines[i]) {
        console.log(`Difference found in line ${i + 1}:`);
        console.log('Original:', originalLines[i]);
        console.log('Downloaded:', downloadedLines[i]);
      }
    }
  });
});