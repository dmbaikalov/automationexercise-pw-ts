import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";

test.beforeEach(async ({ app }) => {
	await test.step("Navigating to Home Page", async () => {
		await app.homePage.open();
		await expect.soft(app.homePage.mainHeader).toBeVisible();
	});

	await test.step("Navigating to Sign Up Page", async () => {
		await app.navbar.loginLink.click();
		await expect.soft(app.loginPage.signUpHeader).toBeVisible();
	});
});

test.describe("Sign Up flow", {
	tag: ["@sign_up", "@regression"],
}, () => {
	test("@TSK-001 Register User", async ({
		app,
		createRandomUser: userData,
	}) => {
		await test.step("Filling and submitting sign up form", async () => {
			await app.loginPage.beginSignUp(userData.username, userData.email);
			await app.waitForUrl("/signup");
		});

		await test.step("Filling and submitting user info data", async () => {
			await app.signUpPage.fillSignUpForm(
				userData,
				"Mr. ",
				{ day: "3", month: "July", year: "2000" },
				"Canada",
			);
			await expect
				.soft(app.signUpPage.nameInput)
				.toHaveValue(userData.username);
			await expect.soft(app.signUpPage.emailInput).toHaveValue(userData.email);
			await app.signUpPage.createAccBtn.click();
		});

		await test.step("Validating that new user were created", async () => {
			await app.signUpPage.isAccountCreated();
		});
	});

	test("@TSK-004 Register User with existing email", async ({ app }) => {
		await test.step("Filling and submitting Sign up form with existing email", async () => {
			await app.loginPage.beginSignUp(config.userName, config.userEmail);
		});

		await test.step("Validating that error message have appeared", async () => {
			const errorMsg = "Email Address already exist!";
			expect(await app.loginPage.isErrorMsgVisible(errorMsg)).toBeTruthy();
		});
	});
});
