import { faker } from "@faker-js/faker";
import { test as base } from "@playwright/test";
import { config } from "../../env-config";
import ApiClient from "../api/apiClient";
import Application from "../page_objects/app.po";
import type { TContactForm } from "../types/ContactForm.types";
import type { TUser } from "../types/User.types";
import { ContactUsBuilder } from "../utils/createContactUs";
import { UserBuilder } from "../utils/createRandUser";

type TestFixtures = {
	app: Application;
	apiClient: ApiClient;
	createRandomUser: TUser;
	userBuilder: UserBuilder;
	contactUsBuilder: ContactUsBuilder;
	createContactUsFormData: TContactForm;
	blockThirdParty: undefined;
};

// Deterministic per-test Faker seed so failures reproduce with the same data
function computeSeed(title: string): number {
	return [...title].reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
}

export const test = base.extend<TestFixtures>({
	// Side-effect fixture: blocks third-party noise (ads, maps) so page scripts bind fast and tests stay stable.
	// Not { auto: true } on purpose — it depends on `page`, and auto would force a browser page for API tests.
	blockThirdParty: async ({ page }, use) => {
		await page.route(
			/googlesyndication|doubleclick|googleads|adtrafficquality|fundingchoices|maps\.google/,
			(route) => route.abort(),
		);
		await use(undefined);
	},

	app: async ({ browser, page, blockThirdParty: _ }, use) => {
		test.info().annotations.push({
			type: "Browser",
			description: `${browser.browserType().name()} ${browser.version()}`,
		});
		const app = new Application(page, "/");
		await use(app);
	},

	apiClient: async ({ request }, use) => {
		await use(new ApiClient(request));
	},

	// biome-ignore lint/correctness/noEmptyPattern: required by Playwright fixture API
	userBuilder: async ({}, use, testInfo) => {
		faker.seed(computeSeed(testInfo.title));
		await use(UserBuilder.create());
	},

	createRandomUser: async ({ userBuilder, request }, use) => {
		const user = userBuilder
			.withFirstName()
			.withLastName()
			.withUsername()
			.withPassword()
			.withEmail()
			.withAddress()
			.withState()
			.withCity()
			.withZipcode()
			.withNumber()
			.build();

		await use(user);

		// Best-effort cleanup — account may not exist if the test failed before creation
		await request
			.delete(`${config.apiUrl}/deleteAccount`, {
				form: { email: user.email, password: user.password },
			})
			.catch(() => {});
	},

	// biome-ignore lint/correctness/noEmptyPattern: required by Playwright fixture API
	contactUsBuilder: async ({}, use, testInfo) => {
		faker.seed(computeSeed(testInfo.title));
		await use(ContactUsBuilder.create());
	},

	createContactUsFormData: async ({ contactUsBuilder }, use) => {
		const testData = contactUsBuilder
			.withEmail()
			.withMessage()
			.withName()
			.withSubject()
			.build();

		await use(testData);
	},
});

export { expect } from "@playwright/test";
