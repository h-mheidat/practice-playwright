import { Page } from '@playwright/test';
import { ProductPage } from '../ui/pages/product-page';
import { PostsPage } from '../ui/pages/posts-list-page';

export async function handleNewPage(page: Page, postsPage: PostsPage): Promise<ProductPage> {

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        postsPage.firstListingPost.click(),
    ]);
    return new ProductPage(newPage);
}
