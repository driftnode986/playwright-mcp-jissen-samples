import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly cartCount: Locator;
  readonly productList: Locator;

  constructor(public readonly page: Page) {
    this.searchBox = page.getByRole('searchbox', { name: '検索ワード' });
    this.searchButton = page.getByRole('button', { name: '検索' });
    this.cartCount = page.locator('#cart-count');
    this.productList = page.getByRole('list', { name: '商品一覧' });
  }

  async goto() {
    const url = pathToFileURL(
      path.resolve(__dirname, '..', 'apps', 'shop.html'),
    ).toString();
    await this.page.goto(url);
  }

  async search(keyword: string) {
    await this.searchBox.fill(keyword);
    await this.searchButton.click();
  }

  async addToCartByName(productName: string) {
    const button = this.page.getByRole('button', {
      name: `${productName}をカートに追加`,
    });
    await button.click();
  }

  async addToCartByTestId(productId: string) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }
}
