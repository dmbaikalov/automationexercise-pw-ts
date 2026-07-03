import { expect, test } from "../../fixtures/fixtures";

test.describe("Search API", {
	tag: ["@api", "@api_search", "@regression", "@smoke"],
}, () => {
	test("POST /api/searchProduct returns matching products", async ({
		apiClient,
	}) => {
		const response = await apiClient.search.searchProduct("top");
		const body = await response.json();

		expect(body.responseCode).toBe(200);
		expect(body.products).toBeInstanceOf(Array);
		expect(body.products.length).toBeGreaterThan(0);
	});

	test("POST /api/searchProduct without parameter returns 400", async ({
		apiClient,
	}) => {
		const response = await apiClient.search.searchProductMissingParam();
		const body = await response.json();

		expect(body.responseCode).toBe(400);
	});
});
