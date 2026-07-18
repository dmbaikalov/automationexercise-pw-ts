import { config } from "../../../env-config";
import { expect, test } from "../../fixtures/fixtures";

test.beforeEach(async ({ app }) => {
	await test.step("Navigating to Home Page", async () => {
		await app.homePage.open();
		await expect.soft(app.homePage.mainHeader).toBeVisible();
	});

	await test.step("Navigating to Products Page", async () => {
		await app.navbar.productsLink.click();
		await expect.soft(app.productsPage.allProductsHeader).toBeVisible();
	});
});

test.describe("Search Products and Verify Cart After Login", {
	tag: ["@cart", "@smoke", "@regression"],
}, () => {
	test.use({ storageState: config.guestContext });

	const searchTerm = "Top";
	const productsToSearch = [
		{ id: 1, name: "Blue Top" },
		{ id: 5, name: "Winter Top" },
	];

	test("@TSK-006 Search products, add to cart and verify cart persists after login", async ({
		app,
	}) => {
		await test.step("Searching for a product", async () => {
			await app.productsPage.searchProduct(searchTerm);
			await expect(app.productsPage.searchedProductsHeader).toBeVisible();
		});

		await test.step("Verifying searched products are visible", async () => {
			for (const product of productsToSearch) {
				await expect(app.productsPage.productCard(product.id)).toBeVisible();
			}
		});

		await test.step("Adding searched products to cart", async () => {
			for (const product of productsToSearch) {
				await app.productsPage.addProductToCart(product.id);
			}
		});

		await test.step("Verifying products are visible in cart", async () => {
			await app.navbar.cartLink.click();
			for (const product of productsToSearch) {
				await expect(app.cartPage.productName(product.id)).toHaveText(
					product.name,
				);
			}
		});

		await test.step("Logging in", async () => {
			await app.navbar.loginLink.click();
			await app.loginPage.loginAs({
				email: config.userEmail,
				password: config.userPassword,
			});
			await expect(app.navbar.userIcon).toBeVisible();
		});

		await test.step("Verifying products are still visible in cart after login", async () => {
			await app.navbar.cartLink.click();
			for (const product of productsToSearch) {
				await expect(app.cartPage.productName(product.id)).toHaveText(
					product.name,
				);
			}
		});

		await test.step("Cleaning up cart", async () => {
			for (const product of productsToSearch) {
				await app.cartPage.removeProductBtn(product.id).click();
				await expect(app.cartPage.productName(product.id)).not.toBeVisible();
			}
		});
	});
});
