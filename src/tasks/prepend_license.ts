import { TASK_PREPEND_LICENSE } from '../task_names.js';
import { task } from 'hardhat/config';

export default task(TASK_PREPEND_LICENSE)
  .setDescription('Prepend SPDX License identifier to local source files')
  .setAction(import.meta.resolve('../actions/prepend_license.js'))
  .addPositionalArgument({
    name: 'license',
    description: 'SPDX license to add to sources (configuration override)',
    defaultValue: '',
  })
  .addFlag({
    name: 'overwrite',
    description:
      'whether to overwrite existing SPDX license identifiers (configuration override)',
  })
  .build();
