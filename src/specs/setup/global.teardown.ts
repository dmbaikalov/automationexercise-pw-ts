import { existsSync, rmSync, unlinkSync } from "node:fs";
import path from "node:path";
import { CONTEXT_TESTUSER } from "../../../globals";

const TEST_DATA_FOLDER = path.resolve(__dirname, "../../test_data");

export default async function globalTeardown() {
	console.log("Running global teardown...");

	if (existsSync(CONTEXT_TESTUSER)) {
		unlinkSync(CONTEXT_TESTUSER);
		console.log("Deleted user.json");
	}

	if (existsSync(TEST_DATA_FOLDER)) {
		rmSync(TEST_DATA_FOLDER, { recursive: true, force: true });
		console.log(`Deleted test-data folder at ${TEST_DATA_FOLDER}`);
	}
}
