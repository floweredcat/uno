import classNames from "classnames";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectObjectsIds,
  selectObjectsIsLoading,
} from "../../store/Objects/selectors";
import { getObjects } from "../../store/Objects/Thunks/getObjects";
import styles from "./styles.module.css";
import { Object } from "../Object/Object";
import { selectUserId } from "../../store/Auth/selectors";
import { UserData } from "../UserData/UserData";
import { getPackagePrices } from "../../store/ObjectPrices/Thunks/getPackagePrices";
import { getFransheses } from "../../store/Franshises/Thunks/getFransheses";
import { ButtonBar } from "../ButtonsBar/ButtonsBar";
import { AddObjectPopup } from "../AddObjectPopup/AddObjectPopup";
import { SearchBar } from "../SearchBar/SearchBar";

export const Objects = ({ asideIsOpened }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectObjectsIsLoading(state));
  const objectsIds = useSelector((state) => selectObjectsIds(state));
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [filter, setFilter] = useState("");
  let userId = useSelector((state) => selectUserId(state));
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  useEffect(() => {
    dispatch(getObjects({ userId }));
    dispatch(getPackagePrices);
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(getFransheses({ userId }));
  }, []);
  const togglePopupOpened = () => {
    setIsPopupOpened(!isPopupOpened);
  };
  if (localStorage.userId) {
    userId = localStorage.userId;
  }

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const headers = [
    "ID",
    "Название",
    "Город",
    "Телефон",
    "Дата",
    "Партнер",
    "Баланс",
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.objects_wrapper}>
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
                  {el === "Название" ? (
                    <SearchBar
                      filter={filter}
                      handleSearch={handleSearch}
                      placeholder={el}
                    />
                  ) : (
                    el
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.table_content}>
          {objectsIds?.map((id) => (
            <UserData
              key={id}
              id={id}
              filter={filter}
              onclick={setIsRowSelected}
            />
          ))}
        </tbody>
      </table>
      {isRowSelected && (
        <Object toggleObject={setIsRowSelected} id={isRowSelected} />
      )}
      <ButtonBar onClicks={[togglePopupOpened]} asideIsOpened={asideIsOpened} />
      {isPopupOpened && <AddObjectPopup togglePopup={togglePopupOpened} />}
    </div>
  );
};
