// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:5173',

    /* Tự động chụp ảnh màn hình và quay video khi test case bị thất bại */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Làm chậm lại 1000ms (1 giây) ở mỗi thao tác bấm/nhập để mắt người nhìn rõ */
    launchOptions: {
      slowMo: 1000,
    },
  },

  /* Cấu hình thiết bị di động kiểm thử: iPhone 14 (Mobile Safari) */
  projects: [
    {
      name: 'Mobile Safari (iPhone 14)',
      use: { ...devices['iPhone 14'] },
    },
  ],

  /* Tự động chạy Vite dev server khi bắt đầu chạy test */
  webServer: {
    command: 'npx vite --port 5173',
    url: 'http://localhost:5173/login',
    reuseExistingServer: true,
    timeout: 120000,
  },
});


