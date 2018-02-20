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

import os from 'os';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Checking cleanup script...');
console.log('');

try {
  execSync('node dist/cleanup.js');
} catch (e) {
  console.log('Unable to find execute cleanup script successfully!  😱');
  console.log('');
  process.exit(1);
}

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

try {
  if (!pkg.scripts.preinstall === undefined) {
    throw new Error();
  }
} catch (e) {
  console.log('The cleanup script didn\'t do it\'s job!  😱');
  console.log('');
  process.exit(1);
}

try {
  pkg.scripts.preinstall = 'node dist/index.js';

  fs.writeFileSync(
    pkgJsonPath,
    JSON.stringify(pkg, null, 2) + os.EOL,
  );
} catch (e) {
  console.log('Failed to write to package.json!  😱');
  console.log('');
  process.exit(1);
}

console.log('All good.  👍');
console.log('');
