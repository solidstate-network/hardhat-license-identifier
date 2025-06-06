import {
  readLicense,
  writeFileWithLicense,
} from '../lib/license_identifier.js';
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

      fileContent = await writeFileWithLicense(
        fsPath,
        fileContent,
        license,
        overwrite,
      );
    }

    return await next(context, sourceName, fsPath, fileContent, solcVersion);
  },
});
