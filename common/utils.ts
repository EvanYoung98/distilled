import { currencyType, languageType } from "./types/country";

export const getCurrencies = (currencies: currencyType) => {
  const values: string[] = []
  Object.keys(currencies).forEach(function(key, index) {
    values.push(`${currencies[key].name}${index < Object.keys(currencies).length - 1 ? ', ' : ''}`);
  });
  return values
}

export const getLanguages = (languages: languageType) => {
  const values: string[] = []
  Object.keys(languages).forEach((key, index) => {
    values.push(`${languages[key]}${index < Object.keys(languages).length - 1 ? ', ' : ''}`);
  });
  return values
}
