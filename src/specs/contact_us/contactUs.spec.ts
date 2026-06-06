import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";

test.beforeEach(async ({ app }) => {
	await test.step("Navigating to Home Page", async () => {
		await app.homePage.open();
		expect.soft(app.homePage.mainHeader).toBeVisible();
	});

	await test.step("Navigating to Contact Us Page", async () => {
		await app.homePage.contactUsBtn.click();
		expect(await app.contactUsPage.actualUrl()).toContain("/contact_us");
		expect(await app.contactUsPage.mainHeader.isVisible()).toBeTruthy();
	});
});

test.describe("Contact Us functionality flow", {
	tag: ["@contact_us", "@regression"],
}, async () => {
	test.use({ storageState: config.testUserContext });

	test("@TSK-005 Sending Contact Us form", async ({ app }) => {
		await test.step("Validate that email input is required", async () => {
			expect(app.contactUsPage.emailInput).toHaveAttribute(
				"required",
				"required",
			);
		});

		await test.step("Filling and submitting Contact Us form", async () => {
			await app.contactUsPage.nameInput.fill("");
			await app.contactUsPage.emailInput.fill("");
			await app.contactUsPage.subjectInput.fill("");
			await app.contactUsPage.yourMsgInput.fill("");
			await app.contactUsPage.uploadFile(
				app.contactUsPage.chooseFileBtn,
				"contactUsFile.pdf",
			);
			await app.contactUsPage.submitBtn.click();
		});

		await test.step("Validating that Contact Us form is successfully submitted", async () => {
			const text = "Success! Your details have been submitted successfully.";
			expect(app.contactUsPage.isTextVisible(text)).toBeTruthy();
		});
	});
});
