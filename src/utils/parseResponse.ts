import type { APIResponse } from "@playwright/test";

// Typed wrapper over response.json(): the caller declares the expected shape once
export async function parseJson<T>(response: APIResponse): Promise<T> {
	return (await response.json()) as T;
}
