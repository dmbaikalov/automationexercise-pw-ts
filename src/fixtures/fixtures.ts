import { faker } from "@faker-js/faker";
import { test as base } from "@playwright/test";
import { config } from "../../env-config";
import ApiClient from "../api/apiClient";
import Application from "../page_objects/app.po";
import type { TUser } from "../types/User.types";
import { UserBuilder } from "../utils/createRandUser";

type TestFixtures = {
	app: Application;
	apiClient: ApiClient;
	createRandomUser: TUser;
	userBuilder: UserBuilder;
};

export const test = base.extend<TestFixtures>({
	app: async ({ browser, page }, use) => {
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
		// Deterministic seed so failures reproduce with the same data
		const seed = [...testInfo.title].reduce(
			(acc, c, i) => acc + c.charCodeAt(0) * (i + 1),
			0,
		);
		faker.seed(seed);
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
});

export { expect } from "@playwright/test";
