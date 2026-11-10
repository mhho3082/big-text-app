# AGENTS.md

- Keep the app basic unless the user asks for more.
- Use bare `react-native` primitives.
- There are shared components and styles. Search for and prefer them if they exist, over creating your own, unless necessary.
- Do not run Android Studio or its emulator/simulator.
- Do not run Gradle builds unless the user explicitly asks.
- Use the external Android device over ADB for testing.
- Immersive mode and output-screen auto-rotate are Android-only; iOS intentionally skipped.
- Run `npx react-native-asset` after changing bundled font assets so iOS and Android asset links stay in sync.
- Prefer the smallest correct change.
- Keep edits focused and avoid unnecessary abstractions.
- The user might use TC to mean Traditional Chinese, and SC to mean Simplified Chinese. This is a custom in Hong Kong English, and carries no specific meaning.
- The app icon is rendered with `./scripts/generate-app-icon.sh`.
