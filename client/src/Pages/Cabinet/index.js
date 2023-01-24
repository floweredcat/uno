import styles from './styles.module.css';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Users } from '../../Components/Users/Users';
import { Profile } from '../../Components/Profile/Profile';
import { Objects } from '../../Components/Objects/Objects';
import { Menu } from '../../Components/Menu/Menu';
import { useNavigate } from 'react-router-dom'; 
import { FOLDERS } from '../../constants/Fixtires';


export const Cabinet = () => {
  const navigate = useNavigate()
  const [activeFolder, setActiveFolder] = useState(FOLDERS.users);
  const [asideIsOpened, setAsideIsOpened] = useState(true);
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [])
  const toggleAside = () => {
    setAsideIsOpened(!asideIsOpened);
  };
  const user = localStorage.getItem('user')

  return (
    <div className={styles.cabinet}>
      <header
        className={classNames(styles.header, {
          [styles.header_moved]: !asideIsOpened,
        })}
      >
        <button
          type="button"
          className={classNames(styles.button, styles.header_button)}
          onClick={() => toggleAside()}
        ></button>
      </header>
      <Menu
        asideIsOpened={asideIsOpened}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
      />
      <section
        className={classNames(styles.content, {
          [styles.content_moved]: !asideIsOpened,
        })}
      >
        {activeFolder === FOLDERS.users && <Users />}
        {activeFolder === FOLDERS.profile && <Profile />}
        {activeFolder === FOLDERS.objects && <Objects />}
      </section>
    </div>
  );
};
