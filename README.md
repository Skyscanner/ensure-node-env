# ensure-node-env

[![Build Status](https://travis-ci.org/Skyscanner/ensure-node-env.svg?branch=master)](https://travis-ci.org/Skyscanner/ensure-node-env) 

A script that helps ensure you have the correct node &amp; npm versions installed globally in your environment.

## Usage

Add the following to your `package.json`:

```json
  ...
  "engines": {
    "node": "^10.14.1",
    "npm": "^6.4.1"
  },
  "scripts": {
    "preinstall": "npx ensure-node-env",
    ...
```

Where the `node` and `npm` engine properties specify a valid semver range for Node and npm version respectively.

> By default, if you have a `node` or `npm` binary installed locally to the project (thus ending up in `./node_modules/.bin`), it will take precedence. If you want to check against a globally installed version instead, you can pass the `--ignore-local-bin` parameter (`-i` for short).
>
> It's worth noting that, while you may not be directly depending on `node` or `npm` packages, you may still have them as transitive dependencies - in any case, `ensure-node-env` will show which one is being considered and where it comes from.

By default, the script's output is minimal. If you want it to display more information, such as the exact versions being compared, you can pass the `--verbose` parameter (`-v` for short).

### Usage in libraries

This script is designed to be used as a development-only preinstall check in the project root. For libraries that are published and consumed in other projects it is considered good enough to include it as a pretest check:

```sh
npm install ensure-node-env --save-dev
```

```json
  ...
  "engines": {
    "node": "^10.14.1",
    "npm": "^6.4.1"
  },
  "scripts": {
    "pretest": "ensure-node-env",
    ...
```

## Guide

Skyscanner Node development requires Node LTS and npm `^6.4.1`. [Nvm](https://github.com/creationix/nvm) users can run `nvm use` to switch to `lts/dubnium`. [Nave](https://github.com/isaacs/nave) users can use `nave auto`. You can also download Node LTS using [the website](https://nodejs.org/en/).
