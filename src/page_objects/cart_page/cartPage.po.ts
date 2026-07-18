import type { Locator, Page } from "@playwright/test";
import BasePage from "../basePage.po";

export class CartPage extends BasePage {
	constructor(page: Page) {
		super(page, "/view_cart");
	}

	productName(productId: number): Locator {
		return this.page.locator(`#product-${productId} .cart_description h4`);
	}

	removeProductBtn(productId: number): Locator {
		return this.page.locator(
			`.cart_quantity_delete[data-product-id="${productId}"]`,
		);
	}
}
