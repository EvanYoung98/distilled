import styles from './index.module.scss';

type DashboardLayoutProps = {
  children: React.ReactNode,
};

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <main className={styles.app}>
      <h1>Countries App</h1>
      {children}
    </main>
  )
}

