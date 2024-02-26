// Alphabetical Sorter
import { Page } from '@playwright/test';
import { ProductPage } from '../ui/pages/product-page';
import { PostsPage } from '../ui/pages/posts-list-page';

// I like It but add JS Docs here and in the all methds
// see https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/
export async function handleNewPage(page: Page, postsPage: PostsPage): Promise<ProductPage> {
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        postsPage.firstListingPost.click(),
    ]);
    return new ProductPage(newPage);
}
