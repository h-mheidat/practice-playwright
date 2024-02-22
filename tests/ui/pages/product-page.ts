import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productCity: Locator;
    readonly productColor: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productCity = page.locator('a.City');
        this.productColor = page.locator('a.Color');
    }

}

export default ProductPage;