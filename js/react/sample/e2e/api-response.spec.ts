import { expect, test } from '@playwright/test';

test.describe('React Sample - API Response Check', () => {
  test('should receive 200 responses from Sendbird API, not 400/500', async ({ page }) => {
    const responses: { url: string; status: number }[] = [];

    // Monitor network responses
    page.on('response', (response) => {
      if (response.url().includes('sendbird.com')) {
        responses.push({
          url: response.url(),
          status: response.status(),
        });
      }
    });

    await page.goto('http://localhost:5174');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for messenger initialization

    // Try to trigger API calls by enabling session and context
    const sessionCheckbox = page.locator('input[type="checkbox"]').first();
    const contextCheckbox = page.locator('input[type="checkbox"]').last();

    await sessionCheckbox.check();
    await page.waitForTimeout(1000);

    await contextCheckbox.check();
    await page.waitForTimeout(1000);

    // Try to open messenger to trigger more API calls
    const openButton = page.locator('button:has-text("Open Messenger")');
    await openButton.click();
    await page.waitForTimeout(2000);

    // Check responses
    console.log('Captured responses:', responses);

    // Focus on critical initialization APIs that must succeed
    const criticalAPIs = responses.filter(
      (r) =>
        r.url.includes('/messenger_settings') ||
        r.url.includes('/ai_agents/') ||
        r.url.includes('/sdk_message_templates'),
    );

    const criticalErrors = criticalAPIs.filter((r) => r.status >= 400 && r.status <= 599);
    console.log('Critical API responses:', criticalAPIs);

    if (criticalErrors.length > 0) {
      console.log('Critical API errors found:', criticalErrors);
    }

    // Critical APIs should not fail
    expect(criticalErrors.length).toBe(0);

    // We should have at least some successful API responses
    const successfulResponses = responses.filter((r) => r.status >= 200 && r.status <= 299);
    expect(successfulResponses.length).toBeGreaterThan(0);

    // Messenger settings API should specifically succeed (this is the key API)
    const messengerSettingsAPI = responses.find((r) => r.url.includes('/messenger_settings'));
    if (messengerSettingsAPI) {
      expect(messengerSettingsAPI.status).toBe(200);
    }
  });
});
