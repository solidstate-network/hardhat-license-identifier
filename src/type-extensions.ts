import {
  SpdxLicenseIdentifierConfig,
  SpdxLicenseIdentifierUserConfig,
} from './types.js';

declare module 'hardhat/types/config' {
  interface HardhatConfig {
    spdxLicenseIdentifier: SpdxLicenseIdentifierConfig;
  }

  interface HardhatUserConfig {
    spdxLicenseIdentifier?: SpdxLicenseIdentifierUserConfig;
  }
}
