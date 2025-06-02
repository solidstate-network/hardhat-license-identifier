import {
  filterSourcePaths,
  prependLicense,
  readLicense,
} from '../lib/license_identifier.js';
import { TaskOverrideActionFunction } from 'hardhat/types/tasks';

const action: TaskOverrideActionFunction = async (args, hre, runSuper) => {
  const config = hre.config.licenseIdentifier;

  if (config.runOnCompile) {
    const sourcePaths = filterSourcePaths(
      config,
      await hre.solidity.getRootFilePaths(),
    );
    const license =
      config.license ?? (await readLicense(hre.config.paths.root));
    const overwrite = config.overwrite;

    await prependLicense(sourcePaths, license, overwrite);
  }

  await runSuper(args);
};

export default action;
