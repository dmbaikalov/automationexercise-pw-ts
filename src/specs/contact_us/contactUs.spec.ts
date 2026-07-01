import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";
import { assertTextVisible } from "../../helpers/assertions";

test.beforeEach(async ({ app }) => {
	await test.step("Navigating to Home Page", async () => {
		await app.homePage.open();
		await expect.soft(app.homePage.mainHeader).toBeVisible();
	});

	await test.step("Navigating to Contact Us Page", async () => {
		await app.navbar.contactUsLink.click();
		await expect(app.page).toHaveURL(/\/contact_us/);
		await expect(app.contactUsPage.mainHeader).toBeVisible();
	});
});

test.describe("Contact Us functionality flow", {
	tag: ["@contact_us", "@regression"],
}, () => {
	test.use({ storageState: config.testUserContext });

	test("@TSK-005 Sending Contact Us form", async ({ app }) => {
		await test.step("Validate that email input is required", async () => {
			await expect(app.contactUsPage.emailInput).toHaveAttribute(
				"required",
				"required",
			);
		});

		await test.step("Filling and submitting Contact Us form", async () => {
			await app.contactUsPage.fillAndSubmit(
				{
					name: "Test User",
					email: config.userEmail,
					subject: "Test Inquiry",
					message: "This is an automated test message.",
				},
				"contactUsFile.pdf",
			);
		});

		await test.step("Validating that Contact Us form is successfully submitted", async () => {
			await assertTextVisible(
				app.page,
				"Success! Your details have been submitted successfully.",
			);
		});
	});
});
