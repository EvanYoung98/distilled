import { mockCurrencies, mockCurrency, mockLanguage, mockLanguages } from './mockData/utilMockData';
import {getCurrencies, getLanguages} from './utils';

describe('Utils tests', () => {
  it('should return currencies correctly', () => {
    const vals = getCurrencies(mockCurrencies)
    expect(vals).toEqual([
      'Euro, ',
      'British pound'
    ])
    const val = getCurrencies(mockCurrency)
    expect(val).toEqual([
      'Euro'
    ])
  })

  it('should return languages correctly', () => {
    const vals = getLanguages(mockLanguages)
    expect(vals).toEqual([
      'Spanish, ',
      'English'
    ])
    const val = getLanguages(mockLanguage)
    expect(val).toEqual([
      'Spanish',
    ])
  })
});