// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 300,
    },
  },

  projects: [
    /* 1. MẶC ĐỊNH: Chạy 16 test cases chức năng chỉ trên iPhone 14 */
    {
      name: 'Mobile Safari (iPhone 14)',
      use: { ...devices['iPhone 14'] },
      testMatch: /.*login\.spec\.js/, // Chỉ chạy file login.spec.js
    },

    /* 2. MỤC 3.3 TƯƠNG THÍCH: Chỉ chạy file compatibility.spec.js trên 3 nền tảng */
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*compatibility\.spec\.js/,
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /.*compatibility\.spec\.js/,
    },
    {
      name: 'Mobile Safari (iOS)',
      use: { ...devices['iPhone 14'] },
      testMatch: /.*compatibility\.spec\.js/,
    },
  ],

  webServer: {
    command: 'npx vite --port 5173',
    url: 'http://localhost:5173/login',
    reuseExistingServer: true,
    timeout: 120000,
  },
});