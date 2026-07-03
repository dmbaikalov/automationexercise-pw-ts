import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";
import { userIncorrectData } from "../../test_data/userIncorrectData";

test.beforeEach(async ({ app }) => {
	await test.step("Navigating to Home Page", async () => {
		await app.homePage.open();
		await expect.soft(app.homePage.mainHeader).toBeVisible();
	});

	await test.step("Navigating to Login Page", async () => {
		await app.navbar.loginLink.click();
		await expect.soft(app.loginPage.signUpHeader).toBeVisible();
	});
});

test.describe("Login / Logout flow", {
	tag: ["@login", "@smoke", "@regression"],
}, () => {
	test.use({ storageState: config.guestContext });

	test("@TSK-002 Login User with correct email and password", async ({
		app,
	}) => {
		await test.step("Submitting login form", async () => {
			await app.loginPage.loginAs(config.userEmail, config.userPassword);
			await expect(app.homePage.mainHeader).toBeVisible();
		});

		await test.step("Verifying user is logged in", async () => {
			await expect(app.navbar.userIcon).toBeVisible();
		});

		await test.step("Clicking logout button", async () => {
			await app.navbar.logoutLink.click();
			await expect(app.loginPage.loginHeader).toBeVisible();
		});

		await test.step("Verifying user is logged out", async () => {
			await expect(app.navbar.userIcon).not.toBeVisible();
		});
	});

	userIncorrectData.forEach(({ label, email, password, errorMsg }) => {
		test(`@TSK-003 Login with ${label}`, async ({ app }) => {
			await test.step("Attempting login with incorrect credentials", async () => {
				await app.loginPage.loginAs(email, password);
			});

			await test.step("Validating error message", async () => {
				await expect(app.loginPage.errorMessage(errorMsg)).toBeVisible();
			});
		});
	});
});
