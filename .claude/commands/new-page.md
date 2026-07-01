Create a new Page Object for the automationexercise-pw-ts project.

The argument is the page name and its URI path, e.g. "ProductPage /products".

$ARGUMENTS

## Rules

Follow the Page Object conventions in CLAUDE.md exactly:

1. Create a directory `src/page_objects/<page_name>/` with two files:
   - `<pageName>.po.ts` — the class
   - `index.ts` — barrel export (no `.ts` extension in the import path)
2. The class extends `BasePage` and calls `super(page, "/uri-path")` in its constructor.
3. All locators are `get` properties returning `Locator`. Use `getByTestId(...)` (maps to `data-qa`) as the first choice, then `getByRole`, then `locator()` as a last resort.
4. Private locators (used only within the class) are `private get`.
5. Interaction methods (fill, click, select) are `async` with explicit `Promise<void>` return type.
6. Assertion helpers must `await` their `expect` call and return `Promise<void>`.
7. No JSDoc comments for obvious TypeScript types — only add a comment when the WHY is non-obvious.
8. Register the new class in `src/page_objects/index.ts` (add a named export).
9. Add a lazy-initialised getter for it in `src/page_objects/app.po.ts` using the `if (!this._x) this._x = new X(this.page);` pattern.
10. Add a private backing field `private _<name>?: <ClassName>;` in `Application`.

## Output

Produce all three file contents (po.ts, index.ts, and the updated app.po.ts / index.ts diffs). After writing, run `npx tsc --noEmit` to confirm no type errors.
