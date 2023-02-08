import classNames from "classnames";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Menu } from "../../Components/Menu/Menu";
import { Object } from "../../Pages/Object/Object";
import { Objects } from "../../Pages/Objects/Objects";
import { Profile } from "../../Pages/Profile/Profile";
import { Users } from "../../Pages/Users/Users";
import styles from "./styles.module.css";

export const Layout = () => {
  const navigate = useNavigate();
  const [asideIsOpened, setAsideIsOpened] = useState(true);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  const toggleAside = () => {
    setAsideIsOpened(!asideIsOpened);
  };
  const user = localStorage.getItem("user");

  return (
    <div className={styles.cabinet}>
      <header
        className={classNames(styles.header, {
          [styles.header_moved]: !asideIsOpened,
        })}>
        <button
          type="button"
          className={classNames(styles.button, styles.header_button)}
          onClick={() => toggleAside()}></button>
      </header>
      <Menu asideIsOpened={asideIsOpened} />
      <section
        className={classNames(styles.content, {
          [styles.content_moved]: !asideIsOpened,
        })}>
        <Routes>
                <Route
                  path="/users"
                  element={<Users />}
                />
                <Route
                  path="/profile"
                  element={<Profile />}
                />
                <Route
                  path="/objects"
                  element={<Objects />}
                />
                <Route
                  path="/objects/:id"
                  element={<Object />}
                />
              </Routes>
      </section>
    </div>
  );
};
