import classNames from "classnames";
import { useSelector } from "react-redux";
import { getDiffDates } from "../Components/UserData/helpers/getDiffDates";
import { UserData } from "../Components/UserData/UserData";
import { selectObjectById } from "../store/Objects/selectors";
import styles from "./styles.module.css";

export const ObjectDataContainer = ({ onclick, id, filter, selectedRow }) => {
  const object = useSelector((state) => selectObjectById(state, { id }));
  const data = [
    object.IDSRV,
    object.NAME,
    object.CITY,
    object.PHONE,
    object.DT.substr(0, object.DT.indexOf("T")),
    object.FRAN_NAME,
    object.AMOUNT,
  ];

  const diffDates =
    object && object.STARTDT && object.ENDDT
      ? getDiffDates({ start: object.STARTDT, end: object.ENDDT })
      : null;

  const getStyleByLeftMonths = () => {
    if (diffDates < 1) {
      return styles.red;
    }
    if (diffDates === 1) {
      return styles.yellow;
    }
    if (diffDates > 1) {
      return styles.green;
    }
  };
  
  if (!object.NAME.toLowerCase().includes(filter.name.toLowerCase())) {
    return null
  }

  return (
    <tr
      className={classNames(styles.table_row, getStyleByLeftMonths())}
      onDoubleClick={() => onclick(data[0])}
    >
      <UserData data={data} selectedRow={selectedRow} />
    </tr>
  );
};
