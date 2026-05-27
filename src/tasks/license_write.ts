import { TASK_LICENSE_WRITE } from '../task_names.js';
import { task } from 'hardhat/config';
import { ArgumentType } from 'hardhat/types/arguments';

export default task(TASK_LICENSE_WRITE)
  .setDescription('Prepend SPDX license identifier to local source files')
  .addPositionalArgument({
    name: 'license',
    description: 'SPDX license to add to sources (configuration override)',
    type: ArgumentType.STRING_WITHOUT_DEFAULT,
  })
  .addFlag({
    name: 'overwrite',
    description:
      'whether to overwrite existing SPDX license identifiers (configuration override)',
  })
  .setAction(() => import('../actions/license_write.js'))
  .build();
