import { defineConfig, devices } from "@playwright/test";
import { CONTEXT_TESTUSER } from "./globals";

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
		trace: process.env.CI ? "on-first-retry" : "retain-on-failure",
		video: "retain-on-failure",
		screenshot: "only-on-failure",
		actionTimeout: process.env.CI ? 30000 : 10000,
		navigationTimeout: process.env.CI ? 60000 : 30000,
	},
	expect: {
		timeout: 10000,
	},
	globalTeardown: require.resolve("./src/specs/setup/global.teardown.ts"),
	projects: [
		{
			name: "setup",
			testMatch: /.*\.setup\.ts/,
		},

		{
			name: "ui e2e",
			use: { ...devices["Desktop Chrome"] },
			dependencies: ["setup"],
		},

		{
			name: "api",
			testMatch: /.*\.api\.spec\.ts/,
			dependencies: ["setup"],
			use: { storageState: CONTEXT_TESTUSER },
		},
	],
});
