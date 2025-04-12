import type { LicenseIdentifierConfig } from '../types.js';
import type { ConfigHooks } from 'hardhat/types/hooks';

const DEFAULT_CONFIG: LicenseIdentifierConfig = {
  overwrite: false,
  runOnCompile: false,
  only: [],
  except: [],
};

export default async (): Promise<Partial<ConfigHooks>> => ({
  resolveUserConfig: async (userConfig, resolveConfigurationVariable, next) => {
    return {
      ...(await next(userConfig, resolveConfigurationVariable)),
      licenseIdentifier: {
        ...DEFAULT_CONFIG,
        ...userConfig.licenseIdentifier,
      },
    };
  },
});
