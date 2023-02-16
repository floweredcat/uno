import classNames from "classnames";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import { SearchBar } from "../../UI/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { selectObjectFilters } from "../../store/ObjectFilter/selectors";
import { onjectFilterSliceActions } from "../../store/ObjectFilter";

export const TableHeaderFiltered = ({ headers }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => selectObjectFilters(state));

  const handleSearch = (e, name) =>
    dispatch(onjectFilterSliceActions.setFilter([e, name]));
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
                <SearchBar
                  placeholder={el}
                  handleSearch={handleSearch}
                  filter={filters.NAME}
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
                <SearchBar
                  placeholder={el}
                  handleSearch={handleSearch}
                  filter={filters.CITY}
                  name={"CITY"}
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
