import {
  filterSourcePaths,
  readSourceLicenses,
} from '../lib/license_identifier.js';
import { printSourceLicenses } from '../lib/print.js';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

interface ShowLicenseActionArguments {}

const action: NewTaskActionFunction<ShowLicenseActionArguments> = async (
  args,
  hre,
) => {
  const config = hre.config.licenseIdentifier;

  const sourcePaths = filterSourcePaths(
    config,
    await hre.solidity.getRootFilePaths(),
  );

  const sourceLicenses = await readSourceLicenses(
    sourcePaths,
    hre.config.paths.root,
  );

  printSourceLicenses(sourceLicenses);
};

export default action;
