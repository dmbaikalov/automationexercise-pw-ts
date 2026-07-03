---
name: project-full-review-2026-07-03
description: Full codebase review of automationexercise-pw-ts as of 2026-07-03 — key findings and confirmed patterns
metadata:
  type: project
---

## Review date: 2026-07-03

### Critical findings
- `global.setup.ts` line 10: missing `await` on `expect(await app.navbar.isLoggedIn()).toBeTruthy()` — the assertion fires synchronously, setup passes even if login fails
- `login.spec.ts` lines 31, 40, 53: `expect(await ...).toBeTruthy()` pattern — boolean snapshot, not auto-retrying; should use `await expect(locator).toBeVisible()` where applicable
- `signUp.spec.ts` line 54: same boolean snapshot pattern — `expect(await app.loginPage.isErrorMsgVisible(...)).toBeTruthy()`
- `contactUs.po.ts` line 52: `this.page.once("dialog", ...)` is not awaited — dialog handler registered without await is a race condition if the dialog fires before the handler is set
- `global.teardown.ts` line 16-18: deletes entire `src/test_data/` folder — destroys `contactUsFile.pdf` and `userIncorrectData.ts` source files

### Major findings
- `basePage.po.ts` imports `expect` from `@playwright/test` directly (line 1) — should import from fixtures; however BasePage is not a test file so this is a grey area, but `waitForUrl` uses it as an assertion helper
- `signupPage.po.ts` and `contactUs.po.ts` also import `expect` directly from `@playwright/test` — should not matter for POMs but is inconsistent
- `helpers/assertions.ts` imports `expect` from `@playwright/test` directly (line 1)
- `contactUs.po.ts`: `chooseFileBtn` uses `getByRole("button", { name: "Choose file" })` but file inputs are not buttons — the correct approach is `BasePage.uploadFile()` as documented in CLAUDE.md, or `page.getByTestId(...)` on the input; also path is hard-coded as `src/test_data/${fileName}` instead of using `BasePage.uploadFile`
- `BasePage` is missing the `uploadFile` helper documented in CLAUDE.md — no such method exists on the class
- `api` project in `playwright.config.ts` has no `storageState` — correct for stateless API tests, confirmed intentional
- `env-config.ts` has a CI branch that only sets `userName` and `userPassword` but not `userEmail` — CI runs would have a stale `userEmail` from the local env block
- `signUp.spec.ts` missing `@smoke` tag — the happy-path register test is `@regression` only
- `account.api.spec.ts` update test (line 29-43): creates account then updates without asserting the updated field values — only checks `responseCode: 200`, not that data actually changed
- `products.api.spec.ts` / `brands.api.spec.ts`: `expect(Array.isArray(...)).toBeTruthy()` is a weak assertion — prefer `expect(body.products).toBeInstanceOf(Array)` or type-specific Playwright matchers

### Confirmed correct patterns
- All spec files import `test` and `expect` from `../../fixtures/fixtures` (not `@playwright/test`)
- `app` fixture correctly lazy-initializes all page objects — no `new PageClass(page)` in tests
- `test.describe` callbacks are all synchronous — no `async` describe bugs
- `UserBuilder` + `createRandomUser` fixture used for all random user data — no hardcoded user data in tests (except contactUs which correctly uses static `config.userEmail`)
- `storageState` is set correctly per spec: guest for login, testUserContext for contactUs
- Locators are all defined as `get` properties — no stored-locator-variable anti-pattern
- `Promise.all` not misused anywhere
- `createRandomUser` fixture handles DELETE cleanup automatically via teardown in fixture
- Deterministic faker seed tied to test title — good for reproducibility

### Architecture notes
- `BasePage.uploadFile` is documented in CLAUDE.md but does not exist in the implementation — either the docs are ahead of the code or the method was removed
- `NavbarComponent` does not extend `BasePage` — this is intentional (it's a component, not a page) but means it has no access to `open()` or `waitForUrl()`
- `getByRole("heading", { name: "AutomationExercise" })` in `homePage.po.ts` — role-based selector, acceptable since no `data-qa` exists for this element
