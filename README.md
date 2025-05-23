# Winkwing Coding Rules ✨

## About Winkwing
Winkwing provides instant alerts for new listings, allowing users to access apartments from 950+ websites directly on their phone.

## Getting Started 🚀

### Client Setup
```
git clone https://github.com/WinkwingNL/winkwing-front-end.git
cd /winkwing-front-end-new
yarn install
yarn run build
yarn start
```

### Prerequisites
- Knowledge of React.js

### Important Warning ⛔️
**Do not push your code to the main repository directly**
- Create a new pull request and check for the pipeline to be green
- Wait for code review; if everything looks good, it will be merged by lead developers into `main`
- If you missed something in the pull request, lead developers will write you a comment

## Core Coding Principles 🌟

### 1. Readability
Good code is written to be easily understood by colleagues:
- Properly and consistently formatted
- Uses clear, meaningful names for functions and variables
- Contains concise and accurate comments
- Shows natural decomposition of functionality into simple and specific functions
- Clearly notes all tricky sections
- Makes it easy to understand why the program works in all conceivable cases

### 2. Maintainability
Code should be:
- Straightforward for other programmers to fix bugs or make changes
- Using general functions with minimal assumptions about preconditions
- Marking important values as constants for easy application-wide changes
- Robust in handling any possible input without crashing
- Providing clear messages for disallowed input

### 3. Comments
Comments should make programs readable to humans:
- **Block Comments** use the `/* comments */` style and appear:
  - At the top of every source file (including your name, date, and program purpose)
  - Before functions to describe their purpose (can be omitted only for very short, obvious functions)
- **Inline Comments** use the `// comments` style:
  - Near important lines of code within functions
  - With variables when they are initialized

### 4. Naming Conventions
Names should be unambiguous and descriptive:
- Use capitalization to separate multi-word names: `StoneMasonKarel`
- Capitalize the first letter of class names: `GraphicsProgram`
- Use lowercase for the first letter of function or variable names: `setFilled()`
- Use `x` and `y` only for coordinates
- Use `i`, `j`, and `k` only as variables in for loops
- Avoid other one-letter names: use `area = base * height` instead of `a = b * h`
- Capitalize names of constants, with underscores to separate words: `BRICK_COLOR`
- Use abbreviations cautiously: `max` instead of `maximum` is fine, but `xprd` instead of `crossProduct` is not
- Use PascalCase for Components and their files

### 5. Indentation
- Indent all code within bracketed blocks by one tab
- Each control structure (for, while, if, switch) introduces a new indented block
- Indent even if brackets are omitted for one-line statements
- Line up else statements with their corresponding if statements

### 6. White Space
Use white space consistently:
- Three blank lines between functions
- Individual blank lines within functions to separate key sections
- Add spaces to make expressions more readable: `next = 7 * (prev – 1)` rather than `next=7*(prev-1)`

### 7. Function Usage
- Keep functions short and focused on a specific task
- Follow the "Ten Line Rule" - functions longer than ten lines are trying to do too much
- Avoid repeated code segments; create separate functions instead
- Treat functions as "black boxes" that depend only on their parameters
- Ensure functions handle all possible inputs gracefully

### 8. Deprecated Code
- Avoid using deprecated libraries or methods
- Follow best practices of frameworks and libraries
- Avoid methods that warn of future deprecation

## Technical Guidelines 🛠️

### Development Tools
- Use npm for server, yarn for client
- Use Visual Studio Code with eslint and prettier extensions in their default configuration
- Always follow eslint recommendations

### Code Organization
- Ensure ample commenting throughout your code
- Keep image sizes under 300kb for better website speed and to save database cost
- Keep code files small and divide code into components
- Avoid touching a teammate's code without specific instructions or permission
- Always test your code before pushing to GitHub

## Commit Message Format 📝

Follow the Conventional Commits specification:

### Structure
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Components
1. **Type**: Describes the kind of change:
   - `feat` (new feature)
   - `fix` (bug fix)
   - `docs` (changes to documentation)
   - `style` (formatting; no code change)
   - `refactor` (refactoring production code)
   - `test` (adding missing tests)
   - `chore` (maintenance tasks)

2. **Scope**: Specifies the place of the change (e.g., `login`, `UserProfileComponent`)

3. **Description**:
   - Use imperative mood ("add" not "adds" or "added")
   - Don't capitalize the first letter
   - Don't end with a period

### Example
```
feat(auth): add support for OAuth2

Adds OAuth2 support to the authentication module to allow more flexible token management.

Fixes #123
```

### Example Commit Command
```
git commit -m "fix(code cleaning): fix typecheck and lint errors" -m "This update fixes errors related to types and lint." -m "Related to issue #001"
```

removecommentjustforcommit
