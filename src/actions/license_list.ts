import {
  filterSourcePaths,
  readLicenseFromPackageJson,
  readSourceLicenses,
} from '../lib/license_identifier.js';
import { printSourceLicenses } from '../lib/print.js';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

interface TaskActionArguments {}

const action: NewTaskActionFunction<TaskActionArguments> = async (
  args,
  hre,
) => {
  const config = hre.config.licenseIdentifier;

  const sourcePaths = filterSourcePaths(
    config,
    await hre.solidity.getRootFilePaths(),
  );

  const packageJsonLicense = await readLicenseFromPackageJson(
    hre.config.paths.root,
  );

  const sourceLicenses = await readSourceLicenses(
    sourcePaths,
    hre.config.paths.root,
  );

  printSourceLicenses(packageJsonLicense, sourceLicenses);
};

export default action;
