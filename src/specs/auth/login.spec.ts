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
			expect(await app.navbar.isLoggedIn()).toBeTruthy();
		});

		await test.step("Clicking logout button", async () => {
			await app.navbar.logoutLink.click();
			await expect(app.homePage.mainHeader).toBeVisible();
		});

		await test.step("Verifying user is logged out", async () => {
			expect(await app.navbar.isLoggedIn()).toBeFalsy();
		});
	});

	userIncorrectData.forEach(({ email, password, errorMsg }) => {
		test(`@TSK-003 Login User with incorrect ${email} and ${password}`, async ({
			app,
		}) => {
			await test.step("Attempting login with incorrect credentials", async () => {
				await app.loginPage.loginAs(email, password);
			});

			await test.step("Validating error message", async () => {
				expect(await app.loginPage.isErrorMsgVisible(errorMsg)).toBeTruthy();
			});
		});
	});
});
