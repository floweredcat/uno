import classNames from 'classnames';
import styles from './styles.module.css';
import { nanoid } from 'nanoid';
import addIMG from './images/add.svg';
import editIMG from './images/edit.svg';
import deleteIMG from './images/delete.svg';
import { EditPopup } from '../EditPopup/EditPopup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { usersSliceActions } from '../../store/Users';
import { selectUsers } from '../../store/Users/selectors';
import { loadUsersIfNotExist } from '../../store/Users/middlewares/loadUsersIfNotExist';

export const Users = ({ asideIsOpened }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsersIfNotExist);
  }, []);                     // eeewww
  const users = useSelector((state) => selectUsers(state));
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const data = [];

  for (let i = 0; i < 10; i++) {
    data.push({
      name: 'UM System Group',
      email: 'example@mail.ru',
      phone: '+77007007070',
      role: 'admin',
      city: 'Шымкент, Сарыагаш',
      balance: '250000',
    });
  }

  const headers = ['#', 'НАИМЕНОВАНИЕ', 'E-mail', 'Телефон', 'Роль', 'Франшиза', 'Баланс'];

  return (
    <table className={styles.table}>
      <thead className={styles.table_header}>
        <tr className={styles.table_row}>
          {headers.map((el) => {
            return (
              <th
                key={nanoid()}
                className={classNames(styles.table_cell, styles.table_cell__header)}
              >
                {el}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.table_content}>
        {users.map((el, row) => {
          const cellsValues = Object.values(el);
          const { balance, city, email, name, phone, role } = el;

          return (
            <tr key={nanoid()} className={styles.table_row}>
              {cellsValues.map((_, idx) => {
                switch (idx) {
                  default: return (
                    <td key={nanoid()} className={styles.table_cell}>
                    </td>
                  );
                  case 0:
                    return (
                      <td key={nanoid()} className={styles.table_cell}>
                        {+row + 1}
                      </td>
                    );
                  case 1:
                    return (
                      <td key={nanoid()} className={styles.table_cell}>
                        {name}
                      </td>
                    );
                  case 2:
                    return (
                      <td key={nanoid()} className={styles.table_cell}>
                        {email}
                      </td>
                    );
                  case 3:
                    return (
                      <td key={nanoid()} className={styles.table_cell}>
                        {phone}
                      </td>
                    );
                  case 4:
                    return (
                      <td key={nanoid()} className={styles.table_cell}>
                        {role}
                      </td>
                    );
                  case 5:
                    return (
                      <td key={nanoid()} className={styles.table_cell}>
                        {city}
                      </td>
                    );
                  case 6:
                    return (
                      <td key={nanoid()} className={styles.table_cell}>
                        <div className={styles.table_cell__balance}>{balance ? balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</div>
                      </td>
                    );
                }
              })}
            </tr>
          );
        })}
      </tbody>
      <div className={classNames(styles.bar_container, {
        [styles.bar_moved]: !asideIsOpened
      })}>
        <div className={styles.bar_button}>
          <img
            src={addIMG}
            alt="add button"
            className={styles.bar_buttonImage}
            onClick={() => togglePopup()}
          />
        </div>
        <div className={styles.bar_button}>
          <img
            src={editIMG}
            alt="add button"
            className={styles.bar_buttonImage}
            onClick={() => console.log('add')}
          />
        </div>
        <div className={classNames(styles.bar_button, styles.bar_button__delete)}>
          <img
            src={deleteIMG}
            alt="add button"
            className={styles.bar_buttonImage}
            onClick={() => console.log('add')}
          />
        </div>
      </div>
      {isPopupOpened && <EditPopup isPopupOpened={isPopupOpened} togglePopup={togglePopup}/>}
    </table>
  );
};
