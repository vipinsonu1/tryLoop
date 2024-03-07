import { test, locator, page, expect } from "@playwright/test";
test("test varification", async ({ page }) => {
  await page.goto("https://app.tryloop.ai/login/password");
  await page.getByTestId("login-email").click();
  await page
    .locator(
      "(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]"
    )
    .fill("qa-engineer-assignment@test.com");
  await page.locator("//input[@type='password']").fill("QApassword123$");
  await page.getByTestId("login-button").click();
  await page.waitForTimeout(2000);
  await page.goto("https://app.tryloop.ai/chargebacks/stores/view");
  await page.waitForSelector("table");
  await page.waitForTimeout(20000);
  //const months = ['Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'];
  await page.waitForSelector("table");
  const table = await page.locator("table.MuiTable-root");
  const column = await table.locator("thead tr th");
  console.log("Column ", await column.count());
  let rows = table.locator("tbody tr");
  console.log("rows in table ", await rows.count());
  
    for (let i = 2; i < (await column.count()) - 1; i++) {
      await page.reload();
      await page.waitForTimeout(4000);
      await page.locator("(//div[contains(@class,'MuiSelect-select')])[2]").click();
      await page.waitForSelector(`th:nth-child(${i}) h6`);
      await page.locator("li[data-value='50']").click();
      await page.waitForTimeout(4000);
      await page.waitForSelector(`th:nth-child(${i}) h6`);
      const monthName = await table.locator(`th:nth-child(${i}) h6`).textContent();
      console.log("Column wise month data :  ", monthName);
      let b = 0;
      let isNextPageEnabled = true;
      do {
      for (let j = 1; j < (await rows.count()) - 1; j++) {
        let text = await page
          .locator(`tbody tr:nth-child(${j}) td:nth-child(${i}) h6`)
          .textContent();
        let a = parseFloat(text.split("$")[1]);
        console.log("value is :  ", a);
        b = (b + a); 
      }
    await page.waitForTimeout(2000);
    const nextPageButton = await page.getByTestId("pagination-next");
    isNextPageEnabled = await nextPageButton.isEnabled();
    if (isNextPageEnabled) {
      await nextPageButton.click();
      await page.waitForTimeout(3000); // Adjust wait time as needed
    }
    //console.log(`Gross Sum: ${parseFloat(b.toFixed(2))} for column: ${i}`);
  } 
  while (isNextPageEnabled);
  let GrossTotal=parseFloat(b.toFixed(2));
  console.log(`Gross Sum: ${GrossTotal} for Column: ${i}`);
 
  let total;
  let GrandTotal;
switch (i) {
  case 2:
    console.log(await page.locator(`(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`).textContent());
    total =await page.locator(`(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`).textContent();
    GrandTotal = parseFloat(total.replace(/[$,]/g, ''));
    expect.soft(GrossTotal).toBe(GrandTotal);
    break;
  case 3:
    total = await page.locator(`(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`).textContent();
    GrandTotal = parseFloat(total.replace(/[$,]/g, ''));
    expect.soft(GrossTotal).toBe(GrandTotal);
    console.log("coloum : ",i +"  "+  GrandTotal)
    break;
  case 4:
    total = await page.locator(`(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`).textContent();
    GrandTotal = parseFloat(total.replace(/[$,]/g, ''));
    expect.soft(GrossTotal).toBe(GrandTotal);
    console.log("coloum : ",i +"  "+  GrandTotal)
    break;
  case 5:
    total = await page.locator(`(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`).textContent();
    GrandTotal = parseFloat(total.replace(/[$,]/g, ''));
    expect.soft(GrossTotal).toBe(GrandTotal);
    break;
  case 6:
    total = await page.locator(`(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`).textContent();
    GrandTotal = parseFloat(total.replace(/[$,]/g, ''));
    expect.soft(GrossTotal).toBe(GrandTotal);
    break;
  case 7:
    total = await page.locator(`(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`).textContent();
    GrandTotal = parseFloat(total.replace(/[$,]/g, ''));
    expect.soft(GrossTotal).toBe(GrandTotal);
    break;
  case  8:
    total = await page.locator(`(//tr[contains(@class,'MuiTableRow-root')])[11]//td[${i}]//h6`).textContent();
    GrandTotal = parseFloat(total.replace(/[$,]/g, ''));
    expect.soft(GrossTotal).toBe(GrandTotal);
    default:
      GrandTotal = "Oh No";
}

  await page.waitForTimeout(4000);
}
});
