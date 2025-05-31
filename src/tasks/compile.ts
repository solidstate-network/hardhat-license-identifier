import { TASK_COMPILE } from '../task_names.js';
import { overrideTask } from 'hardhat/config';

export default overrideTask(TASK_COMPILE)
  .setAction(import.meta.resolve('../actions/compile.js'))
  .build();
