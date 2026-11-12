**IMPORTANT: Read these first**

- Prefer changes in below order:
  1. Correctness
  2. Size
  3. Reusing of existing shared logic, components, and style
  4. No excessive coupling of business logic
  5. No excessive abstractions
- Run `npm run lint` for linting, and `npm run format` for formatting.
- Use bare `react-native` primitives, instead of Expo ones.
- Do not run Android Studio or its emulator/simulator.
- Do not run Gradle builds unless the user explicitly asks.
- The user will use the external Android device over ADB for testing. Give them the steps to test.
- Some features are Android-only as iOS support is yet to be developed.
- Run `npx react-native-asset` after changing bundled font assets so iOS and Android asset links stay in sync.
- The user might use below short forms to denote specific languages. This is a custom in Hong Kong English technical jargon, carries no specific meaning, and does not replace ISO 639.
  - EN, 英: English
  - TC, 繁體, 繁: Traditional Chinese
  - SC, 简体, 简: Simplified Chinese
- When doing translations, be careful to write each language's version as if written by native speakers of that language, eg nuance, sentence structure, and vocabulary. Avoid making text feel clearly translated from English.
- The app and widget icons are both generated from SVGs, and the generation scripts are at `./scripts`.
- Keep `specs.md` updated when behavior changes in a way that affects what the app should do.
- Before or alongside future feature or behavior changes, update `specs.md` if the intended user-facing behavior changes or needs clarification.
