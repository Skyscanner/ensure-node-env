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

const cleanup = () => {
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
    delete pkg.scripts.preinstall;

    fs.writeFileSync(
      pkgJsonPath,
      JSON.stringify(pkg, null, 2) + os.EOL,
    );
  } catch (e) {
    console.log('Failed to write to package.json!  😱');
    console.log('');
    process.exit(1);
  }
};

console.log('Cleaning up preinstall check...');
console.log('');

cleanup();

console.log('All good.  👍');
console.log('');
