import { TASK_SHOW_LICENSE } from '../task_names.js';
import { task } from 'hardhat/config';

export default task(TASK_SHOW_LICENSE)
  .setDescription(
    'Print table of SPDX license identifiers in use by local source files',
  )
  .setAction(import.meta.resolve('../actions/show_license.js'))
  .build();
