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

export const Objects = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectObjectsIsLoading(state));
  const objectsIds = useSelector((state) => selectObjectsIds(state));
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [filter, setFilter] = useState("");
  let userId = useSelector((state) => selectUserId(state));
  if (localStorage.userId) {
    userId = localStorage.userId;
  }
  useEffect(() => {
    dispatch(getObjects({ userId }));
  }, []);
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
  const userStyles = {
    cell: styles.table_cell,
    cell_num: classNames(styles.table_cell, styles.table_cell__num),
    row: styles.table_row,
    cell__balance: styles.table_cell__balance,
  };

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
                    <input
                      id="search"
                      type="text"
                      value={filter}
                      placeholder={el}
                      autoFocus={true}
                      onChange={handleSearch}
                      className={styles.search_input}
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
              styles={userStyles}
              objectId={id}
              filter={filter}
              onclick={setIsRowSelected}
            />
          ))}
        </tbody>
        {isRowSelected && (
          <Object toggleObject={setIsRowSelected} id={isRowSelected} />
        )}
      </table>
    </div>
  );
};
