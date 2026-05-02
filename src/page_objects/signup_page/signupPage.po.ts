import { expect, type Locator, type Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class SignUpPage extends BasePage {
	constructor(page: Page) {
		super(page, "/signup");
	}

	get nameInput(): Locator {
		return this.page.getByTestId("name");
	}

	get emailInput(): Locator {
		return this.page.getByTestId("email");
	}

	get passwordInput(): Locator {
		return this.page.getByTestId("password");
	}

	private get sexRadioBtn(): Locator {
		return this.page.locator("radio-inline");
	}

	private get dateOfBirthPicker(): Locator {
		return this.page
			.locator(".form-group")
			.filter({ hasText: "Date of Birth" });
	}

	private get pickDayOfBirth(): Locator {
		return this.dateOfBirthPicker.locator("#uniform-days");
	}

	private get pickMonthOfBirth(): Locator {
		return this.dateOfBirthPicker.locator("#uniform-months");
	}

	private get pickYearOfBirth(): Locator {
		return this.dateOfBirthPicker.locator("#uniform-years");
	}

	get signUpForNewsLetterCheckBox(): Locator {
		return this.page.getByRole("checkbox", {
			name: "Sign up for our newsletter!",
		});
	}

	get receiveSpecialOfferCheckBox(): Locator {
		return this.page.getByRole("checkbox", {
			name: "Receive special offers from our partners!",
		});
	}

	get firstNameInput(): Locator {
		return this.page.getByTestId("first_name");
	}

	get lastNameInput(): Locator {
		return this.page.getByTestId("last_name");
	}

	get addressInput(): Locator {
		return this.page.getByTestId("address");
	}

	private get countryOfOriginDropDown() {
		return this.page.getByTestId("country");
	}

	get stateInput(): Locator {
		return this.page.getByTestId("state");
	}

	get cityInput(): Locator {
		return this.page.getByTestId("city");
	}

	get zipcodeInput(): Locator {
		return this.page.getByTestId("zipcode");
	}

	get mobileNumberInput(): Locator {
		return this.page.getByTestId("mobile_number");
	}

	get createAccBtn(): Locator {
		return this.page.getByTestId("create-account");
	}

	private get accCreated() {
		return this.page.getByText("Account Created!");
	}

	async pickCountry(country: string): Promise<void> {
		await this.countryOfOriginDropDown.selectOption(country);
	}

	async pickSex(sex: string): Promise<void> {
		await this.sexRadioBtn.filter({ hasText: `${sex}` }).click();
	}

	async isAccountCreated() {
		expect(this.accCreated).toBeVisible();
	}

	async pickDateOfBirth(
		day: string,
		month: string,
		year: string,
	): Promise<void> {
		await this.pickDayOfBirth.selectOption(day);
		await this.pickMonthOfBirth.selectOption(month);
		await this.pickYearOfBirth.selectOption(year);
	}
}
