import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";

test.describe("@contact_us @regression Contact Us functionality flow", async () => {
	test.use({ storageState: config.testUserContext });

	test("@TSK-005 Filling Contact Us form", async ({ app }) => {
		await app.homePage.open();
		await app.homePage.contactUsBtn.click();

		expect(await app.contactUsPage.actualUrl()).toContain("/contact_us");
		expect(await app.contactUsPage.mainHeader.isVisible()).toBeTruthy();
		expect(app.contactUsPage.emailInput).toHaveAttribute(
			"required",
			"required",
		);

		await app.contactUsPage.nameInput.fill("");
		await app.contactUsPage.emailInput.fill("");
		await app.contactUsPage.subjectInput.fill("");
		await app.contactUsPage.yourMsgInput.fill("");
		await app.contactUsPage.uploadFile(
			app.contactUsPage.chooseFileBtn,
			"contactUsFile.pdf",
		);
		await app.contactUsPage.submitBtn.click();

		const text = "Success! Your details have been submitted successfully.";
		expect(app.contactUsPage.isTextVisible(text)).toBeTruthy();
	});
});
