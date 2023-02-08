import classNames from "classnames";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import {SearchBar} from "../../UI/SearchBar/SearchBar"

export const TableHeader = ({ headers, handleSearch, filter }) => {
  return <tr className={styles.table_row}>
    {headers.map((el, idx) => (
      idx !== 1 || !handleSearch ? <th
        key={nanoid()}
        className={classNames(styles.table_cell, styles.table_cell__header)}>
        {el}
      </th> :
      <th
      key={nanoid()}
      className={classNames(styles.table_cell, styles.table_cell__header)}>
        <SearchBar handleSearch={handleSearch} filter={filter} placeholder={el}/>
    </th>
    ))}
  </tr>;
};
