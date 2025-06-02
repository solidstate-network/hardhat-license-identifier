import pkg from '../../package.json' with { type: 'json' };
import type { LicenseIdentifierConfig } from '../types.js';
import { readUtf8File, writeUtf8File } from '@nomicfoundation/hardhat-utils/fs';
import { readClosestPackageJson } from '@nomicfoundation/hardhat-utils/package';
import { filter } from '@solidstate/hardhat-solidstate-utils/filter';
import { HardhatPluginError } from 'hardhat/plugins';

export const readLicense = async (rootPath: string) => {
  const { license } = await readClosestPackageJson(rootPath);

  if (!license) {
    throw new HardhatPluginError(
      pkg.name,
      'no license specified in config or package.json, unable to add SPDX License Identifier to sources',
    );
  }

  return license;
};

export const filterSourcePaths = (
  config: LicenseIdentifierConfig,
  sourcePaths: string[],
) => {
  return filter(sourcePaths, config);
};

export const prependLicense = async (
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
      const content = await readUtf8File(sourcePath);

      if (content.startsWith(header)) return;
      if (content.startsWith(headerBase) && !overwrite) return;

      await writeUtf8File(sourcePath, content.replace(regexp, header));

      count++;
    }),
  );

  console.log(
    `Prepended SPDX License Identifier "${license}" to ${count} sources.`,
  );
};
