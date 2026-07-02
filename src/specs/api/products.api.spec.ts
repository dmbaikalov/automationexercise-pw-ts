import { expect, test } from "../../fixtures/fixtures";

test.describe("Products API", {
	tag: ["@api", "@api_products", "@regression", "@smoke"],
}, () => {
	test("GET /api/productsList returns all products", async ({ apiClient }) => {
		const response = await apiClient.products.getAll();
		const body = await response.json();

		expect(body.responseCode).toBe(200);
		expect(Array.isArray(body.products)).toBeTruthy();
		expect(body.products.length).toBeGreaterThan(0);
	});

	test("POST /api/productsList returns 405 method not allowed", async ({
		apiClient,
	}) => {
		const response = await apiClient.products.post();
		const body = await response.json();

		expect(body.responseCode).toBe(405);
	});
});
