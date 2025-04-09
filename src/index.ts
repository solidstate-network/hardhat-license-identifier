import pkg from '../package.json';
import './tasks/compile';
import './tasks/prepend_spdx_license';
import './type-extensions.js';
import { HardhatPlugin } from 'hardhat/types/plugins';

// import { extendConfig } from 'hardhat/config';

// extendConfig((config, userConfig) => {
//   config.spdxLicenseIdentifier = Object.assign(
//     {
//       overwrite: false,
//       runOnCompile: false,
//       only: [],
//       except: [],
//     },
//     userConfig.spdxLicenseIdentifier,
//   );
// });

const plugin: HardhatPlugin = {
  id: pkg.name.split('/').pop()!,
  npmPackage: pkg.name!,
};

export default plugin;
