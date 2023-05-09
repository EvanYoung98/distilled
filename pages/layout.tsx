import Link from 'next/link';
import styles from './index.module.scss';

type DashboardLayoutProps = {
  showHomeButton?: boolean
  children: React.ReactNode,
};

export default function Layout({ children, showHomeButton = false }: DashboardLayoutProps) {
  return (
    <main className={styles.app}>
      <h1>Countries App</h1>
      {
        showHomeButton && (
          <Link href={`/`} className={styles.homeButton} data-testid="home-button">
            <p>HOME</p>
          </Link>
        )
      }
      {children}
    </main>
  )
}

