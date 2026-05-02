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

	await app.signUpPage.pickSex("Mr.");
	expect(app.signUpPage.nameInput).toHaveText(userData.username);
	expect(app.signUpPage.emailInput).toHaveText(userData.email);
	await app.signUpPage.passwordInput.fill(userData.password);
	await app.signUpPage.pickDateOfBirth("3", "July", "2000");
	await app.signUpPage.signUpForNewsLetterCheckBox.check();
	await app.signUpPage.receiveSpecialOfferCheckBox.check();
	await app.signUpPage.firstNameInput.fill(userData.firstName);
	await app.signUpPage.lastNameInput.fill(userData.lastName);
	await app.signUpPage.addressInput.fill(userData.address);
	await app.signUpPage.pickCountry("Canada");
	await app.signUpPage.stateInput.fill(userData.state);
	await app.signUpPage.cityInput.fill(userData.city);
	await app.signUpPage.zipcodeInput.fill(userData.zipcode);
	await app.signUpPage.mobileNumberInput.fill(userData.number);
	await app.signUpPage.createAccBtn.click();

	await app.signUpPage.isAccountCreated();
});
