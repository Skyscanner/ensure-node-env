#!/usr/bin/env bash

# This script verifies that our older method of consumption (curl + eval) still works.
# On CI, it takes the dist bundle from the current branch. Locally it just evaluates the file contents from disk.

set -e

if [ $CI ] ; then
  BRANCH=${TRAVIS_PULL_REQUEST_BRANCH:-$TRAVIS_BRANCH}
  URL="https://raw.githubusercontent.com/Skyscanner/ensure-node-env/$BRANCH/dist/index.js"
  echo "Evaluating script at $URL"
  node -e "$(curl -fsSL $URL)"
  exit 0
fi

node -e "$(< dist/index.js)"
