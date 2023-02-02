import classNames from "classnames";
import styles from "./styles.module.css";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsersIds,
  selectUsersIsLoading,
} from "../../store/Users/selectors";
import { loadUsers } from "../../store/Users/Thunks/loadUsers";
import { DeletePopup } from "../DeletePopup/DeletePopup";
import { ButtonBar } from "../ButtonsBar/ButtonsBar";
import { USER_HEADERS } from "../../constants/Fixtires";
import { UserDataContainer } from "../../Containers/UserDataContainer/UserDataContainer";
import { useSingleEffect } from "../../hooks/UseSingleEffect";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { AddUserForm } from "../AddUserForm/AddUserForm";
import { EditUserForm } from "../EditUserForm/EditUserForm";
import { Table } from "../Table/Table";

export const Users = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectUsersIsLoading(state));
  useSingleEffect(() => {
    dispatch(loadUsers({ userId }));
    setIsRowSelected(false);
  }, []);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.users_wrapper}>
      <Table>
          {USER_HEADERS.map((el) => {
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
        {usersIds?.map((el) => {
          return (
            <UserDataContainer
              onclick={toggleSelectedRow}
              id={el}
              selectedRow={selectedRow}
              key={nanoid()}
            />
          );
        })}
      </Table>
      <ButtonBar
        onClicks={[toggleAddPopup, toggleEditPopup, toggleDeletePopup]}
        disabled={!isRowSelected}
      />
      {isPopupOpened && (
        <PopupContainer togglePopup={toggleAddPopup}>
          <AddUserForm togglePopup={toggleAddPopup} />
        </PopupContainer>
      )}
      {isDeletePopupOpened && (
        <DeletePopup
          id={selectedRow}
          toggleDeletePopup={toggleDeletePopup}
          resetSelectedRow={resetSelectedRow}
        />
      )}
      {isEditPopupOpened && (
        <PopupContainer togglePopup={toggleEditPopup}>
          <EditUserForm
            id={selectedRow}
            togglePopup={toggleEditPopup}
            resetSelectedRow={resetSelectedRow}
          />
        </PopupContainer>
      )}
    </div>
  );
};
