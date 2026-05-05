import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;
  readonly welcomeHeading: Locator;

  constructor(public readonly page: Page) {
    this.emailInput = page.getByRole('textbox', { name: 'メールアドレス' });
    this.passwordInput = page.getByLabel('パスワード');
    this.submitButton = page.getByRole('button', { name: 'ログイン' });
    this.errorAlert = page.getByRole('alert');
    this.welcomeHeading = page.getByRole('heading', { name: /ようこそ/ });
  }

  async goto() {
    const url = pathToFileURL(
      path.resolve(__dirname, '..', 'apps', 'login.html'),
    ).toString();
    await this.page.goto(url);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
