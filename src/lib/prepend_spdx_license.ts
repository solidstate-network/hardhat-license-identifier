import pkg from '../../package.json';
import fs from 'fs';
import { HardhatPluginError } from 'hardhat/plugins';
import { HardhatRuntimeEnvironment } from 'hardhat/types/hre';

export const prependSpdxLicense = async (hre: HardhatRuntimeEnvironment) => {
  const config = hre.config.spdxLicenseIdentifier;

  let { license } = config;

  if (!license) {
    ({ license } = JSON.parse(
      fs.readFileSync(`${hre.config.paths.root}/package.json`, 'utf8'),
    ));

    if (!license) {
      throw new HardhatPluginError(
        pkg.name,
        'no license specified in config or package.json, unable to add SPDX License Identifier to sources',
      );
    }
  }

  const headerBase = '// SPDX-License-Identifier:';
  const regexp = new RegExp(`(${headerBase}.*\n*)?`);
  const header = `${headerBase} ${license}\n`;

  let count = 0;

  const sourcePaths = await hre.solidity.getRootFilePaths();

  await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      if (config.only.length && !config.only.some((m) => sourcePath.match(m)))
        return;
      if (
        config.except.length &&
        config.except.some((m) => sourcePath.match(m))
      )
        return;

      // content is read from disk for preprocessor compatibility
      const content = fs.readFileSync(sourcePath).toString();

      const partialMatch = content.startsWith(headerBase);
      const exactMatch = content.startsWith(header);

      if (exactMatch) return;
      if (partialMatch && !config.overwrite) return;

      const padding = partialMatch ? '' : '\n';

      await fs.promises.writeFile(
        sourcePath,
        content.replace(regexp, header + padding),
      );

      count++;
    }),
  );

  console.log(
    `Prepended SPDX License Identifier "${license}" to ${count} sources.`,
  );
};
