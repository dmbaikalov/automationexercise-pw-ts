import type { APIRequestContext } from "@playwright/test";
import { AccountApi } from "./accountApi";
import { AuthApi } from "./authApi";
import { BrandsApi } from "./brandsApi";
import { ProductsApi } from "./productsApi";
import { SearchApi } from "./searchApi";

export default class ApiClient {
	private _products?: ProductsApi;
	private _brands?: BrandsApi;
	private _search?: SearchApi;
	private _auth?: AuthApi;
	private _account?: AccountApi;

	constructor(private readonly request: APIRequestContext) {}

	get products(): ProductsApi {
		if (!this._products) this._products = new ProductsApi(this.request);
		return this._products;
	}

	get brands(): BrandsApi {
		if (!this._brands) this._brands = new BrandsApi(this.request);
		return this._brands;
	}

	get search(): SearchApi {
		if (!this._search) this._search = new SearchApi(this.request);
		return this._search;
	}

	get auth(): AuthApi {
		if (!this._auth) this._auth = new AuthApi(this.request);
		return this._auth;
	}

	get account(): AccountApi {
		if (!this._account) this._account = new AccountApi(this.request);
		return this._account;
	}
}
