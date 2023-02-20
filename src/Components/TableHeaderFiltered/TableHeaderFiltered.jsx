import classNames from "classnames";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { selectObjectData } from "../../store/Objects/selectors";
import { SearchBarContainer } from "../../Containers/SearchBarContainer/SearchBarContainer";
import { SelectHeaderContainer } from "../../Containers/SelectHeaderContainer/SelectHeaderContainer";

export const TableHeaderFiltered = ({ headers }) => {
  const objects = useSelector((state) => selectObjectData(state));
  const availableCityes = Array.from(
    new Set(Object.values(objects).map((el) => el.CITY))
  );

  return (
    <tr className={styles.table_row}>
      {headers.map((el, idx) => {
        switch (idx) {
          case 1:
            return (
              <th
                key={nanoid()}
                className={classNames(
                  styles.table_cell,
                  styles.table_cell__header
                )}>
                <SearchBarContainer
                  placeholder={el}
                  name={"NAME"}
                  id={nanoid()}
                />
              </th>
            );
          case 2: 
            return (
              <th
                key={nanoid()}
                className={classNames(
                  styles.table_cell,
                  styles.table_cell__header
                )}>
                <SelectHeaderContainer
                  availableCityes={availableCityes}
                  name={"CITY"}
                  label={"Город"}
                />
              </th>
            );
          case 3:
            return (
              <th
                key={nanoid()}
                className={classNames(
                  styles.table_cell,
                  styles.table_cell__header,
                  styles.table_cell__number
                )}>
                <SearchBarContainer
                  placeholder={el}
                  name={"PHONE"}
                  id={nanoid()}
                />
              </th>
            );
          default:
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
        }
        //   idx !== 1 || !handleSearch ? <th
        //     key={nanoid()}
        //     className={classNames(styles.table_cell, styles.table_cell__header)}>
        //     {el}
        //   </th> :
        //   <th
        //   key={nanoid()}
        //   className={classNames(styles.table_cell, styles.table_cell__header)}>
        //     <SearchBar handleSearch={handleSearch} filter={filter} placeholder={el}/>
        // </th>
      })}
    </tr>
  );
};
