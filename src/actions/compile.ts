import { prependSpdxLicense } from '../lib/prepend_spdx_license.js';
import { TaskOverrideActionFunction } from 'hardhat/types/tasks';

const action: TaskOverrideActionFunction = async (args, hre, runSuper) => {
  if (hre.config.spdxLicenseIdentifier.runOnCompile) {
    await prependSpdxLicense(hre);
  }

  await runSuper(args);
};

export default action;
