import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";

test.describe("Auth API", {
	tag: ["@api", "@api_auth", "@regression"],
}, () => {
	test("POST /api/verifyLogin with valid credentials returns 200", async ({
		apiClient,
	}) => {
		const response = await apiClient.auth.verifyLogin(
			config.userEmail,
			config.userPassword,
		);
		const body = await response.json();

		expect(body.responseCode).toBe(200);
	});

	test("POST /api/verifyLogin with missing email returns 400", async ({
		apiClient,
	}) => {
		const response = await apiClient.auth.verifyLoginMissingEmail(
			config.userPassword,
		);
		const body = await response.json();

		expect(body.responseCode).toBe(400);
	});

	test("DELETE /api/verifyLogin returns 405 method not allowed", async ({
		apiClient,
	}) => {
		const response = await apiClient.auth.deleteVerifyLogin();
		const body = await response.json();

		expect(body.responseCode).toBe(405);
	});

	test("POST /api/verifyLogin with invalid credentials returns 404", async ({
		apiClient,
	}) => {
		const response = await apiClient.auth.verifyLogin(
			"invalid@example.com",
			"wrongpassword123",
		);
		const body = await response.json();

		expect(body.responseCode).toBe(404);
	});
});
