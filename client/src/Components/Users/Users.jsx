import classNames from "classnames";
import styles from "./styles.module.css";
import { nanoid } from "nanoid";
import { AddPopup } from "../AddPopup/AddPopup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectUsersIds,
  selectUsersIsLoading,
} from "../../store/Users/selectors";
import { loadUsers } from "../../store/Users/Thunks/loadUsers";
import { DeletePopup } from "../DeletePopup/DeletePopup";
import { EditPopup } from "../EditPopup/EditPopup";
import { ButtonBar } from "../ButtonsBar/ButtonsBar";
import { UserData } from "../UserData/UserData";

export const Users = ({ asideIsOpened }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectUsersIsLoading(state));
  useEffect(() => {
    dispatch(loadUsers({ userId }));
    setIsRowSelected(false);
  }, [dispatch]);
  const usersIds = useSelector((state) => selectUsersIds(state));
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [isEditPopupOpened, setIsEditPopupOpened] = useState(false);
  const [isDeletePopupOpened, setIsDeletePopupOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const userId = localStorage.userId / 1;

  const toggleAddPopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };
  const resetSelectedRow = () => {
    setSelectedRow(false);
    setIsRowSelected(false);
  };
  const toggleDeletePopup = () => {
    setIsDeletePopupOpened(!isDeletePopupOpened);
  };

  const toggleEditPopup = () => {
    setIsEditPopupOpened(!isEditPopupOpened);
  };

  const toggleSelectedRow = (el) => {
    if (userId / 1 !== el) {
      if (!!el) {
        if (selectedRow === el) {
          resetSelectedRow();
        } else {
          setIsRowSelected(true);
          setSelectedRow(el);
        }
      } else {
        resetSelectedRow();
      }
    }
  };

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
      {true ? (
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
                    )}
                  >
                    {el}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.table_content}>
            {usersIds?.map((el) => {
              return (
                <UserData
                  onclick={toggleSelectedRow}
                  userId={el}
                  selectedRow={selectedRow}
                  key={nanoid()}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyData}>Данные отсутствуют</div>
      )}

      <ButtonBar
        onClicks={[toggleAddPopup, toggleEditPopup, toggleDeletePopup]}
        disabled={!isRowSelected}
        asideIsOpened={asideIsOpened}
      />
      {isPopupOpened && <AddPopup toggleAddPopup={toggleAddPopup} />}
      {isDeletePopupOpened && (
        <DeletePopup
          id={selectedRow}
          toggleDeletePopup={toggleDeletePopup}
          resetSelectedRow={resetSelectedRow}
        />
      )}
      {isEditPopupOpened && (
        <EditPopup
          id={selectedRow}
          togglePopup={toggleEditPopup}
          resetSelectedRow={resetSelectedRow}
        />
      )}
    </div>
  );
};
