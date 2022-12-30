import classNames from "classnames"
import styles from './styles.module.css'
import { useDispatch } from "react-redux"
import { FormElement } from "../../Components/FormElement/FormElement"

export const Auth = ({login, password}) => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    return (
        <>
            <div className={styles.header}>
                <a href="#" className={classNames(styles.header_link, styles.link)}><div className={classNames(styles.header_logo, styles.logo)} /></a>
            </div>
            <div className={styles.login}>
                    <FormElement />
            </div>
        </>   
    )
}