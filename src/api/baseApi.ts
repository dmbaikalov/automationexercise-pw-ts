import type { APIRequestContext, APIResponse } from "@playwright/test";
import { config } from "../../env-config";

export default class BaseApi {
	constructor(protected readonly request: APIRequestContext) {}

	protected httpGet(
		path: string,
		params?: Record<string, string>,
	): Promise<APIResponse> {
		return this.request.get(
			`${config.apiUrl}${path}`,
			params ? { params } : undefined,
		);
	}

	protected httpPost(
		path: string,
		form?: Record<string, string>,
	): Promise<APIResponse> {
		return this.request.post(
			`${config.apiUrl}${path}`,
			form ? { form } : undefined,
		);
	}

	protected httpPut(
		path: string,
		form?: Record<string, string>,
	): Promise<APIResponse> {
		return this.request.put(
			`${config.apiUrl}${path}`,
			form ? { form } : undefined,
		);
	}

	protected httpDelete(
		path: string,
		form?: Record<string, string>,
	): Promise<APIResponse> {
		return this.request.delete(
			`${config.apiUrl}${path}`,
			form ? { form } : undefined,
		);
	}
}
