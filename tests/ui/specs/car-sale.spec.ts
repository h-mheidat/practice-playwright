// Alphabetical Sorter
import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { PostsPage } from './../pages/posts-list-page';
import { AdsPage } from '../pages/ads-page';
import { handleNewPage } from '../../utils/page-handler';
import carData from '../../data/car-sale-data';

const pageURL: string = process.env.URL!;
let homePage: HomePage;
let postsPage: PostsPage;
let adsPage: AdsPage;

test.beforeEach(async ({ page }) => {
  await page.goto(pageURL);
  homePage = new HomePage(page);
  // why we can not declaration the homePage here?
  // like `let homePage = new HomePage(page)`
  postsPage = new PostsPage(page);
  adsPage = new AdsPage(page);
  await homePage.autosIcon.click();
  await homePage.carSaleIcon.click();
  await homePage.fillInputAndClick(carData[0].make, homePage.carMakeInput);
  await homePage.fillInputAndClick(carData[0].model, homePage.carModelInput);
});

test.describe('Filter cars for sale tests', () => {

  test('Verify the ability to filter cars by thier make and model', async () => {
    await postsPage.checkListingDetails(`${carData[0].make} , ${carData[0].model}`);
  });

  test('Verify that the first filterd product is premium or turbo', async () => {
    await postsPage.checkTurboOrPremium();
  });

  test('Verify the ability to filter cars by thier year', async ({ page }) => {
    await homePage.fillInputAndClick(carData[0].fromYear, homePage.fromYearInput);
    await homePage.fillInputAndClick(carData[0].toYear, homePage.toYearInput, /\/2018/);
    await page.reload();
    await postsPage.checkListingDetails(carData[0].fromYear);
  });

  test('Verify the ability to filter cars by thier location', async ({ page }) => {
    await homePage.viewMoreButton.click();
    await homePage.fillInputAndClick(carData[0].city, homePage.carCityInput);
    const productPage = await handleNewPage(page, postsPage);
    await expect(productPage.productCity).toHaveText(carData[0].city, { ignoreCase: true });
  })

  test('Verify the ability to filter cars by thier color', async ({ page }) => {
    await homePage.viewMoreButton.click();
    await homePage.fillInputAndClick(carData[0].color, homePage.carColorInput, /Car_Color/);
    const productPage = await handleNewPage(page, postsPage);
    await expect(productPage.productColor).toHaveText(carData[0].color, { ignoreCase: true });
  })

});
// Extra lines