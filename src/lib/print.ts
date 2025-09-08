import type { SourceLicense } from '../types.js';
import { createTable } from '@solidstate/hardhat-solidstate-utils/table';
import chalk from 'chalk';

export const printSourceLicenses = (
  packageJsonLicense: string,
  sourceLicenses: SourceLicense[],
) => {
  const table = createTable();

  table.push([
    { content: chalk.gray('package.json') },
    { content: chalk.gray(packageJsonLicense) },
  ]);

  table.push([
    { content: chalk.bold('Source Path') },
    { content: chalk.bold('License') },
  ]);

  for (const sourceLicense of sourceLicenses) {
    const { sourcePath, license } = sourceLicense;
    table.push([{ content: sourcePath }, { content: license }]);
  }

  console.log(table.toString());
};
