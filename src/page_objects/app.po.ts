import BasePage from "./basePage.po";
import { ContactUs, HomePage, LoginPage, SignUpPage } from "./index";

export default class Application extends BasePage {
	get loginPage() {
		return new LoginPage(this.page);
	}

	get homePage() {
		return new HomePage(this.page);
	}

	get signUpPage() {
		return new SignUpPage(this.page);
	}

	get contactUsPage() {
		return new ContactUs(this.page);
	}
}
