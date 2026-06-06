import { config } from "../../env-config";

export const userIncorrectData = [
	{
		email: config.userEmail,
		password: "incorrectpassword",
		errorMsg: "Your email or password is incorrect!",
	},
	{
		email: "incorrectemail@mail.com",
		password: config.userPassword,
		errorMsg: "Your email or password is incorrect!",
	},
];
