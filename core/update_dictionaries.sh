#!/bin/bash

URL="https://github.com/Doublevil/JmdictFurigana/releases/latest/download/JmdictFurigana.json.tar.gz"

EXTRACT_DIR="src/lib/assets"

# Download the tar.gz file
wget $URL -O jmdict_furigana.tar.gz

# Extract the contents of the tar.gz file
tar -xzf jmdict_furigana.tar.gz -C $EXTRACT_DIR

jq '.' "$EXTRACT_DIR/JmdictFurigana.json" > "$EXTRACT_DIR/ProcessedJmdictFurigana.json"

rm "$EXTRACT_DIR/JmdictFurigana.json"

# Clean up the downloaded tar.gz file
rm jmdict_furigana.tar.gz