import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class HomePage extends BasePage {
	constructor(page: Page) {
		super(page, "");
	}
	//loginSignUpButton = navbar.locator(" Signup / Login");

	private get navbar(): Locator {
		return this.page.locator(".shop-menu");
	}

	get loginButton(): Locator {
		return this.navbar.locator('a[href="/login"]');
	}

	get mainHeader(): Locator {
		return this.page.getByRole("heading", { name: "AutomationExercise" });
	}
}
