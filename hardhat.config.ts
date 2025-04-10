import HardhatSpdxLicenseIdentifier from './src/index.js';
import HardhatNodeTestRunner from '@nomicfoundation/hardhat-node-test-runner';
import type { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [HardhatNodeTestRunner, HardhatSpdxLicenseIdentifier],
};

export default config;
