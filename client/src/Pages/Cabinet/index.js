import styles from './styles.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { Users } from '../../Components/Users/Users';
import { Profile } from '../../Components/Profile/Profile';
import { Objects } from '../../Components/Objects/Objects';
import { Menu } from '../../Components/Menu/Menu';

const FOLDERS = {
  users: 'users',
  profile: 'profile',
  objects: 'objects',
};

export const Cabinet = () => {
  const [activeFolder, setActiveFolder] = useState(FOLDERS.users);
  const [asideIsOpened, setAsideIsOpened] = useState(true);
  const toggleAside = () => {
    setAsideIsOpened(!asideIsOpened);
  };

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
        {activeFolder === FOLDERS.users && <Users asideIsOpened={asideIsOpened} />}
        {activeFolder === FOLDERS.profile && <Profile />}
        {activeFolder === FOLDERS.objects && <Objects />}
      </section>
    </div>
  );
};
