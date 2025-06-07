import { TASK_LICENSE } from '../task_names.js';
import { emptyTask } from 'hardhat/config';

export default emptyTask(
  TASK_LICENSE,
  'Read and write contract licenses',
).build();
