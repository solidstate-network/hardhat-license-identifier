import pkg from '../../package.json' with { type: 'json' };
import type { LicenseIdentifierConfig, SourceLicense } from '../types.js';
import { readUtf8File, writeUtf8File } from '@nomicfoundation/hardhat-utils/fs';
import { readClosestPackageJson } from '@nomicfoundation/hardhat-utils/package';
import { filter } from '@solidstate/hardhat-solidstate-utils/filter';
import { HardhatPluginError } from 'hardhat/plugins';
import path from 'node:path';

const headerBase = '// SPDX-License-Identifier:';
const headerRegexp = new RegExp(`(${headerBase}.*\n)?`);
const identifierRegexp = new RegExp(`${headerBase} (\\w+)`);

const formatHeader = (license: string) => `${headerBase} ${license}\n`;

export const readLicenseFromPackageJson = async (rootPath: string) => {
  const { license } = await readClosestPackageJson(rootPath);

  if (!license) {
    throw new HardhatPluginError(
      pkg.name,
      'no license specified in config or package.json, unable to add SPDX License Identifier to sources',
    );
  }

  return license;
};

const readLicenseFromSourceContent = (content: string) => {
  return content.match(identifierRegexp)?.[1];
};

const readLicenseFromSourcePath = async (sourcePath: string) => {
  const content = await readUtf8File(sourcePath);
  return readLicenseFromSourceContent(content);
};

export const readSourceLicenses = async (
  sourcePaths: string[],
  rootPath: string,
): Promise<SourceLicense[]> => {
  return await Promise.all(
    sourcePaths.map(async (sourcePath) => ({
      sourcePath: path.relative(rootPath, sourcePath),
      license: await readLicenseFromSourcePath(sourcePath),
    })),
  );
};

export const filterSourcePaths = (
  config: LicenseIdentifierConfig,
  sourcePaths: string[],
) => {
  return filter(sourcePaths, config);
};

export const prependLicenseToSources = async (
  sourcePaths: string[],
  license: string,
  overwrite: boolean,
) => {
  let count = 0;

  await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const content = await readUtf8File(sourcePath);

      if (!hasMatchingLicense(content, license, overwrite)) {
        await writeUtf8File(
          sourcePath,
          prependLicenseToFileContent(content, license),
        );
        count++;
      }
    }),
  );

  console.log(
    `Prepended SPDX License Identifier "${license}" to ${count} sources.`,
  );
};

export const hasMatchingLicense = (
  fileContent: string,
  license: string,
  overwrite: boolean,
): boolean => {
  const header = formatHeader(license);

  return (
    fileContent.startsWith(header) ||
    (fileContent.startsWith(headerBase) && !overwrite)
  );
};

export const prependLicenseToFileContent = (
  fileContent: string,
  license: string,
): string => {
  const header = formatHeader(license);
  return fileContent.replace(headerRegexp, header);
};
