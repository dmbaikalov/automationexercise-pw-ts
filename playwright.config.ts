import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./src/specs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["junit"], ["html", { open: "never" }]]
    : [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: process.env.BASE_URL,
    testIdAttribute: "data-qa",
    trace: "on",
    screenshot: "only-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  expect: {
    timeout: 10000,
  },
  //globalTeardown: require.resolve("./src/specs/setup/global.teardown.ts"),
  projects: [
    // {
    //   name: "setup",
    //   testMatch: /.*\.setup\.ts/,
    // },

    {
      name: "regression",
      use: { ...devices["Desktop Chrome"] },
      //dependencies: isStorageStateEmpty() ? ["setup"] : [],
    },
  ],
});
