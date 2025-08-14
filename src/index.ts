import pkg from '../package.json' with { type: 'json' };
import taskLicense from './tasks/license.js';
import taskLicenseList from './tasks/license_list.js';
import taskLicenseWrite from './tasks/license_write.js';
import './type_extensions.js';
import { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name!,
  npmPackage: pkg.name!,
  dependencies: () => [import('@solidstate/hardhat-solidstate-utils')],
  tasks: [taskLicense, taskLicenseList, taskLicenseWrite],
  hookHandlers: {
    config: () => import('./hooks/config.js'),
    solidity: () => import('./hooks/solidity.js'),
  },
};

export default plugin;
