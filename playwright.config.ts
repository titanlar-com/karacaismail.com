import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4399', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4399 --ignore-lock',
    url: 'http://127.0.0.1:4399',
    // Başka projelerin sunucusuna yanlışlıkla bağlanmamak için asla yeniden kullanma
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
