import { countryType, detailedCountryType } from '@/common/types/country';

export const mockCountry: detailedCountryType = {
  flags: {
      png: "https://flagcdn.com/w320/pt.png",
      svg: "https://flagcdn.com/pt.svg",
      alt: "The flag of Portugal is composed of two vertical bands of green and red in the ratio of 2:3, with the coat of arms of Portugal centered over the two-color boundary."
  },
  name: {
      common: "Portugal",
      official: "Portuguese Republic",
      nativeName: {
          "por": {
              official: "República português",
              common: "Portugal"
          }
      }
  },
  cca2: "PT",
  currencies: {
      "EUR": {
          "name": "Euro",
          "symbol": "€"
      }
  },
  capital: [
      "Lisbon"
  ],
  languages: {
      "por": "Portuguese"
  },
  borders: [
      'ESP'
  ],
  population: 10305564
}

export const mockCountryTwoLanguagesTwoCurrencies: detailedCountryType = {
  flags: {
      png: "https://flagcdn.com/w320/pt.png",
      svg: "https://flagcdn.com/pt.svg",
      alt: "The flag of Portugal is composed of two vertical bands of green and red in the ratio of 2:3, with the coat of arms of Portugal centered over the two-color boundary."
  },
  name: {
      common: "Portugal",
      official: "Portuguese Republic",
      nativeName: {
          "por": {
              official: "República português",
              common: "Portugal"
          }
      }
  },
  cca2: "PT",
  currencies: {
      "EUR": {
          "name": "Euro",
          "symbol": "€"
      },
      "EUR1": {
        "name": "Euro1",
        "symbol": "€"
    }
  },
  capital: [
      "Lisbon"
  ],
  languages: {
      "por": "Portuguese",
      "eng": "English"
  },
  borders: [
      'ESP'
  ],
  population: 10305564
}

export const mockCountryNoBorder: detailedCountryType = {
  flags: {
      png: "https://flagcdn.com/w320/pt.png",
      svg: "https://flagcdn.com/pt.svg",
      alt: "The flag of Portugal is composed of two vertical bands of green and red in the ratio of 2:3, with the coat of arms of Portugal centered over the two-color boundary."
  },
  name: {
      common: "Portugal",
      official: "Portuguese Republic",
      nativeName: {
          "por": {
              official: "República português",
              common: "Portugal"
          }
      }
  },
  cca2: "PT",
  currencies: {
      "EUR": {
          "name": "Euro",
          "symbol": "€"
      }
  },
  capital: [
      "Lisbon"
  ],
  languages: {
      "por": "Portuguese"
  },
  borders: [],
  population: 10305564
}

export const mockStaticPaths = [
  {
    cca2: 'PT'
  },
  {
    cca2: 'ES'
  },
  {
    cca2: 'IE'
  }
]

export const mockBorders: countryType[] = [
  {
      flags: {
          png: "https://flagcdn.com/w320/es.png",
          svg: "https://flagcdn.com/es.svg",
          alt: "The flag of Spain is composed of three horizontal bands of red, yellow and red, with the yellow band twice the height of the red bands. In the yellow band is the national coat of arms offset slightly towards the hoist side of center."
      },
      name: {
          common: "Spain",
          official: "Kingdom of Spain",
          nativeName: {
              spa: {
                  official: "Reino de España",
                  common: "España"
              }
          }
      },
      cca2: "ES",
      capital: [
          "Madrid"
      ],
      population: 47351567,
      currencies: {
        EUR: {
            name: "Euro",
            symbol: "€"
        }
    },
  }
]


export const mockCountries: countryType[] = [
  {
    flags:{
      png: 'https://flagcdn.com/w320/es.png',
      svg: 'https://flagcdn.com/es.svg',
      alt: 'The flag of Spain is composed of three horizontal bands of red, yellow and red, with the yellow band twice the height of the red bands. In the yellow band is the national coat of arms offset slightly towards the hoist side of center.'
    },
    name:{
      common: 'Spain',
      official: 'Kingdom of Spain',
      nativeName:
      {spa:
        {
          official:'Reino de España',
          common: 'España'
        }
      }
    },
    cca2:'ES',
    currencies:{
      'EUR': {
        name: 'Euro',
        symbol: '€'
      }
    },
    capital:['Madrid'],
    population:47351567
  }
]
