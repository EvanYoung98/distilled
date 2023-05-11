import { FC } from 'react';
import styles from './styles.module.scss'

interface CardLayoutType {
  children: React.ReactNode
}

const CardLayout: FC<CardLayoutType> = (props) => {
  const { children } = props;
  return (
    <div className={styles.cardLayout}>
      {
        children
      }
    </div>
  )
}

export default CardLayout