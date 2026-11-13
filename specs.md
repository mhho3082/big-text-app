# Big Text Specs

## Purpose

- The app lets a user turn a short message into a full-screen, highly legible display.
- The app also lets a user share that message as an image, as plain text, as a QR code, or as wallpaper.
- The app provides a homescreen widget called Quick Display that can launch the display view directly.

## Core App Behavior

- The app starts on a home screen where the user can edit the current message and its presentation settings.
- The app remembers the last-used message and settings when the user leaves and returns later.
- The app supports English, Traditional Chinese, and Simplified Chinese.
- The app supports light mode and dark mode.

## Home Screen

- The home screen shows the app title, language selector, theme toggle, and access to history.
- The user can enter or edit the message text.
- The user can choose the text color and background color.
- The user can choose the font used for display.
- The user can choose the text size mode.
- The user can choose a custom text size.
- The user can choose the text alignment.
- The user can choose the screen orientation for the display.
- The user can choose an animation style for the displayed text.
- The user can choose an animation interval.
- The user can open the history view from the home screen.
- The user can open the display view from the home screen.
- The user can open sharing actions from the home screen.

## Display View

- The display view shows the current message in a large, readable format.
- The display view uses the selected text color, background color, font, size, alignment, orientation, and animation settings.
- If the user double-taps the display, the app leaves the display view.
- If the user is using custom sizing, the user can adjust the size from the display view by dragging.
- The display view should stay readable and fill the screen as much as possible.

## Share Behavior

- The app can share the current message as an image.
- The app can share the current message as an image in landscape, portrait, or square format.
- The app can share the current message as plain text.
- The app can set the current message image as wallpaper.
- The app can show the current message as a QR code.
- When the user opens a share action, the shared content should reflect the current message and settings.

## QR Code View

- The QR code view shows the current message encoded as a QR code.
- The QR code view fills the screen with the code centered.
- If the user double-taps the QR code view, the app leaves that view.

## History

- The app keeps a history of previously displayed messages and their presentation settings.
- The history view shows past entries in reverse chronological order.
- The user can preview a history entry.
- The user can apply a history entry so it becomes the current app state.
- The user can open a history entry in the display view without immediately applying it.
- The user can delete individual history entries.
- The user can clear all history and app data from the history view.

## Widget

- The app provides a homescreen widget called Quick Display.
- The widget can be configured when it is added.
- The widget requires a name.
- The widget shows a preview using the chosen widget name.
- The widget opens the app’s display view for that widget when tapped.
- Once configured, the widget should remain tappable and should open the correct display screen reliably.
- The widget should update to reflect its saved configuration.

## Incoming Content

- If the app is opened with shared text, the shared text should populate the message field.
- If the app is opened from a widget tap, it should open the display view for that widget.

## Data Expectations

- The app should keep the current message and settings available across app restarts.
- The app should keep widget settings available after the widget is configured.
- The app should keep history entries available until the user deletes them or clears all data.

## Accessibility and Usability

- The app should keep the message legible on a wide range of screen sizes.
- The app should present the current content with clear contrast.
- The app should avoid losing the user’s current text or settings during normal navigation.
