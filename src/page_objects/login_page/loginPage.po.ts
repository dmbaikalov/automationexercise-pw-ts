import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class LoginPage extends BasePage {
	constructor(page: Page) {
		super(page, "/login");
	}

	get signUpHeader(): Locator {
		return this.page.locator("h2").filter({ hasText: "New User Signup!" });
	}

	get nameInput(): Locator {
		return this.page.getByTestId("signup-name");
	}

	get emailInput(): Locator {
		return this.page.getByTestId("signup-email");
	}

	get signUpBtn(): Locator {
		return this.page.getByTestId("signup-button");
	}
}
