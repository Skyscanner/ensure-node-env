/*
 * ensure-node-env
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */

import path from 'path';
import semver from 'semver';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { EOL } from 'os';

const { argv } = process;
const verbose = argv.indexOf('-v') !== -1 || argv.indexOf('--verbose') !== -1;
const ignoreLocalBin =
  argv.indexOf('-i') !== -1 || argv.indexOf('--ignore-local-bin') !== -1;

const logger = {
  info: console.info,
  debug: verbose ? console.debug : () => null,
  error: console.error,
};

const getVersion = ({ command, localBinFolder, global = true }) => {
  const env = { PATH: process.env.PATH };

  if (global) {
    env.PATH = env.PATH.replace(`${localBinFolder}${path.delimiter}`, '');
  } else {
    env.PATH = `${localBinFolder}${path.delimiter}${env.PATH}`;
  }

  return execSync(command, { env })
    .toString()
    .replace('v', '')
    .trim();
};

const checkVersion = (engineName, command) => {
  let pkg = null;
  const pkgJsonPath = path.join(process.cwd(), 'package.json');

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    pkg = require(pkgJsonPath);
  } catch (e) {
    logger.error(`Unable to find ${pkgJsonPath}!  😱${EOL}`);
    logger.error(
      `Please ensure that this script is executed in the same directory.${EOL}`,
    );
    process.exit(1);
  }

  if (!pkg.engines || !pkg.engines[engineName]) {
    logger.error(
      `There is no engine named "${engineName}" specified in package.json!  😱${EOL}`,
    );
    process.exit(1);
  }

  const expected = pkg.engines[engineName];

  let globalVersion = null;
  let localVersion = null;
  let usedVersion = null;
  let globalVersionValid = null;
  let localVersionValid = null;

  try {
    const localBinFolder = execSync('npm bin')
      .toString()
      .trim();

    const hasLocalVersion = existsSync(
      `${localBinFolder}${path.sep}${engineName}`,
    );

    globalVersion = getVersion({ command, localBinFolder });
    globalVersionValid = semver.satisfies(globalVersion, expected);

    logger.debug(`Expected ${engineName} version:\t${expected}`);
    logger.debug(
      `╰─ Global ${engineName} version:\t${globalVersion}\t${
        globalVersionValid ? '✅️' : '❌️'
      }`,
    );

    if (hasLocalVersion) {
      localVersion = getVersion({ command, localBinFolder, global: false });
      localVersionValid = semver.satisfies(localVersion, expected);
      logger.debug(
        `╰─ Local ${engineName} version:\t${localVersion}\t${
          localVersionValid ? '✅️' : '❌️'
        } (from ${localBinFolder})`,
      );
    }

    if (ignoreLocalBin) {
      usedVersion = globalVersion;
    } else {
      usedVersion = localVersion || globalVersion;
    }

    logger.debug(`╰─ (using: ${usedVersion})${EOL}`);
  } catch (e) {
    logger.error(`Unable to get ${engineName} version!  😱${EOL}`);
    process.exit(1);
  }

  if (!semver.satisfies(usedVersion, expected)) {
    const guide =
      'https://github.com/Skyscanner/ensure-node-env/blob/master/README.md#guide';
    logger.error(
      `Expected ${engineName} version to match ${expected}, but got ${usedVersion}.  😱${EOL}`,
    );

    if (!verbose) {
      logger.error(
        `(pass the --verbose flag to the script for a more detailed output)${EOL}`,
      );
    }

    logger.error(
      `Please follow Skyscanner's node environment guide (see ${guide}).${EOL}`,
    );
    process.exit(1);
  }
};

logger.info(`Checking node & npm versions...${EOL}`);

checkVersion('node', 'node --version');
checkVersion('npm', 'npm -g --version');

logger.info(`All good.  👍${EOL}`);
