import { TASK_LICENSE_LIST } from '../task_names.js';
import { task } from 'hardhat/config';

export default task(TASK_LICENSE_LIST)
  .setDescription(
    'Print table of SPDX license identifiers in use by local source files',
  )
  .setAction(() => import('../actions/license_list.js'))
  .build();
