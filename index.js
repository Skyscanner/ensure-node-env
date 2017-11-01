/*
 * ensure-node-env
 *
 * Copyright 2017 Skyscanner Ltd
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

const checkVersion = (engineName, command) => {
  let pkg = null;
  const pkgJsonPath = path.join(process.cwd(), 'package.json');

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    pkg = require(pkgJsonPath);
  } catch (e) {
    console.log(`Unable to find ${pkgJsonPath}!  😱`);
    console.log('');
    console.log('Please ensure that this script is executed in the same directory.');
    console.log('');
    process.exit(1);
  }

  let expected = null;

  try {
    expected = pkg.engines[engineName];
  } catch (e) {
    console.log(`There is no engine named ${engineName} specified in package.json!  😱`);
    console.log('');
    process.exit(1);
  }

  let version = null;

  try {
    version = execSync(command).toString().replace('v', '').trim();
  } catch (e) {
    console.log(`Unable to get ${engineName} version!  😱`);
    console.log('');
    process.exit(1);
  }

  if (!semver.satisfies(version, expected)) {
    const guide = 'https://github.com/Skyscanner/ensure-node-env/blob/master/README.md#guide';
    console.log(`Expected ${engineName} version to match ${expected}, but got ${version}.  😱`);
    console.log('');
    console.log(`Please follow Skyscanner's node environment guide (see ${guide}).`);
    console.log('');
    process.exit(1);
  }
};

console.log('Checking node & npm versions...');
console.log('');

checkVersion('node', 'node --version');
checkVersion('npm', 'npm --version');

console.log('All good.  👍');
console.log('');
