#!/bin/bash

BASE_DIR="src"
SUB_DIRS=("color" "outline" "solid")
SUB_SUB_DIRS=("svg" "react")

count_files() {
    local dir_path="$1"
    local count=$(find "$dir_path" -type f | wc -l)
    echo $count
}

renew_needed=false

for sub_dir in "${SUB_DIRS[@]}"; do
    SVG_DIR="$BASE_DIR/$sub_dir/svg"
    REACT_DIR="$BASE_DIR/$sub_dir/react"

    if [ -d "$SVG_DIR" ]; then
        svg_count=$(count_files "$SVG_DIR")
        react_count=$(count_files "$REACT_DIR")

        if [ "$svg_count" -ne "$react_count" ]; then
            renew_needed=true
            break
        fi
    else
        echo "[🔮icons] SVG Directory isn't found!"
        exit 1
    fi
done

if [ "$renew_needed" = true ]; then
    echo "[🔮icons] An ungenerated component exists. SVG component creation is started."
    pnpm renew
else
    echo "[🔮icons] SVG Component is up to date. SVG component creation is cancelled."
    exit 0
fi
