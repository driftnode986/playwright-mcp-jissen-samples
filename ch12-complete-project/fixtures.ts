import { test as base, expect } from '@playwright/test';
import { TodoPage } from './pages/TodoPage.js';
import { HybridTodoPage } from './pages/HybridTodoPage.js';

type Fixtures = {
  todoPage: TodoPage;
  hybridTodoPage: HybridTodoPage;
};

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },

  hybridTodoPage: async ({ page }, use) => {
    const hybridTodoPage = new HybridTodoPage(page);
    await hybridTodoPage.goto();
    await use(hybridTodoPage);
  },
});

export { expect };
