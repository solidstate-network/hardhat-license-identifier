import pkg from '../package.json';
import './type-extensions.js';
import { task, overrideTask } from 'hardhat/config';
import { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name.split('/').pop()!,
  npmPackage: pkg.name!,
  tasks: [
    task('prepend-spdx-license')
      .setDescription('Prepend SPDX License identifier to local source files')
      .setAction(import.meta.resolve('./actions/prepend_spdx_license.js'))
      .build(),

    overrideTask('compile')
      .setAction(import.meta.resolve('./actions/compile.js'))
      .build(),
  ],
  hookHandlers: {
    config: import.meta.resolve('./hook_handlers/config.js'),
  },
};

export default plugin;
