import type { SourceLicense } from '../types.js';
import { createTable } from '@solidstate/hardhat-solidstate-utils/table';

export const printSourceLicenses = (sourceLicenses: SourceLicense[]) => {
  const table = createTable();

  table.push([
    {
      content: 'package.json license',
    },
    {
      content: 'TODO: try to store ',
    },
  ]);

  table.push([
    {
      content: 'Source Path',
    },
    { content: 'License' },
  ]);

  for (const sourceLicense of sourceLicenses) {
    const { sourcePath, license } = sourceLicense;
    table.push([{ content: sourcePath }, { content: license }]);
  }

  console.log(table.toString());
};
