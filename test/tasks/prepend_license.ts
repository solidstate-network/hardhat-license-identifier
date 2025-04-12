import pkg from '../../package.json';
import fs from 'fs';
import hre from 'hardhat';
import assert from 'node:assert';
import { describe, it, before, afterEach } from 'node:test';

const TASK_PREPEND_LICENSE = 'prepend-license';
const HEADER_BASE = '// SPDX-License-Identifier:';

const readContractSource = async (name: string) => {
  const artifact = await hre.artifacts.readArtifact(name);
  return await fs.promises.readFile(artifact.sourceName, 'utf-8');
};

describe(TASK_PREPEND_LICENSE, () => {
  const cache: { [sourcePath: string]: string } = {};

  before(async () => {
    const sourcePaths = await hre.solidity.getRootFilePaths();

    for (const sourcePath of sourcePaths) {
      cache[sourcePath] = await fs.promises.readFile(sourcePath, 'utf-8');
    }
  });

  afterEach(async () => {
    for (const sourcePath in cache) {
      fs.writeFileSync(sourcePath, cache[sourcePath]);
    }
  });

  it('writes license identifier to top of source file', async () => {
    const contentsBefore = await readContractSource('ContractWithoutLicense');
    assert(!contentsBefore.includes(HEADER_BASE));

    await hre.tasks.getTask(TASK_PREPEND_LICENSE).run();

    const contentsAfter = await readContractSource('ContractWithoutLicense');
    assert(contentsAfter.includes(`${HEADER_BASE} ${pkg.license}`));
  });

  it('does not write duplicate license identifiers', async () => {
    const reg = new RegExp(HEADER_BASE, 'g');

    const contentsBefore = await readContractSource('ContractWithLicense');
    assert((contentsBefore.match(reg) ?? []).length === 1);

    await hre.tasks.getTask(TASK_PREPEND_LICENSE).run();

    const contentsAfter = await readContractSource('ContractWithLicense');
    assert((contentsAfter.match(reg) ?? []).length === 1);
  });
});
