import { test as base } from "@playwright/test";
import Application from "../page_objects/app.po";
import type { TUser } from "../types/User.types";
import { UserBuilder } from "../utils/createRandUser";

type TestFixtures = {
	app: Application;
	createRandomUser: TUser;
	userBuilder: UserBuilder;
};

export const test = base.extend<TestFixtures>({
	app: async ({ page }, use) => {
		const app = new Application(page, "/");
		await use(app);
	},

	userBuilder: async (_, use) => {
		await use(UserBuilder.create());
	},

	createRandomUser: async ({ userBuilder }, use) => {
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
	},
});

export { expect } from "@playwright/test";
