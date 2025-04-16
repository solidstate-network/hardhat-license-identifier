import pkg from '../package.json';
import compileTask from './tasks/compile.js';
import prependLicenseTask from './tasks/prepend_license.js';
import './type-extensions.js';
import { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name!,
  npmPackage: pkg.name!,
  tasks: [prependLicenseTask, compileTask],
  hookHandlers: {
    config: import.meta.resolve('./hooks/config.js'),
  },
};

export default plugin;
