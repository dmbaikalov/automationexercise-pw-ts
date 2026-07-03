import type { APIResponse } from "@playwright/test";
import type { TUser } from "../types/User.types";
import BaseApi from "./baseApi";

export class AccountApi extends BaseApi {
	private userToForm(user: TUser): Record<string, string> {
		return {
			name: user.username,
			email: user.email,
			password: user.password,
			title: "Mr",
			birth_date: "1",
			birth_month: "January",
			birth_year: "2000",
			firstname: user.firstName,
			lastname: user.lastName,
			company: "",
			address1: user.address,
			address2: "",
			country: "United States",
			zipcode: user.zipcode,
			state: user.state,
			city: user.city,
			mobile_number: user.number,
		};
	}

	create(user: TUser): Promise<APIResponse> {
		return this.httpPost("/createAccount", this.userToForm(user));
	}

	getByEmail(email: string): Promise<APIResponse> {
		return this.httpGet("/getUserDetailByEmail", { email });
	}

	update(user: TUser): Promise<APIResponse> {
		return this.httpPut("/updateAccount", this.userToForm(user));
	}

	delete(email: string, password: string): Promise<APIResponse> {
		return this.httpDelete("/deleteAccount", { email, password });
	}
}
