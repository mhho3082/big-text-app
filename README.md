<div align="center">

# Big Text

![App Icon](./assets/app-icon-256.png)

Read this README in [Traditional Chinese](README-tc.md) or [Simplified Chinese](README-sc.md).

Big Text is an Android app for turning short messages into bold, full-screen text that is easy to read at a glance.
It is built for quick signs, event callouts,
and anything else that needs to stand out from across the room.

</div>

## What It Does

- 📱 Built for phones and tablets: Looks good on both smaller and larger screens
- 📝 Fast message display: Type or paste text, then put it on screen in seconds
- 🎨 Flexible colors: Tune the text and background to match the moment
- 🔤 Font selection: Choose from a variety of bundled Chinese and English fonts
- ↔️ Flexible alignment: Top left, bottom right, or anywhere in between
- 📏 Font sizing: Use automatic sizing, or switch to custom sizing and adjust it with a simple swipe
- ✨ Motion animations: Blink, pulse, and cross variants for a little extra emphasis
- 📤 Sharing: Share the message as an image in landscape, portrait, or square formats
- 📨 Open from shared: Send text into the app for quick display
- 🕘 History: Reuse recent display settings, or show them directly again
- 🌐 Languages: Switch between English, Traditional Chinese, and Simplified Chinese
- 🌙 Easy on the eyes: Toggle the home screen between light and dark mode

## Quick Start

### Requirements

- `Node.js` 22.11 or newer
- Android development environment set up for React Native
- An Android device or emulator
- iOS support is not developed yet

### Install Dependencies

```sh
npm install
```

### Start Metro

```sh
npm start
```

### Run on Android

```sh
npm run android
```

If you are using a connected physical Android device, this repository also includes a helper script:

```sh
npm run android:physical
```

### Useful Commands

```sh
npm run lint
npm test
```

## Notes

- The app is currently focused on Android behavior such as immersive display mode, keeping the screen awake, and sensor-based rotation while showing text.
- Font assets are bundled with the app, so the available font list is ready to use after install.

## Typical Workflow

1. Open the app.
2. Enter text on the home screen.
3. Choose colors, font, size, alignment, and animation.
4. Tap Display to show the text full screen.
5. Use History if you want to reuse or delete previous setups.

## Project Scripts

- `npm start` starts Metro.
- `npm run android` builds and launches the app on Android.
- `npm run android:physical` launches to a connected physical Android device.
