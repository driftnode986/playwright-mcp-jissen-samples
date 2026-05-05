import { test as base, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { ProductPage } from './pages/ProductPage.js';
import { HybridProductPage } from './pages/HybridProductPage.js';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedDashboardPage: DashboardPage;
  productPage: ProductPage;
  hybridProductPage: HybridProductPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await use(dashboardPage);
  },

  authenticatedDashboardPage: async ({ page }, use) => {
    await page.addInitScript(() => {
      localStorage.setItem('demo-auth-email', 'user@example.com');
    });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await use(dashboardPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await use(productPage);
  },

  hybridProductPage: async ({ page }, use) => {
    const hybridProductPage = new HybridProductPage(page);
    await hybridProductPage.goto();
    await use(hybridProductPage);
  },
});

export { expect };
