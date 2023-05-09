import Link from 'next/link';
import styles from './index.module.scss';

type DashboardLayoutProps = {
  showHomeButton?: boolean
  children: React.ReactNode,
};

export default function Layout({ children, showHomeButton = false }: DashboardLayoutProps) {
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
    <div className={styles.navBar}>
      <h1>Countries App</h1>
      {
        showHomeButton && (
          <Link href={`/`} className={styles.homeButton} data-testid="home-button">
            <p>HOME</p>
          </Link>
        )
      }
      {children}
    </div>
    </main>
  )
}

