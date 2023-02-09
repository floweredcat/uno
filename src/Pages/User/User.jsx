import { useParams } from "react-router-dom"
import styles from './styles.module.css'

export const User = () => {
    const {id} = useParams()
    return <div className={styles.user}>{`page for user with ${id} id`}</div>
}