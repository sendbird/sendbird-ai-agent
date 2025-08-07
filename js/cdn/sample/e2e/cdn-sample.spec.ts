import { expect, test } from '@playwright/test';

test.describe('CDN Sample - Messenger Mounting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should load the CDN sample page with correct elements', async ({ page }) => {
    await expect(page).toHaveTitle('Sendbird AI Agent CDN Sample');
    await expect(page.locator('h1')).toContainText('Sendbird AI Agent CDN Sample');
    await expect(page.locator('#toggleMessenger')).toContainText('Open Messenger');
  });

  test('should have messenger controls that respond to interactions', async ({ page }) => {
    const toggleButton = page.locator('#toggleMessenger');
    const sessionToggle = page.locator('#sessionToggle');
    const contextToggle = page.locator('#contextToggle');

    // Wait for initialization
    await page.waitForTimeout(2000);

    // Test button toggle
    await toggleButton.click();
    await expect(toggleButton).toContainText('Close Messenger');

    await toggleButton.click();
    await expect(toggleButton).toContainText('Open Messenger');

    // Test checkboxes
    await sessionToggle.check();
    await expect(sessionToggle).toBeChecked();

    await contextToggle.check();
    await expect(contextToggle).toBeChecked();
  });

  test('should initialize messenger from CDN and mount in DOM', async ({ page }) => {
    // Listen for console logs to verify messenger initialization
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for CDN loading and initialization

    // Check if messenger initialization logs are present
    const hasInitLog = consoleLogs.some(
      (log) =>
        log.includes('Loading messenger') || log.includes('Messenger initialized') || log.includes('Messenger loaded'),
    );

    expect(hasInitLog).toBeTruthy();

    // Look for messenger elements in DOM (similar to React test)
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

    // Verify messenger element was found in DOM
    expect(messengerFound).toBeTruthy();

    // Check if the page has expected messenger functionality
    const hasToggleButton = (await page.locator('#toggleMessenger').count()) > 0;
    const hasExpectedContent = (await page.locator('text=The messenger will initialize automatically').count()) > 0;

    expect(hasToggleButton && hasExpectedContent).toBeTruthy();
  });

  test('should handle CDN script loading without critical errors', async ({ page }) => {
    const jsErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      jsErrors.push(error.message);
    });

    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Filter out network errors that might occur in test environment
    const criticalErrors = jsErrors.filter(
      (error) =>
        !error.includes('Failed to fetch') &&
        !error.includes('NetworkError') &&
        !error.includes('net::ERR_') &&
        !error.includes('aiagent.sendbird.com'), // CDN might not be accessible in test env
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('should have TypeScript-compiled JavaScript without syntax errors', async ({ page }) => {
    // Navigate and wait for the main.ts to be loaded and executed
    await page.waitForLoadState('networkidle');

    // Verify that the TypeScript has been compiled to working JavaScript
    const mainScript = page.locator('script[src*="main.ts"]');
    await expect(mainScript).toHaveCount(1);

    // Check that DOM manipulation code from main.ts is working
    const toggleButton = page.locator('#toggleMessenger');
    const sessionToggle = page.locator('#sessionToggle');
    const contextToggle = page.locator('#contextToggle');

    await expect(toggleButton).toBeVisible();
    await expect(sessionToggle).toBeVisible();
    await expect(contextToggle).toBeVisible();
  });
});
