import type { APIResponse } from "@playwright/test";
import BaseApi from "./baseApi";

export class AuthApi extends BaseApi {
	verifyLogin(email: string, password: string): Promise<APIResponse> {
		return this.httpPost("/api/verifyLogin", { email, password });
	}

	verifyLoginMissingEmail(password: string): Promise<APIResponse> {
		return this.httpPost("/api/verifyLogin", { password });
	}

	deleteVerifyLogin(): Promise<APIResponse> {
		return this.httpDelete("/api/verifyLogin");
	}
}
