# Copilot Instructions for AI Agents

## Project Overview
This is a minimal static web project with the following structure:
- `index.html`: Main HTML entry point. Uses Indonesian (`lang="id"`).
- `css/style.css`: Stylesheet (currently empty).
- `js/script.js`: JavaScript file (currently empty).

## Key Patterns & Conventions
- All assets are referenced with Windows-style backslashes (e.g., `css\style.css`).
- The HTML references the JS file incorrectly: `<script>src="js\script.js"</script>`. The correct pattern is `<script src="js/script.js"></script>`.
- No build tools, frameworks, or package managers are present. All code is static and directly editable.
- No tests, linters, or automation scripts are present.

## Developer Workflows
- Edit HTML, CSS, and JS files directly. No build or test steps are required.
- Open `index.html` in a browser to view changes.
- Use relative paths for asset references.

## Project-Specific Guidance for AI Agents
- When adding scripts or styles, ensure correct HTML linking syntax and use forward slashes for cross-platform compatibility.
- If introducing new files, place them in the appropriate `css/` or `js/` directory and update `index.html` accordingly.
- If adding new workflows (e.g., build, test), document them here.

## Example: Correct Script Tag
```html
<script src="js/script.js"></script>
```

## No External Dependencies
- There are no external libraries or APIs integrated at this time.

---
Update this file if project structure or conventions change.
