import { expect } from "@playwright/test";
import { URL_DETAILS } from "../utils/Urls.js";

class Transaction {
  constructor(page) {
    this.page = page;
    this.locationLocator= page.getByTestId("selectBtn");
    this.clearLocattor= page.locator("//button[text()='Clear']");
    this.selectArtisanLocator =page.locator("//div//p[text()='Artisan Alchemy']");
    this.selectBlissfulLocator=page.locator("//div//p[text()='Blissful Buffet']")
    this.applyBtnLocator=page.getByTestId("applyBtn");
    this.marketPlaceLocator =page.locator("//span[text()='Marketplaces']")
    this.grubhubLocator=page.locator("//div//p[text()='Grubhub']");
    this.rowPerPage= page.locator("(//div[contains(@class,'MuiSelect-select')])");
    this.selectrows= page.locator("li[data-value='20']");

  }
  async gotoTransationUrl() {
    await this.page.goto(URL_DETAILS.TRANSACTION_URL);
  }
async applyLocationFilter(){
    await this.locationLocator.click();
    await this.clearLocattor.click();
    await this.selectArtisanLocator.click();
    await this.selectBlissfulLocator.click();
    await this.applyBtnLocator.click();
}
async applyMarketplaceFilter(){
    await this.marketPlaceLocator.click();
    await this.clearLocattor.click();
    await this.grubhubLocator.click();
    await this.applyBtnLocator.click();
}
async selectPerPage(){
    await this.rowPerPage.click();
    await this.selectrows.click();
}
}
export default Transaction;
