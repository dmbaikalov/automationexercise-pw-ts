import path from "node:path";
import { expect, type Locator, type Page } from "@playwright/test";

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

	async uploadFile(locator: Locator, fileName: string): Promise<void> {
		await locator.setInputFiles(
			path.join(process.cwd(), "src/test_data", fileName),
		);
	}

	async waitForLoadState(
		loadState: "load" | "domcontentloaded" | "networkidle",
	): Promise<void> {
		await this.page.waitForLoadState(loadState);
	}
}
