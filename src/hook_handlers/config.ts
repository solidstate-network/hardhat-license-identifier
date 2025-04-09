import type { SpdxLicenseIdentifierConfig } from '../types.js';
import type { ConfigHooks } from 'hardhat/types/hooks';

const DEFAULT_CONFIG: SpdxLicenseIdentifierConfig = {
  overwrite: false,
  runOnCompile: false,
  only: [],
  except: [],
};

export default async (): Promise<Partial<ConfigHooks>> => ({
  resolveUserConfig: async (userConfig, resolveConfigurationVariable, next) => {
    return {
      ...(await next(userConfig, resolveConfigurationVariable)),
      contractSizer: {
        ...DEFAULT_CONFIG,
        ...userConfig.spdxLicenseIdentifier,
      },
    };
  },
});
