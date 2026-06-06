import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class HomePage extends BasePage {
	constructor(page: Page) {
		super(page, "");
	}

	private get navbar(): Locator {
		return this.page.locator(".shop-menu");
	}

	get loginButton(): Locator {
		return this.navbar.locator('a[href="/login"]');
	}
	get contactUsBtn(): Locator {
		return this.navbar.locator('a[href="/contact_us"]');
	}

	get mainHeader(): Locator {
		return this.page.getByRole("heading", { name: "AutomationExercise" });
	}

	get logoutBtn(): Locator {
		return this.navbar.locator('a[href="/logout"]');
	}

	private get loggedInAs(): Locator {
		return this.navbar.locator(".fa-user");
	}

	async isLoggedIn(): Promise<boolean> {
		return await this.loggedInAs.isVisible();
	}
}
