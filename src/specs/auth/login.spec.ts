import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";
import { userIncorrectData } from "../../test-data/userIncorrectData";

test.describe("@login Login / Logout flow", () => {
	test.use({ storageState: config.guestContext });

	test("@TSK-002 Login User with correct email and password", async ({
		app,
	}) => {
		await app.homePage.open();
		expect(await app.homePage.mainHeader.isVisible()).toBeTruthy();
		await app.homePage.loginButton.click();
		await app.loginPage.emailLoginInput.fill(config.userEmail);
		await app.loginPage.passwordInput.fill(config.userPassword);

		Promise.all([
			await app.loginPage.loginBtn.click(),
			app.homePage.mainHeader.isVisible(),
		]);

		expect(await app.homePage.isLoggedIn()).toBeTruthy();

		Promise.all([
			await app.homePage.logoutBtn.click(),
			app.homePage.mainHeader.isVisible(),
		]);
		expect(await app.homePage.isLoggedIn()).toBeFalsy();
	});

	userIncorrectData.forEach(({ email, password, errorMsg }) => {
		test(`@TSK-003 Login User with incorrect ${email} and ${password}`, async ({
			app,
		}) => {
			await app.homePage.open();
			expect(await app.homePage.mainHeader.isVisible()).toBeTruthy();
			await app.homePage.loginButton.click();
			await app.loginPage.emailLoginInput.fill(email);
			await app.loginPage.passwordInput.fill(password);

			await app.loginPage.loginBtn.click();

			expect(await app.loginPage.isErrorMsgVisible(errorMsg)).toBeTruthy();
		});
	});
});
