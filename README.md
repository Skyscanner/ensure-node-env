# ensure-node-env

[![Build Status](https://travis-ci.org/Skyscanner/ensure-node-env.svg?branch=master)](https://travis-ci.org/Skyscanner/ensure-node-env)

A script that helps ensure you have the correct node &amp; npm versions installed globally in your environment.

## Usage

Add the following to your `package.json`:

```json
  ...
  "engines": {
    "node": "^8.9.0",
    "npm": "^5.5.1"
  },
  "scripts": {
    "preinstall": "node -e \"$(curl -fsSL https://raw.githubusercontent.com/Skyscanner/ensure-node-env/master/dist/index.js)\"",
    ...
```

Where the `node` and `npm` engine properties specify a valid semver range for Node and npm version respectively.

### Alternative install via npm

First, install the package globally:

```sh
npm install -g ensure-node-env
```

Then add the following to your `package.json`:

```json
  ...
  "engines": {
    "node": "^8.9.0",
    "npm": "^5.5.1"
  },
  "scripts": {
    "preinstall": "ensure-node-env",
    ...
```

### Usage in npm projects that are published

This script is designed to be used as a development-only preinstall check in the project root. For projects that are published and consumed in other projects you can use the following script as a `prepublish` step in your project:

```json
 ...
  "scripts": {
    "prepublish": "node -e \"$(curl -fsSL https://raw.githubusercontent.com/Skyscanner/ensure-node-env/master/dist/cleanup.js)\"",
    ...
```

As a global npm dependency:

```json
  ...
  "scripts": {
    "preinstall": "cleanup-ensure-node-env",
    ...
```

## Guide

Skyscanner Node development requires Node LTS and npm `^5.5.1`. [Nvm](https://github.com/creationix/nvm) users can run `nvm use` to switch to `lts/carbon`. [Nave](https://github.com/isaacs/nave) users can use `nave auto`. You can also download Node LTS using [the website](https://nodejs.org/en/). To install npm `^5.5.1`, run `npm install -g npm@^5.5.1`.
