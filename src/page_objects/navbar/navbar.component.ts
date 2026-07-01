import type { Locator, Page } from "@playwright/test";

export class NavbarComponent {
	private readonly container: Locator;

	constructor(page: Page) {
		this.container = page.locator(".shop-menu");
	}

	get loginLink(): Locator {
		return this.container.getByRole("link", { name: "Login" });
	}

	get logoutLink(): Locator {
		return this.container.getByRole("link", { name: "Logout" });
	}

	get contactUsLink(): Locator {
		return this.container.getByRole("link", { name: "Contact us" });
	}

	private get userIcon(): Locator {
		return this.container.locator(".fa-user");
	}

	async isLoggedIn(): Promise<boolean> {
		return this.userIcon.isVisible();
	}
}
