import { languageRes } from '@/common/types/country';
import { GetStaticProps } from 'next'
import Layout from '@/common/layout';
import Link from 'next/link';
import styles from './[id].module.scss';

interface CountryPageProps {
  languages: string[];
  err: boolean;
}

export default function LanguagesPage(props: CountryPageProps) {
  const { languages, err } = props;
  return (
    <Layout showHomeButton={true}>
      <div className={styles.main}>
        <h2>Languages</h2>
        {
        err ? (
          <p data-testid="error-message">There was an error</p>
        ) : (
        <div className={styles.content}>
        {
          languages.map((lang) => (
            <Link key={lang} href={`/languages/${lang}`.toLowerCase()} className={styles.langCard} data-testid={`language-${lang}`}>
              {lang}
            </Link>
          ))
        }
        </div>
      )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({}) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=languages`);
    const data: languageRes[] = await response.json();
    let languages: string[] = [];
    data.forEach((lang) => {
      const langVals = lang.languages
      Object.keys(langVals).forEach((key) => {
        if(!languages.includes(langVals[key])) {
          languages.push(langVals[key])
        }
      });
    })
    languages = languages.sort((a, b) => {
      if(a.toLowerCase() < b.toLowerCase()) return -1;
      if(a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    })
    return {
      props: { 
        languages: languages,
      },
    };
  } catch {
    return {
      props: { languages: {}, err: true },
    };
  }
};