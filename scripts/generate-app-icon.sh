#!/usr/bin/env bash

# Run the script only in the project root.
# inkscape relies on PWD to check the font file location.

set -euo pipefail

input_svg="assets/app-icon.svg"

render() {
  local size="$1"
  local output="$2"

  inkscape "$input_svg" \
    --export-type=png \
    --export-width="$size" \
    --export-height="$size" \
    --export-filename="$output" \
    >/dev/null
}

render 256 assets/app-icon-256.png
render 512 assets/app-icon-512.png
render 1024 assets/app-icon-1024.png

render 48 android/app/src/main/res/mipmap-mdpi/ic_launcher.png
render 72 android/app/src/main/res/mipmap-hdpi/ic_launcher.png
render 96 android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
render 144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
render 192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png

render 48 android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png
render 72 android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png
render 96 android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png
render 144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png
render 192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png

render 40 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-20x20@2x.png
render 60 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-20x20@3x.png
render 58 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-29x29@2x.png
render 87 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-29x29@3x.png
render 80 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-40x40@2x.png
render 120 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-40x40@3x.png
render 120 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-60x60@2x.png
render 180 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-60x60@3x.png
render 1024 ios/BigText/Images.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png
