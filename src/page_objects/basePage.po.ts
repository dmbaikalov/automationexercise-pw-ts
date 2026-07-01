import { expect, type Page } from "@playwright/test";

export default class BasePage {
	readonly page: Page;

	constructor(
		page: Page,
		private _uri: string,
	) {
		this.page = page;
	}

	get uri(): string {
		return this._uri;
	}

	async open(): Promise<void> {
		await this.page.goto(this._uri);
	}

	async waitForUrl(expectedUrl: string, timeout?: number): Promise<void> {
		await expect(this.page).toHaveURL(expectedUrl, { timeout });
	}

	async reloadPage(timeout?: number): Promise<void> {
		await this.page.reload({ timeout });
	}
}
