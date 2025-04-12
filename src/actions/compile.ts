import {
  filterSourcePaths,
  prependSpdxLicense,
  readLicense,
} from '../lib/prepend_spdx_license.js';
import { TaskOverrideActionFunction } from 'hardhat/types/tasks';

const action: TaskOverrideActionFunction = async (args, hre, runSuper) => {
  const config = hre.config.spdxLicenseIdentifier;

  if (config.runOnCompile) {
    const sourcePaths = filterSourcePaths(
      config,
      await hre.solidity.getRootFilePaths(),
    );
    const license = config.license ?? readLicense(hre.config.paths.root);
    const overwrite = config.overwrite;

    await prependSpdxLicense(sourcePaths, license, overwrite);
  }

  await runSuper(args);
};

export default action;
