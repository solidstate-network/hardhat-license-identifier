import pkg from '../../package.json';
import { expect } from 'chai';
import fs from 'fs';
import hre from 'hardhat';
import path from 'path';

const TASK_PREPEND_SPDX_LICENSE = 'prepend-spdx-license';
const HEADER_BASE = '// SPDX-License-Identifier:';

const readContractSource = async (name: string) => {
  const artifact = await hre.artifacts.readArtifact(name);
  return await fs.promises.readFile(artifact.sourceName, 'utf-8');
};

describe(TASK_PREPEND_SPDX_LICENSE, () => {
  const cache: { [sourcePath: string]: string } = {};

  before(async () => {
    // TODO: read sources path(s) from hre.config.paths.sources
    const sourcesDirectory = path.resolve(hre.config.paths.root, 'contracts');

    const sourcePaths = (
      await fs.promises.readdir(sourcesDirectory, {
        recursive: true,
        withFileTypes: true,
      })
    )
      .filter((dirent) => dirent.isFile())
      .map((dirent) => path.resolve(dirent.parentPath, dirent.name));

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
    expect(contentsBefore.includes(HEADER_BASE)).to.be.false;

    await hre.tasks.getTask(TASK_PREPEND_SPDX_LICENSE).run();

    const contentsAfter = await readContractSource('ContractWithoutLicense');
    expect(contentsAfter.includes(`${HEADER_BASE} ${pkg.license}`)).to.be.true;
  });

  it('does not write duplicate license identifiers', async () => {
    const reg = new RegExp(HEADER_BASE, 'g');

    const contentsBefore = await readContractSource('ContractWithLicense');
    expect((contentsBefore.match(reg) ?? []).length).to.equal(1);

    await hre.tasks.getTask(TASK_PREPEND_SPDX_LICENSE).run();

    const contentsAfter = await readContractSource('ContractWithLicense');
    expect((contentsAfter.match(reg) ?? []).length).to.equal(1);
  });
});
