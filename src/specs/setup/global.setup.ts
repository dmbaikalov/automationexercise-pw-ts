import { config } from "../../../env-config";
import { CONTEXT_TESTUSER } from "../../../globals";
import { expect, test as setup } from "../../fixtures/fixtures";

setup(`Authenticate ${config.userName}`, async ({ app, page }) => {
	await app.loginPage.open();

	await app.loginPage.emailLoginInput.fill(config.userEmail);
	await app.loginPage.passwordInput.fill(config.userPassword);
	await app.loginPage.loginBtn.click();

	expect(await app.homePage.isLoggedIn()).toBeTruthy();

	await page.context().storageState({ path: CONTEXT_TESTUSER });
});
