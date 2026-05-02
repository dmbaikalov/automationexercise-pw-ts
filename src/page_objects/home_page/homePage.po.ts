import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class HomePage extends BasePage {
	constructor(page: Page) {
		super(page, "");
	}
	//loginSignUpButton = navbar.locator(" Signup / Login");

	private get navbar(): Locator {
		return this.page.locator("nav");
	}

	get loginButton(): Locator {
		return this.navbar.locator(" Signup / Login");
	}

	get mainHeader(): Locator {
		return this.page.getByRole("heading", { name: "AutomationExercise" });
	}
}
