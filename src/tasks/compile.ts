import { overrideTask } from 'hardhat/config';

// TODO: import task name constant from Hardhat
export default overrideTask('compile')
  .setAction(import.meta.resolve('../actions/compile.js'))
  .build();
