import { task } from 'hardhat/config';

export default task('prepend-license')
  .setDescription('Prepend SPDX License identifier to local source files')
  .setAction(import.meta.resolve('../actions/prepend_license.js'))
  .addPositionalArgument({
    name: 'license',
    description: 'SPDX license to add to sources (configuration override)',
  })
  .addFlag({
    name: 'overwrite',
    description:
      'whether to overwrite existing SPDX license identifiers (configuration override)',
  })
  .build();
