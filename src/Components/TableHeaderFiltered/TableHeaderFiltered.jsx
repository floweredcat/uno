import classNames from "classnames";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { selectObjectData } from "../../store/Objects/selectors";
import { SearchBarContainer } from "../../Containers/SearchBarContainer/SearchBarContainer";
import { SelectHeaderContainer } from "../../Containers/SelectHeaderContainer/SelectHeaderContainer";
import { FilterDateSelectContainer } from "../../Containers/FilterDateSelectContainer/FilterDateSelectContainer";

export const TableHeaderFiltered = ({ headers }) => {
  const objects = useSelector((state) => selectObjectData(state));
  const availableCityes = [
    ...new Set(Object.values(objects).map((el) => el.CITY)),
  ];
  const availableFrans = [
    ...new Set(Object.values(objects).map((el) => el.FRAN_NAME)),
  ];

  const availableIds = [0, 1, 2];

  return (
    <tr className={styles.table_row}>
      {headers.map((el, idx) => {
        switch (idx) {
          case 0:
            return (
              <th
                key={nanoid()}
                className={classNames(
                  styles.table_cell,
                  styles.table_cell__header
                )}
              >
                <SelectHeaderContainer
                  availableValues={availableIds}
                  name={"IDSRV"}
                  label={"ID"}
                  colorable={true}
                />
              </th>
            );
          case 1:
            return (
              <th
                key={nanoid()}
                className={classNames(
                  styles.table_cell,
                  styles.table_cell__header
                )}
              >
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
                )}
              >
                <SelectHeaderContainer
                  availableValues={availableCityes}
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
                )}
              >
                <SearchBarContainer
                  placeholder={el}
                  name={"PHONE"}
                  id={nanoid()}
                />
              </th>
            );
          case 4:
            return (
              <th
                key={nanoid()}
                className={classNames(
                  styles.table_cell,
                  styles.table_cell__header,
                  styles.table_cell__number
                )}
              >
                <FilterDateSelectContainer />
              </th>
            );
          case 5:
            return (
              <th
                key={nanoid()}
                className={classNames(
                  styles.table_cell,
                  styles.table_cell__header
                )}
              >
                <SelectHeaderContainer
                  availableValues={availableFrans}
                  name={"FRAN_NAME"}
                  label={"Франшиза"}
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
                )}
              >
                {el}
              </th>
            );
        }
      })}
    </tr>
  );
};
