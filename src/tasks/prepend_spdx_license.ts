import { task } from 'hardhat/config';

export default task('prepend-spdx-license')
  .setDescription('Prepend SPDX License identifier to local source files')
  .setAction(import.meta.resolve('./actions/prepend_spdx_license.js'))
  .build();
