import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Page, Locator } from '@playwright/test';

/**
 * 純 POM. ローカル apps/todomvc.html を対象に実装。
 * 自社プロジェクトでは page.goto を staging URL に置き換える。
 */
export class TodoPage {
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly toggleAll: Locator;
  readonly clearCompleted: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;

  constructor(public readonly page: Page) {
    this.newTodoInput = page.getByRole('textbox', { name: 'New todo input' });
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.locator('.todo-count strong');
    this.toggleAll = page.getByRole('checkbox', { name: 'Mark all as complete' });
    this.clearCompleted = page.getByRole('button', { name: 'Clear completed' });
    this.filterAll = page.getByRole('link', { name: 'All', exact: true });
    this.filterActive = page.getByRole('link', { name: 'Active', exact: true });
    this.filterCompleted = page.getByRole('link', { name: 'Completed', exact: true });
  }

  async goto() {
    const url = pathToFileURL(
      path.resolve(__dirname, '..', 'apps', 'todomvc.html'),
    ).toString();
    await this.page.goto(url);
  }

  async addTodo(title: string) {
    await this.newTodoInput.fill(title);
    await this.newTodoInput.press('Enter');
  }

  async toggleByTitle(title: string) {
    await this.page
      .getByRole('checkbox', { name: `Toggle ${title}` })
      .click();
  }

  async deleteByTitle(title: string) {
    await this.page
      .getByRole('button', { name: `Delete ${title}` })
      .click();
  }

  async editByTitle(oldTitle: string, newTitle: string) {
    await this.todoItems
      .filter({ hasText: oldTitle })
      .getByText(oldTitle)
      .dblclick();
    const editInput = this.page.getByRole('textbox', { name: `Edit ${oldTitle}` });
    await editInput.fill(newTitle);
    await editInput.press('Enter');
  }
}
