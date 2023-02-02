import styles from "./styles.module.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usersIMG from "./images/person.svg";
import objectIMG from "./images/domain.svg";
import profileIMG from "./images/Users.svg";
import { authSliceActions } from "../../store/Auth";
import { selectUserName } from "../../store/Auth/selectors";
import { FOLDERS } from "../../constants/Fixtires";
import { Tab } from "../Tab/Tab";

export const Menu = ({ asideIsOpened, activeFolder, setActiveFolder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userName = useSelector((state) => selectUserName(state));
  if (localStorage.user) {
    userName = localStorage.user;
  }
  const logout = () => {
    dispatch(authSliceActions.logout());
    navigate("/");
  };

  const isActive = (folderName) => {
    if (activeFolder === folderName) {
      return true;
    } else return false;
  };

  return (
    <aside
      className={classNames(styles.navWrapper, {
        [styles.navWrapper_visible]: asideIsOpened,
      })}>
      <div className={styles.header_logoWrapper}>
        <div
          onClick={() => setActiveFolder(FOLDERS.users)}
          className={classNames(styles.link, styles.header_link)}></div>
      </div>
      <div className={styles.user}>
          <div className={styles.user_name}>{userName}</div>
      </div>
      <nav className={styles.tabs_container}>
        <Tab
          title={"Пользователи"}
          img={usersIMG}
          onClick={() => setActiveFolder(FOLDERS.users)}
          isActive={isActive(FOLDERS.users)}
        />
        <Tab
          title={"Профиль"}
          img={profileIMG}
          onClick={() => setActiveFolder(FOLDERS.profile)}
          isActive={isActive(FOLDERS.profile)}
        />
        <Tab
          title={"Объекты"}
          img={objectIMG}
          onClick={() => setActiveFolder(FOLDERS.objects)}
          isActive={isActive(FOLDERS.objects)}
        />
      </nav>
      <button
        to="/"
        className={classNames(styles.button, styles.exitButton)}
        onClick={() => logout()}>
        Выйти
      </button>
    </aside>
  );
};
