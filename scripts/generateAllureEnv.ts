import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import playwrightPkg from "@playwright/test/package.json";
import dotenv from "dotenv";

dotenv.config();

const RESULTS_DIR = path.join(__dirname, "..", "allure-results");

function safeGit(command: string): string {
	try {
		return execSync(command, { encoding: "utf-8" }).trim();
	} catch {
		return "unknown";
	}
}

function writeEnvironmentProperties(): void {
	// Allure's environment.properties parser splits each line on the first
	// whitespace, so keys must not contain spaces (dot-separated instead).
	const properties: Record<string, string> = {
		"Base.URL": process.env.BASE_URL ?? "unknown",
		"API.URL": process.env.BASE_API_URL ?? "unknown",
		Browser: "Chromium",
		"Playwright.Version": playwrightPkg.version,
		"Node.Version": process.version,
		OS: `${os.type()} ${os.release()}`,
		Branch:
			process.env.GITHUB_REF_NAME ?? safeGit("git rev-parse --abbrev-ref HEAD"),
		Commit:
			process.env.GITHUB_SHA?.slice(0, 7) ??
			safeGit("git rev-parse --short HEAD"),
		"Triggered.By": process.env.GITHUB_EVENT_NAME ?? "local",
		Environment: process.env.CI ? "CI" : "local",
	};

	const content = `${Object.entries(properties)
		.map(([key, value]) => `${key}=${value}`)
		.join("\n")}\n`;

	fs.mkdirSync(RESULTS_DIR, { recursive: true });
	fs.writeFileSync(path.join(RESULTS_DIR, "environment.properties"), content);
}

function writeExecutorInfo(): void {
	if (!process.env.CI) {
		return;
	}

	const runNumber = process.env.GITHUB_RUN_NUMBER ?? "0";
	const runId = process.env.GITHUB_RUN_ID ?? "";
	const serverUrl = process.env.GITHUB_SERVER_URL ?? "https://github.com";
	const repository = process.env.GITHUB_REPOSITORY ?? "";
	const [owner, repo] = repository.split("/");

	const executor = {
		name: "GitHub Actions",
		type: "github",
		buildName: `Run #${runNumber}`,
		buildOrder: Number(runNumber),
		buildUrl: `${serverUrl}/${repository}/actions/runs/${runId}`,
		reportName: "Allure Report",
		reportUrl:
			owner && repo ? `https://${owner}.github.io/${repo}/` : undefined,
	};

	fs.mkdirSync(RESULTS_DIR, { recursive: true });
	fs.writeFileSync(
		path.join(RESULTS_DIR, "executor.json"),
		JSON.stringify(executor, null, 2),
	);
}

writeEnvironmentProperties();
writeExecutorInfo();
