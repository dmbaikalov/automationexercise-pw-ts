import type { APIResponse } from "@playwright/test";
import BaseApi from "./baseApi";

export class BrandsApi extends BaseApi {
	getAll(): Promise<APIResponse> {
		return this.httpGet("/api/brandsList");
	}

	put(): Promise<APIResponse> {
		return this.httpPut("/api/brandsList");
	}
}
