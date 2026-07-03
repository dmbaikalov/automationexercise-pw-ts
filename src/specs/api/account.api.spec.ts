import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";
import type { TUserDetail } from "../../types/Api.types";

test.describe("Account API", {
	tag: ["@api", "@api_account", "@regression", "@smoke"],
}, () => {
	test("POST /api/createAccount creates a new account", async ({
		apiClient,
		createRandomUser: userData,
	}) => {
		const response = await apiClient.account.create(userData);
		const body = await response.json();

		expect(body.responseCode).toBe(201);
	});

	test("GET /api/getUserDetailByEmail returns user details", async ({
		apiClient,
	}) => {
		const response = await apiClient.account.getByEmail(config.userEmail);
		const body: { responseCode: number; user: TUserDetail } =
			await response.json();

		expect(body.responseCode).toBe(200);
		expect(body.user.email).toBe(config.userEmail);
	});

	test("PUT /api/updateAccount updates an existing account", async ({
		apiClient,
		createRandomUser: userData,
	}) => {
		await apiClient.account.create(userData);

		const updateResponse = await apiClient.account.update({
			...userData,
			firstName: "Updated",
			lastName: "User",
		});
		const updateBody = await updateResponse.json();
		expect(updateBody.responseCode).toBe(200);

		const getResponse = await apiClient.account.getByEmail(userData.email);
		const getBody: { responseCode: number; user: TUserDetail } =
			await getResponse.json();
		expect(getBody.responseCode).toBe(200);
		expect(getBody.user.first_name).toBe("Updated");
		expect(getBody.user.last_name).toBe("User");
	});

	test("DELETE /api/deleteAccount deletes an existing account", async ({
		apiClient,
		userBuilder,
	}) => {
		const userData = userBuilder.build();

		await apiClient.account.create(userData);

		const response = await apiClient.account.delete(
			userData.email,
			userData.password,
		);
		const body = await response.json();

		expect(body.responseCode).toBe(200);
	});
});
