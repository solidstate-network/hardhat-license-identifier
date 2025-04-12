import { prependSpdxLicense } from '../lib/prepend_spdx_license.js';
import { NewTaskActionFunction } from 'hardhat/types/tasks';

interface PrependSpdxLicenseActionArguments {
  license?: string;
  overwrite: boolean;
}

const action: NewTaskActionFunction<PrependSpdxLicenseActionArguments> = async (
  args,
  hre,
) => {
  const config = { ...hre.config.spdxLicenseIdentifier };

  config.license = args.license ?? config.license;
  config.overwrite = args.overwrite || config.overwrite;

  const sourcePaths = await hre.solidity.getRootFilePaths();

  await prependSpdxLicense(config, sourcePaths, hre.config.paths.root);
};

export default action;
