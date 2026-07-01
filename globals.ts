import path from "node:path";

export const CONTEXT_TESTUSER = path.join(
	__dirname,
	"playwright/.auth/user.json",
);

export const CONTEXT_GUEST = { cookies: [], origins: [] };
