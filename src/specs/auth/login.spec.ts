import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";
import { userIncorrectData } from "../../test-data/userIncorrectData";

test.describe("Login / Logout flow", {
	tag: ["@login", "@smoke", "@regression"],
}, () => {
	test.use({ storageState: config.guestContext });

	test("@TSK-002 Login User with correct email and password", {
		tag: ["@login", "@smoke"],
	}, async ({ app }) => {
		await test.step("Opening home page", async () => {
			await app.homePage.open();
			expect(await app.homePage.mainHeader.isVisible()).toBeTruthy();
		});

		await test.step("Navigating to login page", async () => {
			await app.homePage.loginButton.click();
		});

		await test.step("Filling credentials into the login form", async () => {
			await app.homePage.loginButton.click();
			await app.loginPage.emailLoginInput.fill(config.userEmail);
			await app.loginPage.passwordInput.fill(config.userPassword);
		});

		await test.step("Submitting login form", async () => {
			await Promise.all([
				app.loginPage.loginBtn.click(),
				app.homePage.mainHeader.isVisible(),
			]);
		});

		await test.step("Verifying user is logged in", async () => {
			expect(await app.homePage.isLoggedIn()).toBeTruthy();
		});

		await test.step("Clicking logout button", async () => {
			await Promise.all([
				app.homePage.logoutBtn.click(),
				app.homePage.mainHeader.isVisible(),
			]);
		});

		await test.step("Verifying user is logged out", async () => {
			expect(await app.homePage.isLoggedIn()).toBeFalsy();
		});
	});

	userIncorrectData.forEach(({ email, password, errorMsg }) => {
		test(`@TSK-003 Login User with incorrect ${email} and ${password}`, {
			tag: ["@login", "@regression"],
		}, async ({ app }) => {
			await test.step("Opening home page", async () => {
				await app.homePage.open();
				expect(await app.homePage.mainHeader.isVisible()).toBeTruthy();
			});

			await test.step("Navigating to login page and filling incorrect credentials", async () => {
				await app.homePage.loginButton.click();
				await app.loginPage.emailLoginInput.fill(email);
				await app.loginPage.passwordInput.fill(password);
			});

			await test.step("Submitting login form and validating error", async () => {
				await app.loginPage.loginBtn.click();
				expect(await app.loginPage.isErrorMsgVisible(errorMsg)).toBeTruthy();
			});
		});
	});
});
