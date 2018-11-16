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
import { EOL } from 'os';

const checkVersion = (engineName, command) => {
  let pkg = null;
  const pkgJsonPath = path.join(process.cwd(), 'package.json');

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    pkg = require(pkgJsonPath);
  } catch (e) {
    console.log(`Unable to find ${pkgJsonPath}!  😱${EOL}`);
    console.log(
      `Please ensure that this script is executed in the same directory.${EOL}`,
    );
    process.exit(1);
  }

  let expected = null;

  try {
    expected = pkg.engines[engineName];
  } catch (e) {
    console.log(
      `There is no engine named "${engineName}" specified in package.json!  😱${EOL}`,
    );
    process.exit(1);
  }

  let version = null;

  try {
    const localBinFolder = execSync('npm bin')
      .toString()
      .trim();

    version = execSync(command, {
      env: {
        PATH: process.env.PATH.replace(
          `${localBinFolder}${path.delimiter}`,
          '',
        ),
      },
    })
      .toString()
      .replace('v', '')
      .trim();
  } catch (e) {
    console.log(`Unable to get ${engineName} version!  😱${EOL}`);
    process.exit(1);
  }

  if (!semver.satisfies(version, expected)) {
    const guide =
      'https://github.com/Skyscanner/ensure-node-env/blob/master/README.md#guide';
    console.log(
      `Expected ${engineName} version to match ${expected}, but got ${version}.  😱${EOL}`,
    );
    console.log(
      `Please follow Skyscanner's node environment guide (see ${guide}).${EOL}`,
    );
    process.exit(1);
  }
};

console.log(`Checking node & npm versions...${EOL}`);

checkVersion('node', 'node --version');
checkVersion('npm', 'npm -g --version');

console.log(`${EOL}All good.  👍${EOL}`);
