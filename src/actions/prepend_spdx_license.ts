import {
  filterSourcePaths,
  prependSpdxLicense,
  readLicense,
} from '../lib/prepend_spdx_license.js';
import { NewTaskActionFunction } from 'hardhat/types/tasks';

interface PrependSpdxLicenseActionArguments {
  license?: string;
  overwrite: boolean;
}

const action: NewTaskActionFunction<PrependSpdxLicenseActionArguments> = async (
  args,
  hre,
) => {
  const config = hre.config.spdxLicenseIdentifier;

  const sourcePaths = filterSourcePaths(
    config,
    await hre.solidity.getRootFilePaths(),
  );
  const license =
    args.license ?? config.license ?? readLicense(hre.config.paths.root);
  const overwrite = args.overwrite || config.overwrite;

  await prependSpdxLicense(sourcePaths, license, overwrite);
};

export default action;
