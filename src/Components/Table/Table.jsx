import styles from './styles.module.css'


export const Table = ({children}) => {
    return (
        <table className={children[0].props?.headers.length === 5 ? styles.table_lite : styles.table}>
            <thead className={styles.table_header}>
                {children[0]}
            </thead>
            <tbody className={styles.table_content}>
              {children[1]}
            </tbody>
          </table>
    )
}