# automationexercise-pw-ts

[![Playwright Tests](https://github.com/dmbaikalov/automationexercise-pw-ts/actions/workflows/playwright.yml/badge.svg)](https://github.com/dmbaikalov/automationexercise-pw-ts/actions/workflows/playwright.yml)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-View%20Live-orange)](https://dmbaikalov.github.io/automationexercise-pw-ts/)

End-to-end and API test automation framework for [automationexercise.com](https://www.automationexercise.com), built with **Playwright** and **TypeScript**.

📊 **[View the live test report](https://dmbaikalov.github.io/automationexercise-pw-ts/)** — published to GitHub Pages after every run, no login required.

## What is covered

| Suite | Specs | Level |
|---|---|---|
| Auth | login / logout, sign-up (incl. parameterized negative cases) | UI |
| Contact Us | form submission with file upload | UI |
| Products, Brands, Search | list + negative method checks | API |
| Auth API | verifyLogin positive/negative | API |
| Account API | full CRUD round-trip (create → update → verify → delete) | API |

## Architecture highlights

- **Page Object Model with a lazy facade** — every page object is reached through a single `app` fixture (`Application` aggregates POMs and instantiates them on first access). No `new LoginPage(page)` inside tests.
- **Mirrored API layer** — `BaseApi` (shared HTTP transport) → resource classes (`AccountApi`, `AuthApi`, …) → `ApiClient` facade → `apiClient` fixture. Resource methods return raw `APIResponse`; parsing and assertions live in tests.
- **Custom fixtures with guaranteed cleanup** — `createRandomUser` builds a unique user and deletes the account in teardown even if the test failed.
- **Deterministic randomness** — Faker is seeded from the test title, so every test gets unique data, yet failures always reproduce with the same values.
- **Storage-state authentication** — a `setup` project logs in once and saves the session; `ui e2e` and `api` projects consume it via `dependencies`. Guest vs authenticated context is chosen per spec.
- **Stability by design** — third-party noise (ads, maps) is blocked through a `page.route()` fixture; waits are condition-based (web-first assertions, `load` state) with zero `waitForTimeout` calls.
- **Typed test data** — `Readonly` domain models, custom mapped types (`TMutable<T>`, `TNullable<T>`), fluent builders (`UserBuilder`, `ContactUsBuilder`), and a generic `parseJson<T>` response parser.

## Tech stack

| Tool | Purpose |
|---|---|
| `@playwright/test` 1.57 | Test runner, assertions, API testing |
| TypeScript 5.9 (strict) | Language |
| `@biomejs/biome` | Linting + formatting (single tool) |
| `@faker-js/faker` | Random test data |
| `dotenv` | Environment variables |
| `husky` + `lint-staged` | Pre-commit checks |

## Quick start

```bash
git clone https://github.com/dmbaikalov/automationexercise-pw-ts.git
cd automationexercise-pw-ts
npm ci
npx playwright install chromium
cp .env.example .env   # then fill in the values
```

Required `.env` variables:

| Variable | Description |
|---|---|
| `BASE_URL` | Application URL (`https://www.automationexercise.com`) |
| `BASE_API_URL` | API base URL |
| `USERNAME` | Display name of a pre-existing test account |
| `EMAIL` / `PASSWORD` | Credentials of that account |

## Running tests

```bash
npm test                     # everything (setup → ui e2e + api)
npm run test:smoke           # @smoke tag
npm run test:regression      # @regression tag
npm run test:api             # API project only (no browser)
npm run typecheck            # tsc --noEmit

npx playwright test src/specs/auth/login.spec.ts   # single spec
npx playwright test --ui                           # UI mode
npx playwright show-report                         # last HTML report
```

Tags: `@smoke`, `@regression`, `@login`, `@sign_up`, `@contact_us`, `@api`, `@api_products`, `@api_brands`, `@api_search`, `@api_auth`, `@api_account`.

## Project structure

```
src/
├── api/                  # BaseApi → resource classes → ApiClient facade
├── fixtures/fixtures.ts  # custom test/expect — always import from here
├── page_objects/         # BasePage → page objects → Application facade
├── specs/
│   ├── api/              # *.api.spec.ts — picked up by the api project
│   ├── auth/  contact_us/
│   └── setup/            # global setup (login + storage state) / teardown
├── test_data/            # static upload fixture, parameterized invalid logins
├── types/                # domain & API types, custom mapped types
└── utils/                # builders, parseJson<T>
```

Top-level: `playwright.config.ts` (3 projects: setup / ui e2e / api), `env-config.ts` (fail-fast env validation), `globals.ts` (storage-state paths).

## Example

Page object method ([loginPage.po.ts](src/page_objects/login_page/loginPage.po.ts)):

```ts
async loginAs(creds: TUserCreds): Promise<void> {
    await this.emailLoginInput.fill(creds.email);
    await this.passwordInput.fill(creds.password);
    await this.loginBtn.click();
}
```

Test using the `app` fixture ([login.spec.ts](src/specs/auth/login.spec.ts)):

```ts
test("@TSK-002 Login User with correct email and password", async ({ app }) => {
    await test.step("Submitting login form", async () => {
        await app.loginPage.loginAs({
            email: config.userEmail,
            password: config.userPassword,
        });
    });
    // ...web-first assertions
});
```

## CI (GitHub Actions)

- Runs on every push / PR to `main`, **weekly on Fridays at 23:59 UTC**, and manually via *Run workflow* with a `grep_tag` parameter (e.g. `@smoke`).
- npm cache + Playwright browser cache keyed on `package-lock.json`.
- Credentials come from repository **secrets**; concurrent runs on the same ref are auto-cancelled.
- The **Allure report** is published to **GitHub Pages** after every run (including failed ones) — the repo is public, so the link above is viewable by anyone, no GitHub account needed.
- Each report includes an **Environment** panel (target URL, browser, Playwright/Node versions, git branch/commit) and an **Executor** link back to the exact CI run that produced it.
- Pass/fail trend graphs persist across runs — history data is carried forward from build to build via a GitHub Actions artifact.

## Selector strategy

`data-qa` attributes are the primary strategy (`testIdAttribute: "data-qa"` → `getByTestId`), with semantic `getByRole` locators where markup allows. Raw CSS/XPath selectors do not appear in test files — locators live in page objects only.
