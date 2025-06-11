# Changelog: sendbird-ai-agent (Last 24h)

## Major Changes

### 1. Directory Restructure for JS & React
- **PR #75** ([chore/restructure-js-dir](https://github.com/sendbird/sendbird-ai-agent/pull/75))
- Applied a new directory structure for JavaScript and React codebases.
- Moved `js/README.md` and `js/MULTILANGUAGE.md` to `js/cdn/` and created a new `react/` directory with its own `README.md` and `MULTILANGUAGE.md`.
- Added a new React SDK quickstart guide and localization guide.
- Updated sample code and dependency files (`sample/package.json`, `pnpm-lock.yaml`) to include `@sendbird/ai-agent-messenger-react`.
- Refactored sample app structure for better modularity between CDN and React integrations.
- **Files affected:**  
  - Many files moved from `js/` and `sample/` to new locations under `js/cdn/`, `js/live-example/`, and `react/`.
  - New files: `react/README.md`, `react/MULTILANGUAGE.md`, `sample/src/components/sections/reactExample/`, etc.

### 2. Update JS Resource Link
- **Commit:** [f94bfcf](https://github.com/sendbird/sendbird-ai-agent/commit/f94bfcfeb38aaf15de20973e30bf45968289f186)
- Updated resource links in documentation to reflect new directory structure.

### 3. Add React SDK Documentation and Examples
- **Commit:** [5c6bc28](https://github.com/sendbird/sendbird-ai-agent/commit/5c6bc2819c849d7614c85a40c164988fc87b7ad5)
- Added comprehensive React integration examples, advanced features, and code samples.
- Improved code organization and modularity for both React and CDN sample apps.

---

## Summary of Impact

- **Developers**: Easier onboarding for React and JS SDKs, clearer documentation, and improved sample structure.
- **Docs**: New React-specific guides and localization docs.
- **Codebase**: Refactored to better separate CDN and React integrations, added modular code samples, improved cleanup and context features.

---
