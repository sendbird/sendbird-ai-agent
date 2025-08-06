import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'react-sample',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'tests/react-sample.spec.ts'
    },
    {
      name: 'cdn-sample',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'tests/cdn-sample.spec.ts'
    },
  ],

  webServer: [
    {
      command: 'npm run dev',
      cwd: './js/react/sample',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev',
      cwd: './js/cdn/sample',
      port: 5174,
      reuseExistingServer: !process.env.CI,
    }
  ],
})