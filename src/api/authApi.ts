import type { APIResponse } from "@playwright/test";
import type { TUserCreds } from "../types/User.types";
import BaseApi from "./baseApi";

export class AuthApi extends BaseApi {
	verifyLogin(creds: TUserCreds): Promise<APIResponse> {
		return this.httpPost("/verifyLogin", {
			email: creds.email,
			password: creds.password,
		});
	}

	verifyLoginMissingEmail(password: string): Promise<APIResponse> {
		return this.httpPost("/verifyLogin", { password });
	}

	deleteVerifyLogin(): Promise<APIResponse> {
		return this.httpDelete("/verifyLogin");
	}
}
