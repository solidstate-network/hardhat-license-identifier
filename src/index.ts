import pkg from '../package.json';
import compileTask from './tasks/compile.js';
import prependSpdxLicenseTask from './tasks/prepend_spdx_license.js';
import './type-extensions.js';
import { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name.split('/').pop()!,
  npmPackage: pkg.name!,
  tasks: [prependSpdxLicenseTask, compileTask],
  hookHandlers: {
    config: import.meta.resolve('./hook_handlers/config.js'),
  },
};

export default plugin;
