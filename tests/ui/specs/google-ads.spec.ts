import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { AdsPage } from '../pages/ads-page';

const pageURL: string = process.env.URL!;
let homePage: HomePage;
let adsPage: AdsPage;

test.beforeEach(async ({ page }) => {
  await page.goto(pageURL);
  homePage = new HomePage(page);
  adsPage = new AdsPage(page);
  await homePage.autosIcon.click();
  await homePage.carSaleIcon.click();
});

test.describe('Google Advertisements tests', () => {

  test.skip('Verify the ability to display middle advertisement within the filtered products list', async () => {
    await adsPage.waitForAdsToLoad();
    await expect(adsPage.middleGoogleAds).toBeVisible();
  })

  test('Verify the ability to display side advertisement under the filter bar section', async () => {
    await adsPage.waitForAdsToLoad();
    await expect(adsPage.sideGoogleAds).toBeVisible();
  })

});



