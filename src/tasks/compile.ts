import { overrideTask } from 'hardhat/config';

export default overrideTask('compile')
  .setAction(import.meta.resolve('../actions/compile.js'))
  .build();
