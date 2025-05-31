import type { FilterOptions } from '@solidstate/hardhat-solidstate-utils/types';

export type LicenseIdentifierConfig = {
  license?: string;
  overwrite: boolean;
  runOnCompile: boolean;
} & FilterOptions;

export type LicenseIdentifierUserConfig = Partial<LicenseIdentifierConfig>;
