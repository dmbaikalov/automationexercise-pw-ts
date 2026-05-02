import { expect, test } from "../../fixtures/fixtures";

test("@TC-001 Register User", async ({ app, createRandomUser: userData }) => {
	await app.homePage.open();
	expect.soft(app.homePage.mainHeader).toBeVisible();

	await app.homePage.loginButton.click();
	expect.soft(app.loginPage.signUpHeader).toBeVisible();

	await app.loginPage.nameInput.fill(userData.username);
	await app.loginPage.emailInput.fill(userData.email);
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
