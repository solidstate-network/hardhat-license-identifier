import { filterSourcePaths } from '../../src/lib/license_identifier.js';
import assert from 'node:assert';
import { describe, it } from 'node:test';

describe('filterSourcePaths', () => {
  const sourcePaths = [
    'contracts/Token.sol',
    'contracts/Proxy.sol',
    'contracts/mocks/MockToken.sol',
    'npm:@solidstate/contracts/interfaces/IERC20.sol',
  ];

  it('filters out npm paths', () => {
    const result = filterSourcePaths(
      { overwrite: false, runOnCompile: false },
      sourcePaths,
    );
    assert.deepStrictEqual(result, [
      'contracts/Token.sol',
      'contracts/Proxy.sol',
      'contracts/mocks/MockToken.sol',
    ]);
  });

  it('filters by only option', () => {
    const result = filterSourcePaths(
      { overwrite: false, runOnCompile: false, only: ['Token'] },
      sourcePaths,
    );
    assert.deepStrictEqual(result, [
      'contracts/Token.sol',
      'contracts/mocks/MockToken.sol',
    ]);
  });

  it('filters by except option', () => {
    const result = filterSourcePaths(
      { overwrite: false, runOnCompile: false, except: ['Mock'] },
      sourcePaths,
    );
    assert.deepStrictEqual(result, [
      'contracts/Token.sol',
      'contracts/Proxy.sol',
    ]);
  });
});
