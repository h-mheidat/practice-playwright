import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly autosIcon: Locator;
    readonly carSaleIcon: Locator;
    readonly carMakeInput: Locator;
    readonly firstListOption: Locator;
    readonly carModelInput: Locator;
    readonly viewMoreButton: Locator;
    readonly carColorInput: Locator;
    readonly fromYearInput: Locator;
    readonly toYearInput: Locator;
    readonly carCityInput: Locator;


    constructor(page: Page) {
        this.page = page;
        this.autosIcon = page.getByRole('link', { name: 'Category: Autos Autos' });
        this.carSaleIcon = page.getByRole('link', { name: 'Cars For Sale Cars For Sale' });
        this.fromYearInput = page.getByPlaceholder('From');
        this.toYearInput = page.getByPlaceholder('To');
        this.carMakeInput = page.getByPlaceholder('Search For Car Make');
        this.carModelInput = page.getByPlaceholder('Search For Model');
        this.carColorInput = page.getByPlaceholder('Search For Color');
        this.carCityInput = page.getByPlaceholder('Search For  City');
        this.firstListOption = page.locator('ul.dropdownContent > li:first-child');
        this.viewMoreButton = page.locator('#viewMoreButton');
    }

    async fillInputAndClick(text: string, locator: Locator, path?: RegExp) {
        await locator.click();
        await locator.fill(text);
        await this.firstListOption.click();
        if (!path) {
            path = new RegExp(text);
        };
        await this.page.waitForURL(path, { waitUntil: 'commit' });
    }
}

export default HomePage;