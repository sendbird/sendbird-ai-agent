import { expect, test } from '@playwright/test';

test.describe('React Sample - Playground UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5175');
  });

  test('should load the React playground page with correct elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Sendbird AI Agent React/);
    await expect(page.locator('h1')).toContainText('Sendbird AI Agent React Playground');

    // Check for main sections
    await expect(page.locator('h2:has-text("Basic Controls")')).toBeVisible();
    await expect(page.locator('h2:has-text("Language Settings")')).toBeVisible();
    await expect(page.locator('h2:has-text("Context Configuration")')).toBeVisible();
    await expect(page.locator('h2:has-text("Current Status")')).toBeVisible();
  });

  test('should have basic controls that respond to interactions', async ({ page }) => {
    // Test session checkbox
    const sessionCheckbox = page.locator('text=Authenticated Session').locator('..').locator('input[type="checkbox"]');
    await expect(sessionCheckbox).toBeVisible();
    await expect(sessionCheckbox).not.toBeChecked();

    await sessionCheckbox.click();
    await expect(sessionCheckbox).toBeChecked();

    // Should show user ID when authenticated
    await expect(page.locator('text=User ID:')).toBeVisible();

    // Test reset button
    const resetButton = page.locator('button:has-text("Reset Messenger")');
    await expect(resetButton).toBeVisible();
  });

  test('should have working language settings', async ({ page }) => {
    // Check default language (English)
    const englishRadio = page.locator('input[type="radio"][value="en-US"]');
    await expect(englishRadio).toBeChecked();

    // Switch to Korean
    const koreanRadio = page.locator('input[type="radio"][value="ko-KR"]');
    await koreanRadio.click();
    await expect(koreanRadio).toBeChecked();

    // Check status panel updates
    await expect(page.locator('text=Language:').locator('..').locator('text=한국어')).toBeVisible();
  });

  test('should have working context configuration', async ({ page }) => {
    // Check context presets dropdown
    const contextSelect = page.locator('select').first();
    await expect(contextSelect).toBeVisible();

    // Select Technical User preset
    await contextSelect.selectOption('1');
    await page.waitForTimeout(500);

    // Check status shows Technical User
    await expect(page.locator('text=Context:').locator('..').locator('text=Technical User')).toBeVisible();

    // Test custom context toggle
    const customContextToggle = page.locator('text=Use Custom Context').locator('..').locator('input[type="checkbox"]');
    await customContextToggle.click();

    // Custom context textarea should appear
    const customTextarea = page.locator('textarea[placeholder*="userType"]');
    await expect(customTextarea).toBeVisible();

    // Enter custom JSON
    await customTextarea.fill('{"userType": "test"}');

    // Status should show Custom
    await expect(page.locator('text=Context:').locator('..').locator('text=Custom')).toBeVisible();
  });

  test('should render AI Agent Messenger component in DOM', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Look for Sendbird messenger elements (should include launcher)
    const messengerElements = [
      '[data-testid*="messenger"]',
      '[data-testid*="sendbird"]',
      '[class*="sendbird"]',
      '[class*="messenger"]',
      '[id*="sendbird"]',
      '[id*="messenger"]',
      'iframe',
      '[data-sb-component]',
    ];

    let messengerFound = false;

    for (const selector of messengerElements) {
      const element = page.locator(selector).first();
      if ((await element.count()) > 0) {
        messengerFound = true;
        break;
      }
    }

    // Also check for UI elements including launcher
    if (!messengerFound) {
      const uiElements = [
        'button[aria-label*="close"]',
        'button[aria-label*="launcher"]',
        'button[aria-label*="open"]',
        '[role="dialog"]',
        '[class*="ai-agent"]',
        '[class*="launcher"]',
      ];

      for (const selector of uiElements) {
        const element = page.locator(selector).first();
        if ((await element.count()) > 0) {
          messengerFound = true;
          break;
        }
      }
    }

    if (!messengerFound) {
      await page.screenshot({ path: 'messenger-debug.png', fullPage: true });
    }

    expect(messengerFound).toBeTruthy();
  });

  test('should not have critical JavaScript errors during initialization', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    await page.goto('http://localhost:5175');
    await page.waitForLoadState('networkidle');

    // Wait for messenger initialization
    await page.waitForTimeout(3000);

    console.log('Captured console errors:', consoleErrors);

    // Filter out non-critical errors
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes('Failed to fetch') &&
        !error.includes('NetworkError') &&
        !error.includes('net::ERR_') &&
        !error.includes('WebSocket') &&
        !error.includes('403') &&
        !error.includes('CORS') &&
        !error.includes('favicon') &&
        !error.toLowerCase().includes('warning') &&
        !error.includes('messengerSession: failed to initialize') &&
        !error.includes('There was a network error') &&
        !error.includes('Request has been canceled'),
    );

    if (criticalErrors.length > 0) {
      console.log('Critical errors found:', criticalErrors);
    }

    expect(criticalErrors.length).toBe(0);
  });

  test('should display status panel correctly', async ({ page }) => {
    // Check initial status
    await expect(page.locator('text=Authentication:').locator('..').locator('text=Anonymous')).toBeVisible();
    await expect(page.locator('text=Language:').locator('..').locator('text=English')).toBeVisible();
    await expect(page.locator('text=Context:').locator('..').locator('text=No Context')).toBeVisible();

    // Enable session and check status
    const sessionCheckbox = page.locator('text=Authenticated Session').locator('..').locator('input[type="checkbox"]');
    await sessionCheckbox.click();
    await expect(page.locator('text=Authentication:').locator('..').locator('text=Authenticated')).toBeVisible();
  });
});
