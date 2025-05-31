import HardhatLicenseIdentifier from './src/index.js';
import type { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [HardhatLicenseIdentifier],
};

export default config;
