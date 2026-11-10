# AGENTS.md

- Prefer the smallest correct change, unless the user asks for refactoring or restructuring.
- Keep edits focused and avoid unnecessary abstractions.
- Use bare `react-native` primitives, instead of Expo ones.
- There are shared components and styles. Search for and prefer them if they exist, over creating your own, unless necessary.
- Do not run Android Studio or its emulator/simulator.
- Do not run Gradle builds unless the user explicitly asks.
- The user will use the external Android device over ADB for testing. Give them the steps to test.
- Some features are Android-only as iOS support is yet to be developed.
- Run `npx react-native-asset` after changing bundled font assets so iOS and Android asset links stay in sync.
- The user might use TC to mean Traditional Chinese, and SC to mean Simplified Chinese. This is a custom in Hong Kong English, and carries no specific meaning.
- The app icon is rendered with `./scripts/generate-app-icon.sh`.
