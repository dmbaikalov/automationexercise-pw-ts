import { expect, type Locator, type Page } from "@playwright/test";

export default class BasePage {
	protected page: Page;
	constructor(
		page: Page,
		private _uri: string,
	) {
		this.page = page;
		this._uri = _uri;
	}

	/**
	 *
	 * Return current URI
	 * @readonly
	 * @type {string}
	 * @memberof BasePage
	 */
	get uri(): string {
		return this._uri;
	}

	/**
	 *
	 * Open the URI of the page that is calling this method
	 * @return {*}  {Promise<void>}
	 * @memberof BasePage
	 */
	async open(): Promise<void> {
		await this.page.goto(`${this._uri}`);
	}

	/**
	 *
	 * Waits for provided URL
	 * @param {string} expectedUrl
	 * @param {number} [timeout]
	 * @memberof BasePage
	 */
	async waitForUrl(expectedUrl: string, timeout?: number) {
		await expect(this.page).toHaveURL(expectedUrl, { timeout: timeout });
	}

	/**
	 *
	 * Reloading current page
	 * @param {number} [timeout]
	 * @return {*}  {Promise<void>}
	 * @memberof BasePage
	 */
	async reloadPage(timeout?: number): Promise<void> {
		await this.page.reload({ timeout: timeout });
	}

	/**
	 *
	 * Returns string with actual URL
	 * @return {*}  {Promise<string>}
	 * @memberof BasePage
	 */
	async actualUrl(): Promise<string> {
		return this.page.url();
	}

	/**
	 *
	 * Uploads file from test data folder
	 * @param {Locator} slc
	 * @param {string} fileName
	 * @return {*}  {Promise<void>}
	 * @memberof BasePage
	 */
	async uploadFile(slc: Locator, fileName: string): Promise<void> {
		await slc.setInputFiles(`src/test_data/${fileName}`);
	}

	/**
	 *
	 * Validates that provided text is visible
	 * @param {string} text
	 * @return {*}  {Promise<boolean>}
	 * @memberof BasePage
	 */
	async isTextVisible(text: string): Promise<boolean> {
		return this.page.getByText(text).isVisible();
	}
}
