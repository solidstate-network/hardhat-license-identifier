import {
  LicenseIdentifierConfig,
  LicenseIdentifierUserConfig,
} from './types.js';

declare module 'hardhat/types/config' {
  interface HardhatConfig {
    licenseIdentifier: LicenseIdentifierConfig;
  }

  interface HardhatUserConfig {
    licenseIdentifier?: LicenseIdentifierUserConfig;
  }
}

declare module '@nomicfoundation/hardhat-utils/package' {
  interface PackageJson {
    license?: string;
  }
}
