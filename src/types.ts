export type LicenseIdentifierConfig = {
  license?: string;
  overwrite: boolean;
  runOnCompile: boolean;
  only: string[];
  except: string[];
};

export type LicenseIdentifierUserConfig = Partial<LicenseIdentifierConfig>;
