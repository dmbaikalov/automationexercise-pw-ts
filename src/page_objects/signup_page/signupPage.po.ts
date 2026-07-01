import { expect, type Locator, type Page } from "@playwright/test";
import type { TUser } from "../../types/User.types";
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
		return this.page.locator(".radio-inline");
	}

	private get dateOfBirthPicker(): Locator {
		return this.page
			.locator(".form-group")
			.filter({ hasText: "Date of Birth" });
	}

	private get pickDayOfBirth(): Locator {
		return this.dateOfBirthPicker.getByTestId("days");
	}

	private get pickMonthOfBirth(): Locator {
		return this.dateOfBirthPicker.getByTestId("months");
	}

	private get pickYearOfBirth(): Locator {
		return this.dateOfBirthPicker.getByTestId("years");
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

	/**
	 *
	 * Selecting a country from a dropdown
	 * @param {string} country
	 * @return {*}  {Promise<void>}
	 */
	async pickCountry(country: string): Promise<void> {
		await this.countryOfOriginDropDown.selectOption(country);
	}

	/**
	 *
	 * Selecting sex radio button
	 * @param {string} sex
	 * @return {*}  {Promise<void>}
	 */
	async pickSex(sex: string): Promise<void> {
		await this.sexRadioBtn.filter({ hasText: `${sex}` }).click();
	}

	/**
	 *
	 * Validating that new user name is showed in header
	 * @memberof SignUpPage
	 */
	async isAccountCreated(): Promise<void> {
		await expect(this.accCreated).toBeVisible();
	}

	/**
	 *
	 * Selecting date of birth
	 * @param {string} day
	 * @param {string} month
	 * @param {string} year
	 * @return {*}  {Promise<void>}
	 */
	async pickDateOfBirth(
		day: string,
		month: string,
		year: string,
	): Promise<void> {
		await this.pickDayOfBirth.selectOption(day);
		await this.pickMonthOfBirth.selectOption(month);
		await this.pickYearOfBirth.selectOption(year);
	}

	/**
	 *
	 * Filling Sign Up form with user data
	 * @param {TUser} userData
	 * @param {string} sex
	 * @param {{ day: string; month: string; year: string }} dateOfBirth
	 * @param {string} country
	 * @return {*}  {Promise<void>}
	 * @memberof SignUpPage
	 */
	async fillSignUpForm(
		userData: TUser,
		sex: string,
		dateOfBirth: { day: string; month: string; year: string },
		country: string,
	): Promise<void> {
		await this.passwordInput.fill(userData.password);
		await this.pickSex(sex);
		await this.pickDateOfBirth(
			dateOfBirth.day,
			dateOfBirth.month,
			dateOfBirth.year,
		);
		await this.signUpForNewsLetterCheckBox.check();
		await this.receiveSpecialOfferCheckBox.check();
		await this.firstNameInput.fill(userData.firstName);
		await this.lastNameInput.fill(userData.lastName);
		await this.addressInput.fill(userData.address);
		await this.pickCountry(country);
		await this.stateInput.fill(userData.state);
		await this.cityInput.fill(userData.city);
		await this.zipcodeInput.fill(userData.zipcode);
		await this.mobileNumberInput.fill(userData.number);
	}
}
