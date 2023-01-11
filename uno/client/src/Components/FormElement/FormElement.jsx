import classNames from "classnames"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authSliceActions } from "../../store/Auth"
import logo from './images/logo.png'
import styles from './styles.module.css'

export const FormElement = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(authSliceActions.login({email}))
        navigate('/cabinet');
    }

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }
    
    return (
        <div className={styles.login_formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
            <img src={logo} alt='logo' className={styles.form_logo} />
            <div className={styles.input_container}>
                <input autoComplete="new-password" id="login" type="text" className={styles.form_input} required placeholder=' ' value={email} onChange={(event) => setEmail(event.target.value)}/>
                <label htmlFor="login" className={styles.form_label}>Логин</label>
            </div>
            <div className={styles.input_container}>
                <input autoComplete="new-password" id="password" type={passwordVisible ? 'text' : 'password'} className={styles.form_input} required placeholder=' ' value={password} onChange={(event) => setPassword(event.target.value)}/>
                <label htmlFor="password" className={styles.form_label}>Пароль</label><button className={classNames({[styles.form_hideButton]: passwordVisible,
                    [styles.form_hidePuttonFilled]: !passwordVisible})} type="button" onClick={togglePasswordVisible}></button>
            </div>
            <button className={styles.form_submit} type="submit">Войти</button>
            <button className={styles.form_forget} type="button">Забыли пароль?</button>
        </form>
        </div>
    )
}