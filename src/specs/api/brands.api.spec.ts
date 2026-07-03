import { expect, test } from "../../fixtures/fixtures";

test.describe("Brands API", {
	tag: ["@api", "@api_brands", "@regression", "@smoke"],
}, () => {
	test("GET /api/brandsList returns all brands", async ({ apiClient }) => {
		const response = await apiClient.brands.getAll();
		const body = await response.json();

		expect(body.responseCode).toBe(200);
		expect(body.brands).toBeInstanceOf(Array);
		expect(body.brands.length).toBeGreaterThan(0);
		expect(body.brands[0]).toMatchObject({
			id: expect.any(Number),
			brand: expect.any(String),
		});
	});

	test("PUT /api/brandsList returns 405 method not allowed", async ({
		apiClient,
	}) => {
		const response = await apiClient.brands.put();
		const body = await response.json();

		expect(body.responseCode).toBe(405);
	});
});
