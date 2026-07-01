import { config } from "../../../env-config";
import { CONTEXT_TESTUSER } from "../../../globals";
import { expect, test as setup } from "../../fixtures/fixtures";

setup(`Authenticate ${config.userName} user`, async ({ app, page }) => {
	await app.loginPage.open();

	await app.loginPage.loginAs(config.userEmail, config.userPassword);

	expect(await app.navbar.isLoggedIn()).toBeTruthy();

	await page.context().storageState({ path: CONTEXT_TESTUSER });
});
