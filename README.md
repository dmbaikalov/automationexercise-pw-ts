# Automation Exercise - Playwright TypeScript

A simple (E2E) testing framework built with **Playwright** and **TypeScript**. This framework tests a web application using automated browser testing, following the **Page Object Model** pattern.

---

## 🎯 What Is This Framework?

This is an automated testing framework that:

- Automates testing of web applications across multiple browsers
- Uses TypeScript for better code organization and type safety
- Follows the Page Object Model (POM) pattern to keep tests maintainable
- Runs tests in parallel for faster execution
- Generates beautiful HTML reports after test runs

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone or download the project**

   ```bash
   cd automationexercise-pw-ts
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` (if it exists)
   - Update the `BASE_URL` in the `.env` file with your test application URL

---

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test Suite

Run only admin tests:

```bash
npm run test:admin
```

Run only default user tests:

```bash
npm run test:default-user
```

### View Test Results

After running tests, open the HTML report:

```bash
npx playwright show-report
```

---

## 📁 Project Structure

```
automationexercise-pw-ts/
└── src/
    ├── fixtures/
    │   └── fixtures.ts                # Playwright fixtures - app instance, test user builder, auth setup
    ├── page_objects/
    │   ├── index.ts                   # Barrel export file for all page objects
    │   ├── basePage.po.ts             # Base class with common page methods (open, wait, etc.)
    │   ├── app.po.ts                  # Facade page - aggregates all page objects
    │   ├── home_page/
    │   │   ├── index.ts               # Barrel export
    │   │   └── homePage.po.ts         # Home page methods and locators
    │   ├── login_page/
    │   │   ├── index.ts               # Barrel export
    │   │   └── loginPage.po.ts        # Login form methods and locators
    │   ├── signup_page/
    │   │   ├── index.ts               # Barrel export
    │   │   └── signupPage.po.ts       # Sign up form methods and locators
    │   └── contact_us/
    │       ├── index.ts               # Barrel export
    │       └── contactUs.po.ts        # Contact form methods and locators
    ├── specs/                         # Test files
    │   ├── auth/
    │   │   ├── login.spec.ts          # Login scenario tests
    │   │   └── signUp.spec.ts         # Sign up scenario tests
    │   ├── contact_us/
    │   │   └── contactUs.spec.ts      # Contact form submission tests
    │   └── setup/
    │       ├── global.setup.ts        # Pre-test setup (authentication, data prep)
    │       └── global.teardown.ts     # Post-test cleanup
    ├── test-data/
    │   └── userIncorrectData.ts       # Test data for negative scenarios
    ├── types/
    │   └── User.types.ts              # TypeScript interfaces for User object
    └── utils/
        └── createRandUser.ts          # UserBuilder class for generating random test users
│
├── playwright.config.ts               # Main Playwright config - defines testDir, browsers, reporters, timeouts, trace/screenshot settings
├── tsconfig.json                      # TypeScript compiler config - ES2022 target, strict type checking, commonjs modules
├── biome.json                         # Code formatter & linter config - Biome rules, git integration, formatting style
├── env-config.ts                      # Environment variables handler - loads .env, exports config object for baseUrl, credentials
├── globals.ts                         # Global constants - storage paths for authentication contexts
├── package.json                       # Project dependencies - Playwright, TypeScript, Faker, Biome, Husky
└── README.md                          # This file
```

---

## 📝 Understanding the Page Object Model (POM)

The **Page Object Model** is a design pattern that makes tests easier to maintain.

### What is it?

- Each page/component gets its own file with methods for interactions
- Tests use these methods instead of writing Playwright code directly
- If the page changes, you only update the page object file

### Example:

**Page Object (login_page/loginPage.po.ts):**

```typescript
export class LoginPage extends BasePage {
  async fillLoginForm(email: string, password: string) {
    await this.emailInputField.fill('[data-qa="email"]', email);
    await this.passwordInputField.fill('[data-qa="password"]', password);
    await this.submitBtn.click('[data-qa="login-btn"]');
  }
}
```

**Test (auth/login.spec.ts):**

```typescript
test("should login successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("user@example.com", "password123");
  // Assert user is logged in
});
```

---

## 🛠️ Useful Commands

| Command                      | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `npm test`                   | Run all tests                       |
| `npm run test:admin`         | Run tests tagged with @admin        |
| `npm run test:default-user`  | Run tests tagged with @default-user |
| `npm run lint`               | Fix code style issues               |
| `npm run format`             | Format code automatically           |
| `npx playwright show-report` | View test report                    |

---

## 📂 Key Files Explained

- **playwright.config.ts** - Configuration file for Playwright (timeouts, retries, reporters, etc.)
- **tsconfig.json** - TypeScript configuration
- **biome.json** - Code style and linting rules
- **package.json** - Project dependencies and scripts
- **env-config.ts** - Environment variables setup

---

## 🔍 Writing Your First Test

1. Create a test file in `src/specs/` folder
2. Import the page object you need
3. Use `test()` to write your test case:

```typescript
import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home_page";

test("should navigate to homepage", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();
  await expect(page).toHaveTitle(/Your App Title/);
});
```

---

## 🎓 Learning Resources

- [Playwright Official Docs](https://playwright.dev/)
- [TypeScript Basics](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Refactoring.Guru](https://refactoring.guru/) - Good resource to read about design patterns and best practices

---

## 💡 Tips for Beginners

- Always use **data-qa** attributes for element selection (more stable than CSS classes)
- Keep page objects focused on one page/component
- Use meaningful test names (what should happen, not how)
- Check the HTML report to see screenshots of failed tests
- Use `page.locator()` instead of deprecated methods

---

## ❓ Troubleshooting

**Tests are timing out?**

- Increase timeouts in `playwright.config.ts`
- Check if the website is responding

**Tests pass locally but fail in CI?**

- Check CI logs
- Check environment variables in your CI configuration
- Ensure BASE_URL is correct

**Can't find elements in tests?**

- Use `npx playwright codegen` to generate selectors
- Use `npx playwright --ui` to run test in ui mode with ability to check selectors
- Check if the element has a `data-qa` attribute

---

**Happy Testing! 🎉**
