import type { APIResponse } from "@playwright/test";
import BaseApi from "./baseApi";

export class ProductsApi extends BaseApi {
	getAll(): Promise<APIResponse> {
		return this.httpGet("/productsList");
	}

	post(): Promise<APIResponse> {
		return this.httpPost("/productsList");
	}
}
