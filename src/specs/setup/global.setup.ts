import { config, isStorageStateEmpty } from "../../../env-config";
import { CONTEXT_TESTUSER } from "../../../globals";
import { expect, test as setup } from "../../fixtures/fixtures";

setup(`Authenticate ${config.userName} user`, async ({ app, page }) => {
	if (!isStorageStateEmpty()) return;

	await app.loginPage.open();
	await app.loginPage.loginAs(config.userEmail, config.userPassword);
	await expect(app.navbar.userIcon).toBeVisible();
	await page.context().storageState({ path: CONTEXT_TESTUSER });
});
