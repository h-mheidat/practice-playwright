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
// You already Export It in line 3
export default ProductPage;
