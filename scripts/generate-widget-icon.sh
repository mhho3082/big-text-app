#!/usr/bin/env bash

# Run the script only in the project root.
# inkscape relies on PWD to check the font file location.

set -euo pipefail

input_svg="assets/widget-icon.svg"

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

render 256 assets/widget-icon-256.png
render 512 assets/widget-icon-512.png
render 1024 assets/widget-icon-1024.png
