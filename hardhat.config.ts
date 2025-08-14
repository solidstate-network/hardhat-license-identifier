import hardhatLicenseIdentifier from './src/index.js';
import type { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [hardhatLicenseIdentifier],
};

export default config;
