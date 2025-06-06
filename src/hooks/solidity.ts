import {
  hasMatchingLicense,
  prependLicenseToFileContent,
  readLicense,
} from '../lib/license_identifier.js';
import { writeUtf8File } from '@nomicfoundation/hardhat-utils/fs';
import type { SolidityHooks } from 'hardhat/types/hooks';

export default async (): Promise<Partial<SolidityHooks>> => ({
  preprocessProjectFileBeforeBuilding: async (
    context,
    sourceName,
    fsPath,
    fileContent,
    solcVersion,
    next,
  ) => {
    const config = context.config.licenseIdentifier;

    if (config.runOnCompile) {
      const license =
        config.license ?? (await readLicense(context.config.paths.root));
      const overwrite = config.overwrite;

      if (!hasMatchingLicense(fileContent, license, overwrite)) {
        fileContent = prependLicenseToFileContent(fileContent, license);
        await writeUtf8File(fsPath, fileContent);
      }
    }

    return await next(context, sourceName, fsPath, fileContent, solcVersion);
  },
});
