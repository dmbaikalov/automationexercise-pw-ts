# automationexercise-pw-ts

Playwright + TypeScript automation framework for [automationexercise.com](https://www.automationexercise.com). Covers auth flows (login, logout, sign-up), contact-us form submission, and REST API testing.

## Stack

| Tool | Version | Purpose |
|---|---|---|
| `@playwright/test` | 1.57.0 | Test runner + assertions |
| `typescript` | ^5.9 | Language |
| `@biomejs/biome` | ^2.3 | Linter + formatter (replaces ESLint/Prettier) |
| `@faker-js/faker` | ^10.2 | Random test data |
| `dotenv` | ^17 | Environment variable loading |
| `husky` + `lint-staged` | latest | Pre-commit hooks |

## Directory Structure

```
src/
├── api/
│   ├── baseApi.ts           ← Shared HTTP methods (httpGet, httpPost …)
│   ├── apiClient.ts         ← API entry point — aggregates all API clients
│   ├── index.ts             ← Re-exports all API resource classes
│   ├── productsApi.ts
│   ├── brandsApi.ts
│   ├── searchApi.ts
│   ├── authApi.ts
│   └── accountApi.ts
├── fixtures/
│   └── fixtures.ts          ← Custom test/expect — ALWAYS import from here
├── helpers/
│   └── assertions.ts        ← Stateless assertion helpers
├── page_objects/
│   ├── basePage.po.ts       ← Shared page methods (open, waitForUrl …)
│   ├── app.po.ts            ← Application entry point — aggregates all page objects
│   ├── index.ts             ← Re-exports all page classes
│   ├── navbar/
│   ├── home_page/
│   ├── login_page/
│   ├── signup_page/
│   └── contactUs_page/
├── specs/
│   ├── api/
│   │   ├── products.api.spec.ts
│   │   ├── brands.api.spec.ts
│   │   ├── search.api.spec.ts
│   │   ├── auth.api.spec.ts
│   │   └── account.api.spec.ts
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── signUp.spec.ts
│   ├── contact_us/
│   │   └── contactUs.spec.ts
│   └── setup/
│       ├── global.setup.ts       ← Logs in and saves storage state
│       └── global.teardown.ts    ← Deletes storage state file
├── test_data/
│   ├── contactUsFile.pdf         ← Static upload fixture
│   └── userIncorrectData.ts      ← Parameterized invalid login cases
├── types/
│   ├── User.types.ts             ← TUser type (Readonly)
│   └── Api.types.ts              ← TApiResponse, TProduct, TBrand, TUserDetail
└── utils/
    └── createRandUser.ts         ← UserBuilder (Builder pattern + Faker)
```

Top-level config files: `playwright.config.ts`, `env-config.ts`, `globals.ts`, `tsconfig.json`, `biome.json`.

## Running Tests

```bash
# Run everything
npx playwright test

# Run by tag
npx playwright test --grep @regression
npx playwright test --grep @smoke
npx playwright test --grep @login
npx playwright test --grep @sign_up
npx playwright test --grep @contact_us

# Run API tests only
npx playwright test --project=api
npx playwright test --grep @api
npx playwright test --grep @api_products
npx playwright test --grep @api_auth
npx playwright test --grep @api_account

# Run a single spec file
npx playwright test src/specs/auth/login.spec.ts
npx playwright test src/specs/api/auth.api.spec.ts

# Open Playwright UI mode
npx playwright test --ui

# Show last HTML report
npx playwright show-report

# Show a trace
npx playwright show-trace test-results/<run>/trace.zip

# Type check
npx tsc --noEmit

# Lint + format
npx @biomejs/biome check --write src/ globals.ts env-config.ts playwright.config.ts
```

## Environment Setup

Copy `.env.example` to `.env` and fill in all values before running locally.

Required variables:

| Variable | Description |
|---|---|
| `BASE_URL` | Target app URL (e.g. `https://www.automationexercise.com`) |
| `BASE_API_URL` | API base URL |
| `USERNAME` | Pre-existing test account display name |
| `EMAIL` | Pre-existing test account email |
| `PASSWORD` | Pre-existing test account password |

## Key Conventions

### Import `test` and `expect` from fixtures — never from `@playwright/test` directly

```ts
// ✅ correct
import { test, expect } from "../../fixtures/fixtures";

// ❌ wrong — bypasses the app fixture and browser annotation
import { test, expect } from "@playwright/test";
```

### Always `await` assertions — missing await is the most common silent bug

```ts
// ✅ auto-retrying assertion — must be awaited
await expect(locator).toBeVisible();
await expect.soft(locator).toBeVisible();

// ✅ boolean method + expect — await the method
expect(await page.isLoggedIn()).toBeTruthy();

// ❌ silent no-op — promise is created and discarded
expect(locator).toBeVisible();
expect.soft(locator).toBeVisible();
```

### Access all page objects through the `app` fixture

```ts
test("...", async ({ app }) => {
    await app.homePage.open();
    await app.loginPage.emailLoginInput.fill("...");
    await app.signUpPage.fillSignUpForm(...);
    await app.contactUsPage.nameInput.fill("...");
});
```

`app` is an `Application` instance that lazy-initialises each page object on first access. Never `new LoginPage(page)` inside a test.

### `beforeEach` navigation is shared — do not repeat it in the test body

Each spec file uses `beforeEach` to navigate to the relevant page. The test body starts from that page — do not click the same navigation elements again.

### `test.describe` must NOT be async

```ts
// ✅ correct
test.describe("Login flow", { tag: ["@login"] }, () => { ... });

// ❌ causes Playwright to miss test collection
test.describe("Login flow", { tag: ["@login"] }, async () => { ... });
```

### Use `Promise.all` only when both sides are truly concurrent

```ts
// ✅ genuine parallel — click triggers navigation, waitForUrl watches for it
await Promise.all([
    app.loginPage.signUpBtn.click(),
    app.waitForUrl("/signup"),
]);

// ❌ no-op — each side is awaited before Promise.all sees them
Promise.all([
    await app.loginPage.signUpBtn.click(),
    await app.waitForUrl("/signup"),
]);
```

In most cases a sequential click → `expect().toBeVisible()` is simpler and more reliable.

## API Object Rules

- One class per resource group (products, brands, search, auth, account), extends `BaseApi`
- `BaseApi` exposes `httpGet/httpPost/httpPut/httpDelete` — never call `request.*` directly from a resource class
- Methods return raw `APIResponse` — parse JSON and assert in the test, not in the API class
- Do not add passthrough constructors — `BaseApi` constructor is inherited automatically
- Private helpers (e.g. `userToForm`) are allowed when the same mapping is reused across methods
- `ApiClient` (`src/api/apiClient.ts`) lazy-initialises each resource class — never `new ProductsApi(request)` in a test

### Access all API clients through the `apiClient` fixture

```ts
test("...", async ({ apiClient }) => {
    const response = await apiClient.products.getAll();
    const body = await response.json();
    expect(body.responseCode).toBe(200);
});
```

### API response assertion pattern

Always parse JSON and assert the body's `responseCode`. For success responses also assert meaningful payload shape:

```ts
// ✅ correct
const response = await apiClient.auth.verifyLogin(email, password);
const body = await response.json();
expect(body.responseCode).toBe(200);

// ✅ also assert payload for data-returning endpoints
expect(Array.isArray(body.products)).toBeTruthy();
expect(body.products.length).toBeGreaterThan(0);

// ❌ avoid — message strings are brittle; responseCode is the contract
expect(body.message).toBe("User exists!");
```

### Account lifecycle in API tests

Use `createRandomUser` for any test that creates an account — the fixture auto-deletes via `DELETE /api/deleteAccount` in teardown regardless of whether the test passed or failed:

```ts
test("...", async ({ apiClient, createRandomUser: userData }) => {
    await apiClient.account.create(userData);  // fixture teardown deletes this
    // ... rest of test
});
```

For delete tests: create the account in the test body, delete it in the assertion step. Teardown will attempt a second delete and fail silently (`.catch(() => {})`).

For read-only account tests (getUserDetail, verifyLogin): use `config.userEmail` / `config.userPassword` — the pre-existing account requires no cleanup.

## Page Object Rules

- One class per page, extends `BasePage`
- Locators are `get` properties that return `Locator` — never store locators in variables across steps
- Complex interactions become named methods (e.g. `fillSignUpForm`, `pickDateOfBirth`)
- Assertion helpers in POMs must always `await` their `expect` calls and return `Promise<void>`
- Private locators (only used internally) are marked `private`
- `data-qa` attributes are the preferred selector strategy (`testIdAttribute: "data-qa"` in config)

## Test Data

### Random user data via `UserBuilder` (fixture)

```ts
test("...", async ({ app, createRandomUser: userData }) => {
    // userData has: firstName, lastName, username, password, email,
    //               address, state, city, zipcode, number
});
```

For custom overrides use `userBuilder`:

```ts
test("...", async ({ userBuilder }) => {
    const user = userBuilder.withEmail("specific@email.com").withUsername("fixed").build();
});
```

### Static invalid-credential cases

Parameterised login failure cases live in `src/test_data/userIncorrectData.ts`. Add new cases there — do not duplicate the loop in the spec.

### File uploads

Place test files in `src/test_data/`. Use `BasePage.uploadFile(locator, "filename.ext")` — the path prefix is handled internally.

## Authentication / Storage State

- **Global setup** (`src/specs/setup/global.setup.ts`) logs in as the pre-existing account and saves session to `playwright/.auth/user.json`.
- Setup runs automatically when the auth file does not exist (`isStorageStateEmpty()` check in config).
- **Global teardown** deletes `playwright/.auth/user.json` and any dynamic `src/test_data/` files after the run.
- Tests that need an authenticated session: `test.use({ storageState: config.testUserContext })`
- Tests that need a guest session: `test.use({ storageState: config.guestContext })`

## Tagging Strategy

| Tag | When to use |
|---|---|
| `@smoke` | Core happy-path — runs on every PR |
| `@regression` | Full suite — runs in CI on push to main |
| `@login` | Login/logout tests |
| `@sign_up` | Registration tests |
| `@contact_us` | Contact form tests |
| `@api` | All API tests |
| `@api_products` | Products API tests |
| `@api_brands` | Brands API tests |
| `@api_search` | Search API tests |
| `@api_auth` | Auth/verifyLogin API tests |
| `@api_account` | Account CRUD API tests |
| `@admin` | Admin-role tests (via `npm run test:admin`) |
| `@default-user` | Standard-user tests (via `npm run test:default-user`) |

## CI/CD (GitHub Actions)

- Triggers on push and PR to `main` only
- `npm ci` + npm cache + Playwright browser cache keyed on `package-lock.json`
- Secrets required: `USERNAME`, `EMAIL`, `PASSWORD`, `BASE_URL`, `BASE_API_URL`
- HTML report is published to GitHub Pages after every run
- Workers: 1 in CI (serialised to share the single test account); unlimited locally

## Common Pitfalls

1. **Missing `await` on any `expect()` call** — Playwright assertions return Promises; a forgotten `await` always passes silently.
2. **`async` on `test.describe`** — Playwright calls describe callbacks synchronously; making them async drops tests silently.
3. **Importing `test`/`expect` from `@playwright/test` directly** — misses the `app` fixture and browser annotation.
4. **Using `isVisible()` as an assertion** — it is a snapshot boolean, not retrying. Use `await expect(locator).toBeVisible()` for assertions.
5. **Creating page objects outside of `app`** — breaks lazy caching and makes tests harder to trace.
6. **Calling `request.*` directly in an API spec** — go through `apiClient.*` so the base URL and request context are managed centrally.
7. **Asserting `body.message` with an exact string** — the site's error messages can change; assert `responseCode` and use `toContain` for partial message checks only when the message is the primary contract.
8. **Adding a passthrough constructor to an API class** — Biome flags it as `noUselessConstructor`; the parent constructor is inherited automatically.
9. **Using `createRandomUser` for read-only API tests** — it spins up cleanup calls unnecessarily. Use `config.userEmail` / `config.userPassword` when the test doesn't create an account.
10. **Running API specs in the `ui e2e` project** — API spec files match `*.api.spec.ts`; the dedicated `api` project picks them up without launching a browser. Don't add `use: { storageState }` to API specs.
