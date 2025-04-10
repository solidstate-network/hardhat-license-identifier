import HardhatSpdxLicenseIdentifier from './src/index.js';
import type { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [HardhatSpdxLicenseIdentifier],
};

export default config;
