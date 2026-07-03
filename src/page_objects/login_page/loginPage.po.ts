import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class LoginPage extends BasePage {
	constructor(page: Page) {
		super(page, "/login");
	}

	get signUpHeader(): Locator {
		return this.page.getByRole("heading", { name: "New User Signup!" });
	}

	get loginHeader(): Locator {
		return this.page.getByRole("heading", { name: "Login to your account" });
	}

	get nameInput(): Locator {
		return this.page.getByTestId("signup-name");
	}

	get emailSignUpInput(): Locator {
		return this.page.getByTestId("signup-email");
	}

	get emailLoginInput(): Locator {
		return this.page.getByTestId("login-email");
	}

	get passwordInput(): Locator {
		return this.page.getByTestId("login-password");
	}

	get loginBtn(): Locator {
		return this.page.getByTestId("login-button");
	}

	get signUpBtn(): Locator {
		return this.page.getByTestId("signup-button");
	}

	errorMessage(text: string): Locator {
		return this.page.locator("p").filter({ hasText: text });
	}

	async loginAs(email: string, password: string): Promise<void> {
		await this.emailLoginInput.fill(email);
		await this.passwordInput.fill(password);
		await this.loginBtn.click();
	}

	async beginSignUp(name: string, email: string): Promise<void> {
		await this.nameInput.fill(name);
		await this.emailSignUpInput.fill(email);
		await this.signUpBtn.click();
	}
}
