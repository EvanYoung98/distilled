import { FC } from 'react';
import { countryType, detailedCountryType } from '@/common/types/country';
import styles from './styles.module.scss'
import Image from 'next/image';
import Link from 'next/link';

interface CountryCardTypes {
  country: countryType | detailedCountryType
  width: number
  children: React.ReactNode
  testid?: string;
  clickable?: boolean
}

const CountryCard: FC<CountryCardTypes> = (props) => {
  const { country, width, children, testid, clickable = true } = props;
  const {flags, cca2} = country;
  const content = (
    <div className={styles.content}>
      <Image src={flags.svg} alt={country.flags.alt} width={width} height={width*.66} data-testid={`${cca2}-image`}/>
      {children}
    </div>
  )
  return (
    <>
      {
        clickable ? (
          <Link href={`/countries/${cca2}`} className={styles.card} data-testid={testid}>
            {content}
          </Link>
        ) :
        (
          <div className={styles.card} data-testid={testid}>
            {content}
          </div>
        )
      }
    </>
  )
}

export default CountryCard