import pkg from '../package.json' with { type: 'json' };
import taskPrependLicense from './tasks/prepend_license.js';
import './type_extensions.js';
import { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name!,
  npmPackage: pkg.name!,
  dependencies: [
    async () => {
      const { default: HardhatSolidstateUtils } = await import(
        '@solidstate/hardhat-solidstate-utils'
      );
      return HardhatSolidstateUtils;
    },
  ],
  tasks: [taskPrependLicense],
  hookHandlers: {
    config: import.meta.resolve('./hooks/config.js'),
    solidity: import.meta.resolve('./hooks/solidity.js'),
  },
};

export default plugin;
