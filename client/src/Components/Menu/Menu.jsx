import styles from './styles.module.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import usersIMG from './images/person.svg';
import objectIMG from './images/domain.svg';
import profileIMG from './images/Users.svg';
import { authSliceActions } from '../../store/Auth';
import { selectUserName } from '../../store/Auth/selectors';

export const Menu = ({ asideIsOpened, activeFolder, setActiveFolder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userName = useSelector(state => selectUserName(state))
  if (localStorage.user) {
    userName = localStorage.user
  }
  const logout = () => {
    dispatch(authSliceActions.logout())
    navigate('/')
  }
  const user = false
  const FOLDERS = {
    users: 'users',
    profile: 'profile',
    objects: 'objects',
  };

  return (
    <aside
      className={classNames(styles.navWrapper, {
        [styles.navWrapper_visible]: asideIsOpened,
      })}
    >
      <div className={styles.header_logoWrapper}>
        <div
          onClick={() => setActiveFolder(FOLDERS.users)}
          className={classNames(styles.link, styles.header_link)}
        ></div>
      </div>
      <div className={styles.user}>
        <div className={styles.user_info}>
          <div className={styles.user_name}>
            {userName}
          </div>
          <div className={styles.user_from}>{ user?.company || 'Company name'}</div>
        </div>
      </div>
      <nav className={styles.tabs_container}>
        <button
          type="button"
          className={classNames(styles.tab, styles.button, {
            [styles.tab_active]: activeFolder === FOLDERS.users,
          })}
          onClick={() => setActiveFolder(FOLDERS.users)}
        >
          <img src={usersIMG} alt="" className={styles.tab_icon}></img>
          <div className={styles.tab_text}>Пользователи</div>
        </button>
        <button
          type="button"
          className={classNames(styles.tab, styles.button, {
            [styles.tab_active]: activeFolder === FOLDERS.profile,
          })}
          onClick={() => setActiveFolder(FOLDERS.profile)}
        >
          <img src={profileIMG} alt="" className={styles.tab_icon}></img>
          <div className={classNames(styles.button)}>Профиль</div>
        </button>
        <button
          type="button"
          className={classNames(styles.tab, styles.button, {
            [styles.tab_active]: activeFolder === FOLDERS.objects,
          })}
          onClick={() => setActiveFolder(FOLDERS.objects)}
        >
          <img src={objectIMG} alt="" className={styles.tab_icon}></img>
          <div className={classNames(styles.button)}>Объекты</div>
        </button>
      </nav>
      <button to="/" className={classNames(styles.button, styles.exitButton)} onClick={() => logout()}>
        Выйти
      </button>
    </aside>
  );
};
