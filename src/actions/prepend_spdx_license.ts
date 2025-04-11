import { prependSpdxLicense } from '../lib/prepend_spdx_license.js';
import { NewTaskActionFunction } from 'hardhat/types/tasks';

const action: NewTaskActionFunction = async (args, hre) => {
  const config = hre.config.spdxLicenseIdentifier;
  const sourcePaths = await hre.solidity.getRootFilePaths();
  await prependSpdxLicense(config, sourcePaths, hre.config.paths.root);
};

export default action;
