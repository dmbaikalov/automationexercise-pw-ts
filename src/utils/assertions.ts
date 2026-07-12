import { expect, type Page } from "@playwright/test";

export async function assertTextVisible(
	page: Page,
	text: string,
): Promise<void> {
	await expect(page.getByText(text)).toBeVisible();
}
