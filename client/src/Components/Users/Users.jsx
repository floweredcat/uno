import classNames from "classnames";
import styles from "./styles.module.css";
import { nanoid } from "nanoid";
import addIMG from "./images/add.svg";
import editIMG from "./images/edit.svg";
import deleteIMG from "./images/delete.svg";
import { AddPopup } from "../AddPopup/AddPopup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectUsers,
  selectUsersIds,
  selectUsersIsLoading,
} from "../../store/Users/selectors";
import { loadUsers } from "../../store/Users/Thunks/loadUsersIfNotExist";
import { selectUserAuthenticated } from "../../store/Auth/selectors";

export const Users = ({ asideIsOpened }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectUsersIsLoading(state));
  const isUserAuthenticated = useSelector((state) =>
    selectUserAuthenticated(state)
  );
  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(loadUsers);
    }
  }, []);
  const usersIds = useSelector((state) => selectUsersIds(state));
  const usersData = useSelector((state) => selectUsers(state));
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [isRowSelected, setisRowSelected] = useState(false);
  const toggleAddPopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };
  let selectedRow

  const toggleSelectedRow = (el) => {
    setisRowSelected(!!el);
    el ? selectedRow = el : selectedRow = false
  }

  const headers = [
    "#",
    "НАИМЕНОВАНИЕ",
    "E-mail",
    "Телефон",
    "Роль",
    "Франшиза",
    "Баланс",
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.users_wrapper}>
      {usersData ? (
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr className={styles.table_row}>
              {headers?.map((el) => {
                return (
                  <th
                    key={nanoid()}
                    className={classNames(
                      styles.table_cell,
                      styles.table_cell__header
                    )}>
                    {el}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.table_content}>
            {usersIds?.map((el, row) => {
              const user = usersData[el];
              const { AMOUNT, CITY, EMAIL, NAME, PHONE, ROLENAME } = user;

              return (
                <tr
                  key={el}
                  className={styles.table_row}
                  onClick={() => toggleSelectedRow(el)}>
                  {headers.map((_, idx) => {
                    switch (idx) {
                      default:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}></td>
                        );
                      case 0:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}>
                            {+row + 1}
                          </td>
                        );
                      case 1:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}>
                            {NAME}
                          </td>
                        );
                      case 2:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}>
                            {EMAIL}
                          </td>
                        );
                      case 3:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}>
                            {PHONE}
                          </td>
                        );
                      case 4:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}>
                            {ROLENAME}
                          </td>
                        );
                      case 5:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}>
                            {CITY}
                          </td>
                        );
                      case 6:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}>
                            <div className={styles.table_cell__balance}>
                              {AMOUNT
                                ? AMOUNT.toString().replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                : 0}
                            </div>
                          </td>
                        );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyData}>Данные отсутствуют</div>
      )}
      <div
        className={classNames(styles.bar_container, {
          [styles.bar_moved]: !asideIsOpened,
        })}>
        <div className={styles.bar_button}>
          <img
            src={addIMG}
            alt="add button"
            className={styles.bar_buttonImage}
            onClick={() => toggleAddPopup()}
          />
        </div>
        <button
          className={classNames(styles.bar_button, styles.button)}
          onClick={()=> console.log('1232')}
          disabled={isRowSelected}>
          <img
            src={editIMG}
            alt="add button"
            className={styles.bar_buttonImage}
          />
        </button>
        <button
          className={classNames(
            styles.bar_button,
            styles.bar_button__delete,
            styles.button
          )}
          disabled={isRowSelected}
          onClick={() => console.log("add")}>
          <img
            src={deleteIMG}
            alt="add button"
            className={styles.bar_buttonImage}
          />
        </button>
      </div>
      {isPopupOpened && <AddPopup toggleAddPopup={toggleAddPopup} />}
    </div>
  );
};
