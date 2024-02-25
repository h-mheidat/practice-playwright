import { type Locator, type Page, expect } from '@playwright/test';

export class PostsPage {
    readonly page: Page;
    readonly firstListingPost: Locator;
    readonly premiumIcon: Locator;
    readonly turboIcon: Locator;
    readonly listingDetails: Locator;


    constructor(page: Page) {
        this.page = page;
        this.firstListingPost = page.locator('#serpMainContent > div:nth-child(2) > a');
        this.premiumIcon = page.locator('#serpMainContent > div:nth-child(2) svg[data-name="iconPremium"]');
        this.turboIcon = page.locator('#serpMainContent > div:nth-child(2) svg[data-name="iconTurbo"]');
        this.listingDetails = page.locator('div.postDet > div:nth-child(2)');

    };

    async checkTurboOrPremium() {
        await this.firstListingPost.waitFor({ state: 'visible' });
        const premiumIconVisible = await this.premiumIcon.isVisible();
        const turboIconVisible = await this.turboIcon.isVisible();
        if (premiumIconVisible || turboIconVisible) {
            expect(true).toBeTruthy();
        } else {
            expect(false).toBeTruthy();
        }
    };

    async checkListingDetails(element: string) {
        const listItems = await this.listingDetails.all();
        const elementLowerCase = element.toLowerCase();
        for (const li of listItems) {
            const textContent = await li.textContent();
            const textContentLowerCase = textContent?.toLowerCase();
            expect(textContentLowerCase).toContain(elementLowerCase);
        }
    }
}

export default PostsPage;