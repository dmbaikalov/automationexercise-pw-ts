import BasePage from "./basePage.po";
import { ContactUs, HomePage, LoginPage, SignUpPage } from "./index";

/**
 * Represents the application under test
 */

export default class Application extends BasePage {
	/**
	 * @type {LoginPage}
	 */
	get loginPage() {
		return new LoginPage(this.page);
	}

	/**
	 * @type {HomePage}
	 */
	get homePage() {
		return new HomePage(this.page);
	}

	/**
	 * @type {SignUpPage}
	 */
	get signUpPage() {
		return new SignUpPage(this.page);
	}

	/**
	 * @type {ContactUs}
	 */
	get contactUsPage() {
		return new ContactUs(this.page);
	}
}
