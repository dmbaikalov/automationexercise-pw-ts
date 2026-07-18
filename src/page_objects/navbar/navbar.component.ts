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

	get productsLink(): Locator {
		return this.container.getByRole("link", { name: "Products" });
	}

	get cartLink(): Locator {
		return this.container.getByRole("link", { name: "Cart" });
	}

	get contactUsLink(): Locator {
		return this.container.getByRole("link", { name: "Contact us" });
	}

	get userIcon(): Locator {
		return this.container.locator(".fa-user");
	}
}
