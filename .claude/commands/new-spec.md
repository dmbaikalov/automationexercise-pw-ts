Create a new Playwright test spec file for the automationexercise-pw-ts project.

The argument is a short feature name, e.g. "product listing" or "checkout".

$ARGUMENTS

## Rules

Follow every convention in CLAUDE.md exactly. Key points:

1. Place the file under `src/specs/<feature-group>/<featureName>.spec.ts` — use snake_case for the folder and camelCase for the file name.
2. Import `test` and `expect` ONLY from `../../fixtures/fixtures` — never from `@playwright/test`.
3. Import `config` from the appropriate relative path to `env-config.ts`.
4. Add a `test.beforeEach` that navigates to the relevant starting page using the `app` fixture. Always `await` every `expect.soft()` inside hooks.
5. Wrap the tests in a `test.describe` with appropriate `tag` array. The describe callback must NOT be `async`.
6. Each test must have a ticket ID prefix in its name, e.g. `"@TSK-XXX <description>"`.
7. Structure test bodies with `await test.step(...)` blocks.
8. Always `await` every assertion: `await expect(...)`, `await expect.soft(...)`, `expect(await method()).toBe...`.
9. Set `storageState` via `test.use(...)` inside the describe block — use `config.testUserContext` for authenticated, `config.guestContext` for guest.
10. Do not use `Promise.all` unless both sides are genuinely concurrent (click + navigation watch). Sequential `click()` → `expect().toBeVisible()` is preferred.

## Output

Produce the full TypeScript file content ready to save. After writing the file, run `npx tsc --noEmit` to confirm no type errors.
