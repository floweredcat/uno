import styles from "./styles.module.css";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsersIds,
  selectUsersIsLoading,
} from "../../store/Users/selectors";
import { loadUsers } from "../../store/Users/Thunks/loadUsers";
import { UserDataContainer } from "../../Containers/UserDataContainer/UserDataContainer";
import { useSingleEffect } from "../../hooks/UseSingleEffect";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { AddUserForm } from "../../Components/AddUserForm/AddUserForm";
import { EditUserForm } from "../../Components/EditUserForm/EditUserForm";
import { Table } from "../../Components/Table/Table";
import { ButtonBar } from "../../Components/ButtonsBar/ButtonsBar";
import { DeletePopup } from "../../Components/DeletePopup/DeletePopup";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "../../Components/TableHeader/TableHeader";
import { ROUTES } from "../../assets/constants/Fixtires";
import { useToggleState } from "../../hooks/UseToggleState";

const USER_HEADERS = [
  "#",
  "Имя",
  "E-mail",
  "Телефон",
  "Роль",
  "Франшиза",
  "Баланс",
];

export const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectUsersIsLoading(state));
  useSingleEffect(() => {
    dispatch(loadUsers({ userId }));
    setIsRowSelected(false);
  }, []);
  const usersIds = useSelector((state) => selectUsersIds(state));
  const [isPopupOpened, setIsPopupOpened] = useToggleState(false);
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [isEditPopupOpened, setIsEditPopupOpened] = useToggleState(false);
  const [isDeletePopupOpened, setIsDeletePopupOpened] = useToggleState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const userId = localStorage.userId / 1;
  const resetSelectedRow = () => {
    setSelectedRow(false);
    setIsRowSelected(false);
  };
  const toggleSelectedRow = (el) => {
    if (userId / 1 !== el) {
      if (el) {
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
        <TableHeader headers={USER_HEADERS} />
        {usersIds?.map((id) => {
          return (
            <UserDataContainer
              onclick={toggleSelectedRow}
              onDoubleClick={() => navigate(ROUTES.users + `/${id}`)}
              id={id}
              selectedRow={selectedRow}
              key={nanoid()}
            />
          );
        })}
      </Table>
      <ButtonBar
        onClicks={[
          setIsPopupOpened,
          setIsEditPopupOpened,
          setIsDeletePopupOpened,
        ]}
        disabled={!isRowSelected}
      />
      {isPopupOpened && (
        <PopupContainer togglePopup={setIsPopupOpened}>
          <AddUserForm togglePopup={setIsPopupOpened} />
        </PopupContainer>
      )}
      {isDeletePopupOpened && (
        <DeletePopup
          id={selectedRow}
          toggleDeletePopup={setIsDeletePopupOpened}
          resetSelectedRow={resetSelectedRow}
        />
      )}
      {isEditPopupOpened && (
        <PopupContainer togglePopup={setIsEditPopupOpened}>
          <EditUserForm
            id={selectedRow}
            togglePopup={setIsEditPopupOpened}
            resetSelectedRow={resetSelectedRow}
          />
        </PopupContainer>
      )}
    </div>
  );
};
