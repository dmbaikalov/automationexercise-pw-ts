import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class ContactUs extends BasePage {
	constructor(page: Page) {
		super(page, "/contact_us");
	}

	get mainHeader(): Locator {
		return this.page.locator("h2").filter({ hasText: "GET IN TOUCH" });
	}

	get nameInput(): Locator {
		return this.page.getByTestId("name");
	}

	get emailInput(): Locator {
		return this.page.getByTestId("email");
	}

	get subjectInput(): Locator {
		return this.page.getByTestId("subject");
	}

	get yourMsgInput(): Locator {
		return this.page.getByTestId("message");
	}

	get chooseFileBtn(): Locator {
		return this.page.getByRole("button", { name: "Choose file" });
	}

	get submitBtn(): Locator {
		return this.page.getByTestId("submit-button");
	}
}
