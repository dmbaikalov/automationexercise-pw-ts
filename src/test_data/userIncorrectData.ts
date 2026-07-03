import { config } from "../../env-config";

export const userIncorrectData = [
	{
		label: "valid email, wrong password",
		email: config.userEmail,
		password: "incorrectpassword",
		errorMsg: "Your email or password is incorrect!",
	},
	{
		label: "wrong email, valid password",
		email: "incorrectemail@mail.com",
		password: config.userPassword,
		errorMsg: "Your email or password is incorrect!",
	},
];
