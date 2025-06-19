#!/bin/bash

# Script to safely run 'git pull' when untracked files might be overwritten.
# The file backend/package-lock.json is backed up and removed before pulling.

set -e

FILE="backend/package-lock.json"

# Check if the untracked file exists in the working tree and is not tracked by git
if [ -f "$FILE" ] && git ls-files --others --exclude-standard | grep -q "$FILE"; then
    echo "Backing up $FILE before pulling"
    BACKUP="$FILE.bak.$(date +%Y%m%d%H%M%S)"
    mv "$FILE" "$BACKUP"
    echo "Moved $FILE to $BACKUP"
fi

# Proceed with the pull (uses the branch's configured upstream)
echo "Running git pull"

git pull
