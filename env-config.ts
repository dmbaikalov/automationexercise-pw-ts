import fs from "node:fs";
import dotenv from "dotenv";
import { CONTEXT_GUEST, CONTEXT_TESTUSER } from "./globals";

dotenv.config();

console.info("[Info] Test environment: local");

const config = {
	baseUrl: getEnvVar("BASE_URL"),
	apiUrl: getEnvVar("BASE_API_URL"),
	userName: getEnvVar("USERNAME"),
	userEmail: getEnvVar("EMAIL"),
	userPassword: getEnvVar("PASSWORD"),
	testUserContext: CONTEXT_TESTUSER,
	guestContext: CONTEXT_GUEST,
};

function getEnvVar(key: string): string {
	const value = process.env[key];
	if (isNonEmptyStr(value)) {
		return value;
	}
	throw new Error(
		`[Error] Environment variable "${key}" is missing or empty. Received: ${value}`,
	);
}

function isNonEmptyStr(val: unknown): val is string {
	return typeof val === "string" && val.trim().length > 0;
}

export function isStorageStateEmpty() {
	if (fs.existsSync(CONTEXT_TESTUSER)) {
		console.info("[Info] Storage state files already exist. Skipping setup...");
		return false;
	}

	console.info("[Info] Storage state is empty. Proceeding with login...");
	return true;
}

export { config };
