export type SpdxLicenseIdentifierConfig = {
  overwrite: boolean;
  runOnCompile: boolean;
  only: string[];
  except: string[];
};

export type SpdxLicenseIdentifierUserConfig =
  Partial<SpdxLicenseIdentifierConfig>;
