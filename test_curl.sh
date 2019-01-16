#!/usr/bin/env bash

# This script verifies that our older method of consumption (curl + eval) still works.
# On CI, it takes the dist bundle from the current branch. Locally it just evaluates the file contents from disk.

set -e

if [ $CI ] ; then
  URL="https://raw.githubusercontent.com/Skyscanner/ensure-node-env/$TRAVIS_COMMIT/dist/index.js"
  echo "Evaluating script at $URL"
  node -e "$(curl -fsSL $URL)"
  exit 0
fi

node -e "$(< dist/index.js)"
