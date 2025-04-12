import {
  filterSourcePaths,
  prependLicense,
  readLicense,
} from '../lib/license_identifier.js';
import { NewTaskActionFunction } from 'hardhat/types/tasks';

interface PrependLicenseActionArguments {
  license?: string;
  overwrite: boolean;
}

const action: NewTaskActionFunction<PrependLicenseActionArguments> = async (
  args,
  hre,
) => {
  const config = hre.config.licenseIdentifier;

  const sourcePaths = filterSourcePaths(
    config,
    await hre.solidity.getRootFilePaths(),
  );
  const license =
    args.license ?? config.license ?? readLicense(hre.config.paths.root);
  const overwrite = args.overwrite || config.overwrite;

  await prependLicense(sourcePaths, license, overwrite);
};

export default action;
