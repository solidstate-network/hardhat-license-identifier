import {
  filterSourcePaths,
  prependLicenseToSources,
  readLicense,
} from '../lib/license_identifier.js';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

interface PrependLicenseActionArguments {
  license: string;
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
    args.license ||
    config.license ||
    (await readLicense(hre.config.paths.root));
  const overwrite = args.overwrite || config.overwrite;

  await prependLicenseToSources(sourcePaths, license, overwrite);
};

export default action;
