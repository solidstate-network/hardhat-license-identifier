import pkg from '../../package.json';
import type { SpdxLicenseIdentifierConfig } from '../types.js';
import fs from 'fs';
import { HardhatPluginError } from 'hardhat/plugins';

export const readLicense = (rootPath: string) => {
  const license: string = JSON.parse(
    fs.readFileSync(`${rootPath}/package.json`, 'utf8'),
  ).license;

  if (!license) {
    throw new HardhatPluginError(
      pkg.name,
      'no license specified in config or package.json, unable to add SPDX License Identifier to sources',
    );
  }

  return license;
};

export const filterSourcePaths = (
  config: SpdxLicenseIdentifierConfig,
  sourcePaths: string[],
) => {
  return sourcePaths.filter((sourcePath) => {
    if (config.only.length && !config.only.some((m) => sourcePath.match(m)))
      return false;
    if (config.except.length && config.except.some((m) => sourcePath.match(m)))
      return false;
    return true;
  });
};

export const prependSpdxLicense = async (
  config: SpdxLicenseIdentifierConfig,
  sourcePaths: string[],
  rootPath: string,
) => {
  const license = config.license ?? readLicense(rootPath);
  const { overwrite } = config;

  sourcePaths = filterSourcePaths(config, sourcePaths);

  const headerBase = '// SPDX-License-Identifier:';
  const regexp = new RegExp(`(${headerBase}.*\n*)?`);
  const header = `${headerBase} ${license}\n`;

  let count = 0;

  await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const content = await fs.promises.readFile(sourcePath, 'utf-8');

      const partialMatch = content.startsWith(headerBase);
      const exactMatch = content.startsWith(header);

      if (exactMatch) return;
      if (partialMatch && !overwrite) return;

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
