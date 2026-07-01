import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class HomePage extends BasePage {
	constructor(page: Page) {
		super(page, "");
	}

	get mainHeader(): Locator {
		return this.page.getByRole("heading", { name: "AutomationExercise" });
	}
}
