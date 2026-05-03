import fs from "node:fs";
import { CONTEXT_TESTUSER, CONTEXT_GUEST } from "./globals";
import dotenv from "dotenv";
dotenv.config();

const processEnv = process.env.TEST_ENV;
const env = processEnv || "local";

console.info(`[Info] Test environment: ${env}`);

const config = {
  baseUrl: getEnvVar("BASE_URL") || "",
  apiUrl: getEnvVar("BASE_API_URL") || "",
  userName: getEnvVar("USERNAME") || "",
  userEmail: getEnvVar("EMAIL") || "",
  userPassword: getEnvVar("PASSWORD") || "",
  testUserContext: CONTEXT_TESTUSER,
  guestContext: CONTEXT_GUEST,
};

if (env === "ci") {
  config.userName = getEnvVar("CI_USER");
  config.userPassword = getEnvVar("CI_PASSWORD");
  config.testUserContext = CONTEXT_TESTUSER;
}

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (isNonEmptyStr(value)) {
    return value;
  } else {
    throw new Error(
      `[Error] Environment variable "${key}" is missing or empty. Received: ${value}`,
    );
  }
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
