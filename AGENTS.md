# AGENTS.md

- Keep the app basic unless the user asks for more.
- Use bare `react-native` primitives.
- Do not run Android Studio or its emulator/simulator.
- Do not run Gradle builds unless the user explicitly asks.
- Use the external Android device over ADB for testing.
- Run `npx react-native-asset` after changing bundled font assets so iOS and Android asset links stay in sync.
- Prefer the smallest correct change.
- Keep edits focused and avoid unnecessary abstractions.
