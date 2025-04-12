# Hardhat SPDX License Identifier

Automatically prepend Solidity source files in Hardhat projects with an SPDX License Identifier.

> Versions of this plugin prior to `3.0.0` were released as `hardhat-spdx-license-identifier`, outside of the `@solidstate` namespace.

> Versions of this plugin prior to `2.0.0` were released as `buidler-spdx-license-identifier`.

## Installation

```bash
npm install --save-dev @solidstate/hardhat-license-identifier
# or
yarn add --dev @solidstate/hardhat-license-identifier
```

## Usage

Load plugin in Hardhat config:

```javascript
import HardhatLicenseIdentifier from '@solidstate/hardhat-license-identifier';

const config: HardhatUserConfig = {
  plugins: [
    HardhatLicenseIdentifier,
  ],
  licenseIdentifier: {
    ... // see table for configuration options
  },
};
```

Add configuration under the `licenseIdentifier` key:

| option         | description                                                                                            | default                           |
| -------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `license`      | SPDX license to add to source files                                                                    | `license` field of `package.json` |
| `overwrite`    | whether to overwrite existing SPDX license identifiers                                                 | `false`                           |
| `runOnCompile` | whether to automatically prepend identifiers during compilation                                        | `false`                           |
| `only`         | `Array` of `String` matchers used to select included paths, defaults to all contracts if `length` is 0 | `[]`                              |
| `except`       | `Array` of `String` matchers used to exclude paths                                                     | `[]`                              |

```javascript
licenseIdentifier: {
  overwrite: true,
  runOnCompile: true,
  except: ['vendor/']
}
```

The included Hardhat task may be run manually. Its arguments override any existing configuration:

```bash
npx hardhat prepend-license UNLICENSED --overwrite
# or
yarn run hardhat prepend-license UNLICENSED --overwrite
```

Files which do not contain a license identifier will be prepended with one. Files with a license identifier which does not match that which is specified in `package.json` may be updated, depending on configuration.

## Development

Install dependencies via Yarn:

```bash
yarn install
```

Setup Husky to format code on commit:

```bash
yarn prepare
```
