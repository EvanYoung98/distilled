import { countryType, languageRes } from '@/common/types/country';
import { GetStaticProps } from 'next'
import styles from './[id].module.scss';
import CountryCard from '@/common/components/CountryCard/CountryCard';
import CardLayout from '@/common/components/CardLayout/CardLayout';
import Layout from '@/common/layout';

interface CountryPageProps {
  countries: countryType[];
  err: boolean;
  language: string
}

export default function LanguagePage(props: CountryPageProps) {
  const countries = props.countries;
  const language = props.language;
  const err = props.err
  return (
    <Layout showHomeButton={true}>
      <div className={styles.mainCard}>
        {
          err ? (
            <p data-testid="error-message">There was an error</p>
          ) : (
            <>
            <h2>{language}</h2>
              <CardLayout>
              {
                countries.map((country) => (
                  <CountryCard
                    key={country.cca2} country={country} width={99} testid={`lang-card-${country.cca2}`}
                  >
                    <div className={styles.cardContent} data-testid={`lang-card-content-${country.cca2}`}>
                      <p><b>Name:</b> {country.name.common}</p>
                      <p><b>Population: </b>{country.population.toLocaleString("en-US")}</p>
                    </div>
                  </CountryCard>
                ))
              }
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
    const response = await fetch(`https://restcountries.com/v3.1/lang/${params!.id}`);
    const data: countryType[] = await response.json();
    return {
      props: { 
        countries: data,
        err: false,
        language: params!.id
      },
    };
  } catch {
    return {
      props: { countries: [], err: true },
    };
  }
};

export const getStaticPaths = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=languages');
  const data: languageRes[] = await response.json();
  let languages: string[] = [];
  data.forEach((lang) => {
    const langVals = lang.languages
    Object.keys(langVals).forEach((key) => {
      if(!languages.includes(langVals[key])) {
        languages.push(langVals[key].toLowerCase())
      }
    });
  })
  const paths = languages.map((lan) => ({ 
    params: { id: lan } }));
  return {
    paths,
    fallback: false,
  };
};