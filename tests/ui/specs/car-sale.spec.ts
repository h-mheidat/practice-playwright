import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { PostsPage } from './../pages/posts-list-page';
import { AdsPage } from '../pages/ads-page';
import { handleNewPage } from '../../utils/page-handler';

const pageURL: string = process.env.URL!;
let homePage: HomePage;
let postsPage: PostsPage;
let adsPage: AdsPage;

test.beforeEach(async ({ page }) => {
  await page.goto(pageURL);
  homePage = new HomePage(page);
  postsPage = new PostsPage(page);
  adsPage = new AdsPage(page);
  await homePage.autosIcon.click();
  await homePage.carSaleIcon.click();

  await homePage.fillInputAndClick("ford", homePage.carMakeInput);
  await page.waitForURL(/ford/, { waitUntil: 'load' });

  await homePage.fillInputAndClick("fusion", homePage.carModelInput);
  await page.waitForURL(/fusion/, { waitUntil: 'load' });
});

test.describe('Filter cars for sale tests', () => {

  test('Verify the ability to filter cars by thier make and model', async () => {
    await postsPage.checkListingDetails("Ford , Fusion");
  });

  test('Verify that the first filterd product is premium or turbo', async () => {
    await postsPage.checkTurboOrPremium();
  });

  test('Verify the ability to filter cars by thier year', async ({ page }) => {

    await homePage.fillInputAndClick("2018", homePage.fromYearInput);
    await page.waitForURL(/Car_Year_from/, { waitUntil: 'load' });

    await homePage.fillInputAndClick("2018", homePage.toYearInput);
    await page.waitForURL(/\/2018/, { waitUntil: 'load' });
    
    await page.reload();
    await postsPage.checkListingDetails("2018");
  });

  test('Verify the ability to filter cars by thier location', async ({ page }) => {
    await homePage.viewMoreButton.click();

    await homePage.fillInputAndClick("Amman", homePage.carCityInput);;
    await page.waitForURL(/amman/, { waitUntil: 'commit' });

    const productPage = await handleNewPage(page, postsPage);
    await expect(productPage.productCity).toHaveText('Amman');
  })

  test('Verify the ability to filter cars by thier color', async ({ page }) => {
    await homePage.viewMoreButton.click();

    await homePage.fillInputAndClick("Black", homePage.carColorInput);;
    await page.waitForURL(/Car_Color/, { waitUntil: 'commit' });

    const productPage = await handleNewPage(page, postsPage);
    await expect(productPage.productColor).toHaveText('Black');
  })

});



