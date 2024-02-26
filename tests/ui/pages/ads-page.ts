import { type Locator, type Page } from '@playwright/test';

export class AdsPage {
    // Alphabetical Sorter
    readonly page: Page;
    readonly middleGoogleAds: Locator;
    readonly sideGoogleAds: Locator;

    constructor(page: Page) {
        this.page = page;
        this.middleGoogleAds = page.locator('iframe[id^="google_ads_iframe_/1082751/desktop_serp_mid_"]');
        this.sideGoogleAds = page.locator('iframe[id^="google_ads_iframe_/1082751/desktop_serp_side_"]');
    }

    async waitForAdsToLoad() {
        return new Promise<void>((resolve) => {
            this.page.on('response', async response => {
                const url = response.url();
                if (url.startsWith("https://www.google.com/ads")) {
                    // console.log(`Response from Google Ads: ${url}`);
                    // remove the log please.
                    resolve();
                }
            });
        });
    }


}

export default AdsPage;
// new line in the end of the all files.
