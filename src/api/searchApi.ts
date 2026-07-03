import type { APIResponse } from "@playwright/test";
import BaseApi from "./baseApi";

export class SearchApi extends BaseApi {
	searchProduct(searchTerm: string): Promise<APIResponse> {
		return this.httpPost("/searchProduct", { search_product: searchTerm });
	}

	searchProductMissingParam(): Promise<APIResponse> {
		return this.httpPost("/searchProduct");
	}
}
