import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";

test.describe("Login / Logout flow", async () => {
	test("@TSK-001 Register User", {
		tag: ["@sign_up", "@regression"],
	}, async ({ app, createRandomUser: userData }) => {
		await app.homePage.open();
		expect.soft(app.homePage.mainHeader).toBeVisible();

		await app.homePage.loginButton.click();
		expect.soft(app.loginPage.signUpHeader).toBeVisible();

		await app.loginPage.nameInput.fill(userData.username);
		await app.loginPage.emailSignUpInput.fill(userData.email);
		Promise.all([
			await app.loginPage.signUpBtn.click(),
			await app.waitForUrl("/signup"),
		]);

		await app.signUpPage.fillSignUpForm(
			userData,
			"Mr. ",
			{ day: "3", month: "July", year: "2000" },
			"Canada",
		);

		expect
			.soft(await app.signUpPage.nameInput.inputValue())
			.toContain(userData.username);
		expect
			.soft(await app.signUpPage.emailInput.inputValue())
			.toContain(userData.email);
		await app.signUpPage.createAccBtn.click();

		await app.signUpPage.isAccountCreated();
	});

	test("@TSK-004 Register User with existing email", {
		tag: ["@sign_up", "@regression"],
	}, async ({ app }) => {
		await app.homePage.open();
		expect.soft(app.homePage.mainHeader).toBeVisible();

		await app.homePage.loginButton.click();
		expect.soft(app.loginPage.signUpHeader).toBeVisible();

		await app.loginPage.nameInput.fill(config.userName);
		await app.loginPage.emailSignUpInput.fill(config.userEmail);
		await app.loginPage.signUpBtn.click();

		const errorMsg = "Email Address already exist!";
		expect(await app.loginPage.isErrorMsgVisible(errorMsg)).toBeTruthy();
	});
});
