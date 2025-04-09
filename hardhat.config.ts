import HardhatSpdxLicenseIdentifier from './src/index.js';
import type { HardhatUserConfig } from 'hardhat/config';

export default {
  solidity: {
    version: '0.8.25',
  },
};

const config: HardhatUserConfig = {
  plugins: [HardhatSpdxLicenseIdentifier],
};
