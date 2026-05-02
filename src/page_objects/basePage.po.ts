import { expect, type Page } from "@playwright/test";

export default class BasePage {
	protected page: Page;
	constructor(
		page: Page,
		private _uri: string,
	) {
		this.page = page;
		this._uri = _uri;
	}

	get uri(): string {
		return this._uri;
	}

	async open(): Promise<void> {
		await this.page.goto("" + this._uri);
	}

	async waitForUrl(expectedUrl: string, timeout?: number) {
		await expect(this.page).toHaveURL(expectedUrl, { timeout: timeout });
	}

	async reloadPage(timeout?: number): Promise<void> {
		await this.page.reload({ timeout: timeout });
	}

	async actualUrl(): Promise<string> {
		return this.page.url();
	}
}
