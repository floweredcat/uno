import styles from "./styles.module.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usersIMG from "../../assets/images/person.svg";
import objectIMG from "../../assets/images/domain.svg";
import profileIMG from "../../assets/images/Users.svg";
import { authSliceActions } from "../../store/Auth";
import { selectUserName } from "../../store/Auth/selectors";
import { Tab } from "../Tab/Tab";
import { FOLDERS, ROUTES } from "../../assets/constants/Fixtires";

export const Menu = ({ asideIsOpened }) => {
  const userAccess = localStorage.userIdAccess;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userName = useSelector((state) => selectUserName(state));
  if (localStorage.user) {
    userName = localStorage.user;
  }
  const logout = () => {
    dispatch(authSliceActions.logout());
    navigate(ROUTES.auth);
  };

  return (
    <aside
      className={classNames(styles.navWrapper, {
        [styles.navWrapper_visible]: asideIsOpened,
      })}>
      <div className={styles.header_logoWrapper}>
        <div
          onClick={() => navigate(userAccess != 3 ? ROUTES.users : ROUTES.objects)}
          className={classNames(styles.link, styles.header_link)}></div>
      </div>
      <div className={styles.user}>
        <div className={styles.user_name}>{userName}</div>
      </div>
      <nav className={styles.tabs_container}>
        {userAccess != 3 && <Tab
          title={FOLDERS.users}
          img={usersIMG}
          link={"/users"}
        />}
        <Tab
          title={FOLDERS.profile}
          img={profileIMG}
          link={"/profile"}
        />
        <Tab
          title={FOLDERS.objects}
          img={objectIMG}
          link={"/objects"}
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
