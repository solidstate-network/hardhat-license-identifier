import pkg from '../package.json';
import './tasks/compile';
import './tasks/prepend_spdx_license';
import './type-extensions.js';
import { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name.split('/').pop()!,
  npmPackage: pkg.name!,
  hookHandlers: {
    config: import.meta.resolve('./hook_handlers/config.js'),
  },
};

export default plugin;
