import pkg from '../../package.json' with { type: 'json' };
import type { LicenseIdentifierConfig } from '../types.js';
import { readUtf8File, writeUtf8File } from '@nomicfoundation/hardhat-utils/fs';
import { readClosestPackageJson } from '@nomicfoundation/hardhat-utils/package';
import { filter } from '@solidstate/hardhat-solidstate-utils/filter';
import { HardhatPluginError } from 'hardhat/plugins';

const headerBase = '// SPDX-License-Identifier:';
const regexp = new RegExp(`(${headerBase}.*\n)?`);

const formatHeader = (license: string) => `${headerBase} ${license}\n`;

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
  let count = 0;

  await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const content = await readUtf8File(sourcePath);

      const fileContentWithLience = await writeFileWithLicense(
        sourcePath,
        content,
        license,
        overwrite,
      );

      if (fileContentWithLience !== content) {
        count++;
      }
    }),
  );

  console.log(
    `Prepended SPDX License Identifier "${license}" to ${count} sources.`,
  );
};

export const writeFileWithLicense = async (
  fsPath: string,
  fileContent: string,
  license: string,
  overwrite: boolean,
): Promise<string> => {
  const header = formatHeader(license);

  if (fileContent.startsWith(header)) return fileContent;
  if (fileContent.startsWith(headerBase) && !overwrite) return fileContent;

  const fileContentWithLicense = fileContent.replace(regexp, header);

  await writeUtf8File(fsPath, fileContentWithLicense);

  return fileContentWithLicense;
};
