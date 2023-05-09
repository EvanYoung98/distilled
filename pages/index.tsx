import { FC } from 'react';
import { countryType } from '@/common/types/country';
import { GetStaticProps } from 'next'
import CountryCard from '@/common/components/CountryCard/CountryCard';
import styles from './index.module.scss';
import Layout from './layout';
import Capital from '@/common/components/Capital/Capital.component';

interface HomePropType {
  countries: countryType[];
  err: boolean;
}

const Home: FC<HomePropType> = (props: HomePropType) => {
  const { countries, err } = props
  return (
    <Layout>
      <div className={styles.countries}>
        {
          err ? (
            <p data-testid="error-message">There was an error</p>
          ) : (
            countries.map((country) => (
              <CountryCard key={country.cca2} country={country} width={198} testid={country.cca2}>
                <div className={styles.content}>
                  <p><b>Name:</b> {country.name.common}</p>
                  <Capital capital={country.capital} />
                  <p><b>Population: </b>{country.population.toLocaleString("en-US")}</p>
                </div>
              </CountryCard>
            ))
          )
        }
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
 
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,cca2,flags,population');
    const data: countryType[] = await response.json();
    console.log(data)
    return {
        props: { countries: data, err: false },
    };
  } catch {
    return {
      props: { countries: [], err: true },
    };
  }
}

export default Home;