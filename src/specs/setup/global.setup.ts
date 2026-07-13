import { authStateExists, config } from "../../../env-config";
import { CONTEXT_TESTUSER } from "../../../globals";
import { expect, test as setup } from "../../fixtures/fixtures";

setup(`Authenticate ${config.userName} user`, async ({ app, page }) => {
	if (authStateExists()) {
		console.info("[Info] Auth state already exists. Skipping login...");
		return;
	}

	await app.loginPage.open();
	await app.waitForLoadState("load");
	await app.loginPage.loginAs({
		email: config.userEmail,
		password: config.userPassword,
	});
	await expect(app.navbar.userIcon).toBeVisible();
	await page.context().storageState({ path: CONTEXT_TESTUSER });
});
