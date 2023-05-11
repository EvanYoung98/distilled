import { countryType, detailedCountryType } from '@/common/types/country';
import { GetStaticProps } from 'next'
import Layout from '@/common/layout';
import styles from './[id].module.scss';
import CountryCard from '@/common/components/CountryCard/CountryCard';
import Link from 'next/link';
import { getCurrencies, getLanguages } from '@/common/utils';
import Capital from '@/common/components/Capital/Capital.component';
import CardLayout from '@/common/components/CardLayout/CardLayout';

interface CountryPageProps {
  country: detailedCountryType;
  borders: countryType[];
  err: boolean;
}

export default function CountryPage(props: CountryPageProps) {
  const country = props.country;
  const borders = props.borders
  const err = props.err
  const {name, population, capital, currencies, languages } = country;
  return (
    <Layout showHomeButton={true} showLanguageButton={true}>
      <div className={styles.mainCard}>
        {
          err ? (
            <p data-testid="error-message">There was an error</p>
          ) : (
            <>
              <h2>{name.common}</h2>
              <CountryCard key={country.cca2} country={country} width={300} testid={country.cca2} clickable={false}>
                <div className={styles.content} data-testid={`${country.cca2}-main-card-content`}>
                  <p><b>Name:</b> {name.common}</p>
                  <Capital capital={capital} />
                  <p><b>Population: </b>{population.toLocaleString("en-US")}</p>
                  <p><b>{Object.keys(currencies).length > 1 ? 'Currencies' : 'Currency'}: </b>{getCurrencies(currencies)}</p>
                  <p><b>{Object.keys(languages).length > 1 ? 'Languages' : 'Language'}:</b> {getLanguages(languages)}</p>
                </div>
              </CountryCard>
                <h2>Borders</h2>
                <CardLayout>
                  {borders.map((border) => (
                    <CountryCard key={border.cca2} country={border} width={99} testid={`border-card-${border.cca2}`}>
                      <div className={styles.borderContent} data-testid={`border-card-content-${border.cca2}`}>
                        <p><b>Name:</b> {border.name.common}</p>
                        <Capital capital={border.capital} />
                        <p><b>Population: </b>{border.population.toLocaleString("en-US")}</p>
                      </div>
                    </CountryCard>
                  ))}
              </CardLayout>
            </>
          )
        }
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${params!.id}?fields=name,capital,borders,currencies,cca2,flags,population,languages`);
    const data: detailedCountryType = await response.json();
    if(data.borders.length === 0) {
      return {
        props: { 
          country: data,
          borders: []
        },
      };
    }
    else {
      const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${data.borders}&fields=name,capital,cca2,flags,population`);
      const d = await res.json();
      return {
        props: { 
          country: data,
          borders: d
        },
      };
    }
  } catch {
    return {
      props: { country: {}, borders: [], err: true },
    };
  }
};

export const getStaticPaths = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=cca2');
  const data: countryType[] = await response.json();
  const paths = data.map(({ cca2 }) => ({ params: { id: cca2 } }));
  return {
    paths,
    fallback: false,
  };
};