import { existsSync, unlinkSync } from "node:fs";
import { CONTEXT_TESTUSER } from "../../../globals";

export default async function globalTeardown() {
	console.log("Running global teardown...");

	if (existsSync(CONTEXT_TESTUSER)) {
		unlinkSync(CONTEXT_TESTUSER);
		console.log("Deleted user.json");
	}
}
