import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class ProductsPage extends BasePage {
	constructor(page: Page) {
		super(page, "/products");
	}

	get allProductsHeader(): Locator {
		return this.page.getByRole("heading", { name: "All Products" });
	}

	get searchedProductsHeader(): Locator {
		return this.page.getByRole("heading", { name: "Searched Products" });
	}

	get searchInput(): Locator {
		return this.page.locator("#search_product");
	}

	get searchBtn(): Locator {
		return this.page.locator("#submit_search");
	}

	get continueShoppingBtn(): Locator {
		return this.page.getByRole("button", { name: "Continue Shopping" });
	}

	productCard(productId: number): Locator {
		return this.page
			.locator(`a.add-to-cart[data-product-id="${productId}"]`)
			.first();
	}

	async searchProduct(productName: string): Promise<void> {
		await this.searchInput.fill(productName);
		await this.searchBtn.click();
	}

	async addProductToCart(productId: number): Promise<void> {
		await this.productCard(productId).click();
		await this.continueShoppingBtn.click();
	}
}
