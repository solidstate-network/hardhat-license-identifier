import { TASK_LICENSE_WRITE } from '../task_names.js';
import { task } from 'hardhat/config';

export default task(TASK_LICENSE_WRITE)
  .setDescription('Prepend SPDX license identifier to local source files')
  .setAction(import.meta.resolve('../actions/license_write.js'))
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
