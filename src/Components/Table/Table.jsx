import styles from './styles.module.css'


export const Table = ({children}) => {
    return (
        <table className={styles.table}>
            <thead className={styles.table_header}>
              <tr className={styles.table_row}>
                {children[0]}
              </tr>
            </thead>
            <tbody className={styles.table_content}>
              {children[1]}
            </tbody>
          </table>
    )
}