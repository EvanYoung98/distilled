interface countryNameType {
  common: string;
  nativeName: {
    [language: string]: {
      official: string,
      common: string
    }
  },
  official: string
}

export interface currencyType {
  [key: string]: {
    name: string;
    symbol: string;
  }
}

export interface languageType {
  [key: string]: string;
}

interface flagType {
  alt: string;
  png: string;
  svg: string;
}

export interface countryType {
  name: countryNameType;
  capital: string[];
  currencies: currencyType;
  cca2: string;
  flags: flagType;
  population: number;
}

export interface detailedCountryType {
  name: countryNameType;
  capital: string[];
  currencies: currencyType;
  cca2: string;
  flags: flagType;
  population: number;
  borders: string[];
  languages: languageType;
}