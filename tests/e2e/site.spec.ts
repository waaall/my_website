import { expect, test } from '@playwright/test';

test.describe('Astro blog critical paths', () => {
  test('首页、文章页和语言切换可用', async ({ page }) => {
    await page.goto('/zh');
    await expect(page).toHaveTitle(/ZX博客/);
    await expect(page.getByRole('heading', { name: '最近文章' })).toBeVisible();

    await page.goto('/zh/posts/hello-world');
    await expect(page.getByRole('heading', { name: '你好，世界' })).toBeVisible();
    await expect(page.locator('[data-toc-root]')).toBeVisible();

    await page.locator('.site-header__lang-desktop .lang-switch').click();
    await expect(page).toHaveURL(/\/en\/posts\/hello-world$/);
    await expect(page.getByRole('heading', { name: 'Hello, world' })).toBeVisible();
  });

  test('主题切换写入 data-theme', async ({ page }) => {
    await page.goto('/zh');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.locator('.theme-switch').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.locator('.theme-switch').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('窄屏 TOC 可打开并用 ESC 关闭', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/zh/posts/hello-world');

    const toc = page.locator('[data-toc-root]');
    await page.locator('[data-toc-toggle]').click();
    await expect(toc).toHaveAttribute('data-open', 'true');

    await page.keyboard.press('Escape');
    await expect(toc).toHaveAttribute('data-open', 'false');
  });

  test('窄屏导航折叠为汉堡菜单', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/zh');

    const trigger = page.locator('[data-menu-trigger]');
    const menu = page.locator('[data-mobile-menu]');
    await expect(trigger).toBeVisible();
    await expect(page.locator('.site-header__nav')).toBeHidden();

    await trigger.click();
    await expect(menu).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(menu.getByRole('link', { name: '作品集' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('Pagefind 搜索按当前语言返回结果', async ({ page }) => {
    await page.goto('/zh');
    await page.locator('[data-search-trigger]').click();
    await page.locator('[data-search-input]').fill('世界');
    await expect(page.locator('.search-result__title').first()).toContainText('你好，世界');

    await page.goto('/en');
    await page.locator('[data-search-trigger]').click();
    await page.locator('[data-search-input]').fill('world');
    await expect(page.locator('.search-result__title').first()).toContainText(/Hello, World/i);
  });

  test('Pagefind 快速连续输入只保留最新查询结果', async ({ page }) => {
    await page.goto('/en');
    await page.locator('[data-search-trigger]').click();

    const input = page.locator('[data-search-input]');
    await input.fill('world');
    await input.fill('logic');

    await expect(input).toHaveValue('logic');
    await expect(page.locator('.search-result__title').first()).toContainText(
      /Three Questions on Logic/i,
    );
    await page.waitForTimeout(500);
    await expect(page.locator('.search-result__title').first()).toContainText(
      /Three Questions on Logic/i,
    );
  });
});
