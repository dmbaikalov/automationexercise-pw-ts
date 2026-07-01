import BasePage from "./basePage.po";
import {
	ContactUs,
	HomePage,
	LoginPage,
	NavbarComponent,
	SignUpPage,
} from "./index";

export default class Application extends BasePage {
	private _navbar?: NavbarComponent;
	private _loginPage?: LoginPage;
	private _homePage?: HomePage;
	private _signUpPage?: SignUpPage;
	private _contactUsPage?: ContactUs;

	get navbar() {
		if (!this._navbar) this._navbar = new NavbarComponent(this.page);
		return this._navbar;
	}

	get loginPage() {
		if (!this._loginPage) this._loginPage = new LoginPage(this.page);
		return this._loginPage;
	}

	get homePage() {
		if (!this._homePage) this._homePage = new HomePage(this.page);
		return this._homePage;
	}

	get signUpPage() {
		if (!this._signUpPage) this._signUpPage = new SignUpPage(this.page);
		return this._signUpPage;
	}

	get contactUsPage() {
		if (!this._contactUsPage) this._contactUsPage = new ContactUs(this.page);
		return this._contactUsPage;
	}
}
