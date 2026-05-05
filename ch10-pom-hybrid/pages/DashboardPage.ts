import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly userEmail: Locator;
  readonly shopLink: Locator;
  readonly ordersKpi: Locator;
  readonly cartKpi: Locator;

  constructor(public readonly page: Page) {
    this.userEmail = page.locator('#user-email');
    this.shopLink = page.getByTestId('nav-shop');
    this.ordersKpi = page.getByTestId('kpi-orders');
    this.cartKpi = page.getByTestId('kpi-cart');
  }

  async goto() {
    const url = pathToFileURL(
      path.resolve(__dirname, '..', 'apps', 'dashboard.html'),
    ).toString();
    await this.page.goto(url);
  }

  async openShop() {
    await this.shopLink.click();
  }
}
