import pkg from '../../package.json' with { type: 'json' };
import { TASK_LICENSE_WRITE } from '../../src/task_names.js';
import { readUtf8File, writeUtf8File } from '@nomicfoundation/hardhat-utils/fs';
import hre from 'hardhat';
import { createHardhatRuntimeEnvironment } from 'hardhat/hre';
import assert from 'node:assert';
import { describe, it, before, afterEach } from 'node:test';

const HEADER_BASE = '// SPDX-License-Identifier:';

const readContractSource = async (name: string) => {
  const { sourceName } = await hre.artifacts.readArtifact(name);
  return await readUtf8File(sourceName);
};

describe(TASK_LICENSE_WRITE.join(' '), () => {
  const cache: { [sourcePath: string]: string } = {};

  before(async () => {
    const sourcePaths = await hre.solidity.getRootFilePaths();

    for (const sourcePath of sourcePaths) {
      cache[sourcePath] = await readUtf8File(sourcePath);
    }
  });

  afterEach(async () => {
    for (const sourcePath in cache) {
      await writeUtf8File(sourcePath, cache[sourcePath]);
    }
  });

  it('writes license identifier to top of source file', async () => {
    const contentsBefore = await readContractSource('ContractWithoutLicense');
    assert(!contentsBefore.includes(HEADER_BASE));

    await hre.tasks.getTask(TASK_LICENSE_WRITE).run();

    const contentsAfter = await readContractSource('ContractWithoutLicense');
    assert(contentsAfter.includes(`${HEADER_BASE} ${pkg.license}`));
  });

  it('does not write duplicate license identifiers', async () => {
    const reg = new RegExp(HEADER_BASE, 'g');

    const contentsBefore = await readContractSource('ContractWithLicense');
    assert((contentsBefore.match(reg) ?? []).length === 1);

    await hre.tasks.getTask(TASK_LICENSE_WRITE).run();

    const contentsAfter = await readContractSource('ContractWithLicense');
    assert((contentsAfter.match(reg) ?? []).length === 1);
  });

  it('ignores npmFilesToBuild entries', async () => {
    const { default: config } = await import('../../hardhat.config.js');

    const hre = await createHardhatRuntimeEnvironment({
      ...config,
      solidity: {
        version: '0.8.30',
        // npm file imported to test that it's excluded from processing
        npmFilesToBuild: ['@solidstate/contracts/interfaces/IERC20.sol'],
      },
    });

    await assert.doesNotReject(hre.tasks.getTask(TASK_LICENSE_WRITE).run());
  });
});
