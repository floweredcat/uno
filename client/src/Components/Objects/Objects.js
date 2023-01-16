import classNames from "classnames";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectObjectData,
  selectObjectsIds,
  selectObjectsIsLoading,
} from "../../store/Objects/selectors";
import { getObjects } from "../../store/Objects/Thunks/getObjects";
import styles from "./styles.module.css";
import { Object } from "../Object/Object";

export const Objects = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectObjectsIsLoading(state));
  const objectsIds = useSelector((state) => selectObjectsIds(state));
  const objectsData = useSelector((state) => selectObjectData(state));
  const [isRowSelected, setIsRowSelected] = useState(false)
  const [object, setObject] = useState(false)
  useEffect(() => {
    dispatch(getObjects);
  }, []);

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
                    )}>
                    {el}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.table_content}>
            {objectsIds?.map((el, row) => {
              const object = objectsData[el];
              const { IDSRV, AMOUNT, CITY, NAME, PHONE, DT } = object;

              return (
                <tr
                  key={el}
                  className={classNames(styles.table_row)}
                  onClick={() => setIsRowSelected(IDSRV)}>
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
                            className={classNames(
                              styles.table_cell,
                              styles.table_cell__num
                            )}>
                            {IDSRV}
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
                            {CITY}
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
                            className={classNames(
                              styles.table_cell,
                              styles.table_cell__num
                            )}>
                            {DT.substr(0, DT.indexOf("T"))}
                          </td>
                        );
                      case 5:
                        return (
                          <td
                            key={nanoid()}
                            className={styles.table_cell}>
                            {"UM System Group"}
                          </td>
                        );
                      case 6:
                        return (
                          <td
                            key={nanoid()}
                            className={classNames(
                              styles.table_cell,
                              styles.table_cell__num
                            )}>
                            <div className={styles.table_cell__balance}>
                              {AMOUNT}
                            </div>
                          </td>
                        );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
          {isRowSelected && <Object toggleObject={setIsRowSelected} id={isRowSelected}/>}
        </table>
    </div>
  );
};
