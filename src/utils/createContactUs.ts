import { faker } from "@faker-js/faker";
import type { TContactForm } from "../types/ContactForm.types";
import type { TMutable } from "../types/Generic.types";

export class ContactUsBuilder {
	private contactUsData: Partial<TMutable<TContactForm>> = {};

	withName(name?: string): this {
		this.contactUsData.name = name;
		return this;
	}

	withEmail(email?: string): this {
		this.contactUsData.email = email;
		return this;
	}

	withSubject(subject?: string): this {
		this.contactUsData.subject = subject;
		return this;
	}

	withMessage(message?: string): this {
		this.contactUsData.message = message;
		return this;
	}

	build(): TContactForm {
		return {
			name: this.contactUsData.name || faker.person.fullName(),
			email: this.contactUsData.email || faker.internet.email(),
			subject: this.contactUsData.subject || faker.lorem.sentence(),
			message: this.contactUsData.message || faker.lorem.paragraphs(),
		};
	}

	static create(): ContactUsBuilder {
		return new ContactUsBuilder();
	}
}
