#!/usr/bin/env bash

# Run the script only in the project root.
# inkscape relies on PWD to check the asset location.

set -euo pipefail

input_svg="assets/sticker-checkerboard.svg"
output_png="assets/sticker-checkerboard-512.png"

mkdir -p "$(dirname "$output_png")"

inkscape "$input_svg" \
  --export-type=png \
  --export-width=512 \
  --export-height=512 \
  --export-filename="$output_png" \
  >/dev/null
