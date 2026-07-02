export type TApiResponse = {
	responseCode: number;
	message: string;
};

export type TCategory = {
	usertype: { usertype: string };
	category: string;
};

export type TProduct = {
	id: number;
	name: string;
	price: string;
	brand: string;
	category: TCategory;
};

export type TBrand = {
	id: number;
	brand: string;
};

export type TUserDetail = {
	id: number;
	name: string;
	email: string;
	title: string;
	birth_day: string;
	birth_month: string;
	birth_year: string;
	first_name: string;
	last_name: string;
	company: string;
	address1: string;
	address2: string;
	country: string;
	state: string;
	city: string;
	zipcode: string;
	mobile_number: string;
};
