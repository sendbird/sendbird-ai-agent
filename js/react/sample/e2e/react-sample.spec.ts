import { expect, test } from '@playwright/test';

test.describe('React Sample - Messenger Mounting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5174');
  });

  test('should load the React sample page with correct elements', async ({ page }) => {
    await expect(page).toHaveTitle('Sendbird AI Agent React Sample');
    await expect(page.locator('h1')).toContainText('Sendbird AI Agent React Sample');
    await expect(page.locator('button')).toContainText('Open Messenger');
  });

  test('should have messenger controls that respond to interactions', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open Messenger")');
    const sessionCheckbox = page.locator('input[type="checkbox"]').first();
    const contextCheckbox = page.locator('input[type="checkbox"]').last();

    // Test button toggle
    await openButton.click();
    await expect(openButton).toContainText('Close Messenger');

    await openButton.click();
    await expect(openButton).toContainText('Open Messenger');

    // Test checkboxes
    await sessionCheckbox.check();
    await expect(sessionCheckbox).toBeChecked();

    await contextCheckbox.check();
    await expect(contextCheckbox).toBeChecked();
  });

  test('should render AI Agent Messenger component in DOM', async ({ page }) => {
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Look for Sendbird messenger container elements that should be mounted
    // The exact selectors may vary based on the AI Agent Messenger implementation
    const messengerElements = [
      '[data-testid*="messenger"]',
      '[class*="sendbird"]',
      '[class*="messenger"]',
      '[id*="sendbird"]',
      '[id*="messenger"]',
    ];

    let messengerFound = false;
    for (const selector of messengerElements) {
      const element = page.locator(selector).first();
      if ((await element.count()) > 0) {
        messengerFound = true;
        break;
      }
    }

    // If messenger elements are not found in DOM, check if messenger CSS is loaded
    if (!messengerFound) {
      const stylesheets = await page.locator('link[rel="stylesheet"]').all();
      for (const stylesheet of stylesheets) {
        const href = await stylesheet.getAttribute('href');
        if (href && href.includes('ai-agent-messenger')) {
          messengerFound = true;
          break;
        }
      }
    }

    // The messenger component should be present in some form
    expect(messengerFound).toBeTruthy();
  });

  test('should not have JavaScript errors during initialization', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    await page.goto('http://localhost:5174');
    await page.waitForLoadState('networkidle');

    // Filter out network errors that might occur in test environment
    const criticalErrors = consoleErrors.filter(
      (error) => !error.includes('Failed to fetch') && !error.includes('NetworkError') && !error.includes('net::ERR_'),
    );

    expect(criticalErrors.length).toBe(0);
  });
});
