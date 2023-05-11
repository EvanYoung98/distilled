import Link from 'next/link';
import styles from './layout.module.scss';

type DashboardLayoutProps = {
  showHomeButton?: boolean,
  showLanguageButton?: boolean
  children: React.ReactNode,
};

export default function Layout({ children, showHomeButton = false, showLanguageButton = false }: DashboardLayoutProps) {
  return (
    <main className={styles.app}>
    <style jsx global>{`
        body {
          width: 100%;
          margin: 0;
          background-color: #e8f4ea;
        }
    ` }
    </style>
      <h1>Countries App</h1>
      <div className={styles.buttons}>
        {
          showHomeButton && (
            <Link href={`/`} className={styles.homeButton} data-testid="home-button">
              <p>Home</p>
            </Link>
          )
        }
        {
          showLanguageButton && (
            <Link href={`/languages`} className={styles.homeButton} data-testid="languages-button">
              <p>Languages</p> 
            </Link>
          )
        }
      </div>
      {children}
    </main>
  )
}

