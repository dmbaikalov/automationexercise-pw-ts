import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

type ContactFormData = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export class ContactUs extends BasePage {
	constructor(page: Page) {
		super(page, "/contact_us");
	}

	get mainHeader(): Locator {
		return this.page.getByRole("heading", { name: "GET IN TOUCH" });
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

	async fillAndSubmit(data: ContactFormData, fileName?: string): Promise<void> {
		await this.nameInput.fill(data.name);
		await this.emailInput.fill(data.email);
		await this.subjectInput.fill(data.subject);
		await this.yourMsgInput.fill(data.message);
		if (fileName) {
			await this.chooseFileBtn.setInputFiles(`src/test_data/${fileName}`);
		}
		await this.submitBtn.click();
	}
}
