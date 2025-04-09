import { prependSpdxLicense } from '../logic.js';
import { NewTaskActionFunction } from 'hardhat/types/tasks';

const action: NewTaskActionFunction = async (args, hre) => {
  await prependSpdxLicense(hre);
};

export default action;
