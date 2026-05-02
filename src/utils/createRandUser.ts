import { faker } from "@faker-js/faker";
import type { TUser } from "../types/User.types";

export class UserBuilder {
	private userData: Partial<TUser> = {};

	withFirstName(firstName?: string): this {
		this.userData.firstName = firstName;
		return this;
	}

	withLastName(lastName?: string): this {
		this.userData.lastName = lastName;
		return this;
	}

	withUsername(username?: string): this {
		this.userData.username = username;
		return this;
	}

	withPassword(password?: string): this {
		this.userData.password = password;
		return this;
	}

	withEmail(email?: string): this {
		this.userData.email = email;
		return this;
	}

	withAddress(address?: string): this {
		this.userData.address = address;
		return this;
	}

	withState(state?: string): this {
		this.userData.state = state;
		return this;
	}

	withCity(city?: string): this {
		this.userData.city = city;
		return this;
	}

	withZipcode(zipcode?: string): this {
		this.userData.zipcode = zipcode;
		return this;
	}

	withNumber(number?: string): this {
		this.userData.number = number;
		return this;
	}

	build(): TUser {
		return {
			firstName: this.userData.firstName || faker.person.firstName(),
			lastName: this.userData.lastName || faker.person.lastName(),
			username: this.userData.username || faker.internet.username(),
			password: this.userData.password || faker.internet.password(),
			email: this.userData.email || faker.internet.email(),
			address: this.userData.address || faker.location.streetAddress(),
			state: this.userData.state || faker.location.state(),
			city: this.userData.city || faker.location.city(),
			zipcode: this.userData.zipcode || faker.location.zipCode(),
			number:
				this.userData.number || faker.phone.number({ style: "international" }),
		};
	}

	static create(): UserBuilder {
		return new UserBuilder();
	}
}
