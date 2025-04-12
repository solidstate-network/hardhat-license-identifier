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
  sourcePaths: string[],
  license: string,
  overwrite: boolean,
) => {
  const headerBase = '// SPDX-License-Identifier:';
  const regexp = new RegExp(`(${headerBase}.*\n)?`);
  const header = `${headerBase} ${license}\n`;

  let count = 0;

  await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const content = await fs.promises.readFile(sourcePath, 'utf-8');

      if (content.startsWith(header)) return;
      if (content.startsWith(headerBase) && !overwrite) return;

      await fs.promises.writeFile(sourcePath, content.replace(regexp, header));

      count++;
    }),
  );

  console.log(
    `Prepended SPDX License Identifier "${license}" to ${count} sources.`,
  );
};
