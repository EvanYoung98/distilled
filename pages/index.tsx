import { FC } from 'react';
import { countryType } from '@/common/types/country';
import { GetStaticProps } from 'next'
import CountryCard from '@/common/components/CountryCard/CountryCard';
import styles from './index.module.scss';
import Layout from './layout';
import Capital from '@/common/components/Capital/Capital.component';

interface HomePropType {
  countries: countryType[]
}

const Home: FC<HomePropType> = (props: HomePropType) => {
  const { countries } = props
  return (
    <Layout>
      <div className={styles.countries}>
        {
          countries.map((country) => (
            <CountryCard key={country.cca2} country={country} width={198} testid={country.cca2}>
              <div className={styles.content}>
                <p><b>Name:</b> {country.name.common}</p>
                <Capital capital={country.capital} />
                <p><b>Population: </b>{country.population.toLocaleString("en-US")}</p>
              </div>
            </CountryCard>
          ))
        }
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
 
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,cca2,flags,population');

  const data: countryType[] = await response.json();
 
  return {
      props: { countries: data },
  };
}

export default Home;