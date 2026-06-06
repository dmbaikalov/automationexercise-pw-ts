import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class LoginPage extends BasePage {
	constructor(page: Page) {
		super(page, "/login");
	}

	get signUpHeader(): Locator {
		return this.page.locator("h2").filter({ hasText: "New User Signup!" });
	}

	get loginHeader(): Locator {
		return this.page.locator("h2").filter({ hasText: "Login to your account" });
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

	/**
	 *
	 * Validates that error message is visible
	 * @param {string} errorMsg
	 * @return {*}  {Promise<boolean>}
	 */
	async isErrorMsgVisible(errorMsg: string): Promise<boolean> {
		const errorSlc = this.page.locator("p").filter({ hasText: `${errorMsg}` });
		return await errorSlc.isVisible();
	}
}
