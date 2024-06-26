# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

<!-- Unreleased changes go above this line -->

# Releases

## 2.1.0 - 2024-06-17
- Added NPM `10` to list of accepted versions

## 2.0.0 - 2023-03-21

### Breaking
- Upgraded to support `lts/gallium` (Node 16)
- Update to support `npm bin` being removed in NPM `9.0.0`

### Fixed
- Upgraded various development dependencies.


## 1.2.3 - 2019-02-05

### Fixed
- No change. Upgrade eslint dev dependency.

## 1.2.2 - 2019-01-25

### Fixed
- Use all environment variables when running commands, previously it was using only `PATH`.

## 1.2.1 - 2019-01-16

### Fixed
- Upgraded various development dependencies (rollup etc).
- Upgraded `semver` minor version.

## 1.2.0 - 2019-01-11

### Added
- `--ignore-local-bin` flag, see [README.md](README.md) for details.
- `--verbose` flag.

## ~1.1.0 - 2018-11-21~ (Changed reverted and unpublished)

### ~Added~
- ~`--ignore-local-bin` flag, see [README.md](README.md) for details.~
- ~`--verbose` flag.~

## 1.0.8 - 2018-09-26

### Fixed
- Updated dependencies

## 1.0.7 - 2018-09-12

### Fixed
- Updated dependencies

## 1.0.6 - 2018-08-29

### Fixed
- Updated dependencies
- Use terser instead of uglify-es as it is now deprecated

## 1.0.5 - 2018-07-06

### Fixed
- Updated dependencies

## 1.0.4 - 2018-01-04

### Fixed
- Global npm is now forced with `-g`

## 1.0.3 - 2017-11-14

### Fixed
- The `files` array in `package.json` expects directories

## 1.0.2 - 2017-11-14

### Fixed
- Remove shebang from curl + eval use case 
- Add shebang to cli specific build

## 1.0.1 - 2017-11-14

### Fixed
- Add shebang

## 1.0.0 - 2017-11-14

### Added
- npm package option
