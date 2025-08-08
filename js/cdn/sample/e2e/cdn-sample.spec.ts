import { expect, test } from '@playwright/test';

test.describe('CDN Sample - Playground UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should load the CDN playground page with correct elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Sendbird AI Agent CDN Playground/);
    await expect(page.locator('h1')).toContainText('Sendbird AI Agent CDN Playground');

    // Check for main sections
    await expect(page.locator('h2').filter({ hasText: 'Basic Controls' })).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: 'Language Settings' })).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: 'Context Configuration' })).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: 'Current Status' })).toBeVisible();
  });

  test('should have basic controls that respond to interactions', async ({ page }) => {
    // Wait for initialization
    await page.waitForTimeout(2000);

    // Test Open/Close button
    const toggleButton = page.locator('#toggleMessenger');
    await expect(toggleButton).toContainText('Open Messenger');
    await toggleButton.click();
    await page.waitForTimeout(500);
    await expect(toggleButton).toContainText('Close Messenger');

    // Check status update
    await expect(page.locator('#statusState')).toContainText('Open');

    await toggleButton.click();
    await page.waitForTimeout(500);
    await expect(toggleButton).toContainText('Open Messenger');
    await expect(page.locator('#statusState')).toContainText('Closed');

    // Test session checkbox
    const sessionToggle = page.locator('#sessionToggle');
    await expect(sessionToggle).toBeVisible();
    await expect(sessionToggle).not.toBeChecked();

    await sessionToggle.click();
    await expect(sessionToggle).toBeChecked();

    // Should show user ID when authenticated
    await expect(page.locator('#userInfo')).toBeVisible();
    await expect(page.locator('#statusAuth')).toContainText('Authenticated');

    // Test reset button
    const resetButton = page.locator('#resetMessenger');
    await expect(resetButton).toBeVisible();
  });

  test('should have working language settings', async ({ page }) => {
    // Check default language (English)
    const englishRadio = page.locator('input[type="radio"][value="en-US"]');
    await expect(englishRadio).toBeChecked();
    await expect(page.locator('#statusLanguage')).toContainText('English');

    // Switch to Korean
    const koreanRadio = page.locator('input[type="radio"][value="ko-KR"]');
    await koreanRadio.click();
    await expect(koreanRadio).toBeChecked();

    // Check status panel updates
    await page.waitForTimeout(1000); // Wait for reset
    await expect(page.locator('#statusLanguage')).toContainText('한국어');
  });

  test('should have working context configuration', async ({ page }) => {
    // Check context presets dropdown
    const contextSelect = page.locator('#contextPreset');
    await expect(contextSelect).toBeVisible();

    // Select Technical User preset
    await contextSelect.selectOption('technical');
    await page.waitForTimeout(500);

    // Check status shows Technical User
    await expect(page.locator('#statusContext')).toContainText('Technical User');

    // Check context display
    await expect(page.locator('#activeContext')).toBeVisible();
    await expect(page.locator('#contextPreview')).toContainText('technical');

    // Test custom context toggle
    const customContextToggle = page.locator('#customContextToggle');
    await customContextToggle.click();

    // Custom context textarea should appear
    const customTextarea = page.locator('#customContext');
    await expect(customTextarea).toBeVisible();

    // Context preset should be disabled
    await expect(contextSelect).toBeDisabled();

    // Enter custom JSON
    await customTextarea.fill('{"userType": "test", "level": 5}');
    await page.waitForTimeout(500);

    // Status should show Custom
    await expect(page.locator('#statusContext')).toContainText('Custom');

    // Check context preview updated
    await expect(page.locator('#contextPreview')).toContainText('userType');
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

    // Open the messenger to ensure it's in DOM
    await page.locator('#toggleMessenger').click();
    await page.waitForTimeout(1000);

    // Look for messenger elements in DOM
    const messengerElements = [
      '[data-testid*="messenger"]',
      '[class*="sendbird"]',
      '[class*="messenger"]',
      '[id*="sendbird"]',
      '[id*="messenger"]',
      'iframe',
    ];

    let messengerFound = false;
    for (const selector of messengerElements) {
      const element = page.locator(selector).first();
      if ((await element.count()) > 0) {
        messengerFound = true;
        break;
      }
    }

    expect(messengerFound).toBeTruthy();
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

  test('should display status panel correctly', async ({ page }) => {
    // Check initial status
    await expect(page.locator('#statusState')).toContainText('Closed');
    await expect(page.locator('#statusAuth')).toContainText('Anonymous');
    await expect(page.locator('#statusLanguage')).toContainText('English');
    await expect(page.locator('#statusContext')).toContainText('No Context');

    // Open messenger and check status update
    await page.locator('#toggleMessenger').click();
    await expect(page.locator('#statusState')).toContainText('Open');

    // Enable session and check status
    await page.locator('#sessionToggle').click();
    await expect(page.locator('#statusAuth')).toContainText('Authenticated');

    // Select a context preset
    await page.locator('#contextPreset').selectOption('business');
    await expect(page.locator('#statusContext')).toContainText('Business User');
  });

  test('should display environment info', async ({ page }) => {
    // Check environment info is displayed
    await expect(page.locator('#appId')).toBeVisible();
    await expect(page.locator('#aiAgentId')).toBeVisible();

    // Should show truncated IDs
    const appIdText = await page.locator('#appId').textContent();
    const aiAgentIdText = await page.locator('#aiAgentId').textContent();

    expect(appIdText).toContain('...');
    expect(aiAgentIdText).toContain('...');
  });
});
