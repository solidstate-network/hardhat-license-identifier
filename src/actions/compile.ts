import { prependSpdxLicense } from '../lib/prepend_spdx_license.js';
import { TaskOverrideActionFunction } from 'hardhat/types/tasks';

const action: TaskOverrideActionFunction = async (args, hre, runSuper) => {
  const config = hre.config.spdxLicenseIdentifier;

  if (config.runOnCompile) {
    const sourcePaths = await hre.solidity.getRootFilePaths();
    await prependSpdxLicense(config, sourcePaths, hre.config.paths.root);
  }

  await runSuper(args);
};

export default action;
