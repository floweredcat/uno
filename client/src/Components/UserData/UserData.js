import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import {selectObjectById} from '../../store/Objects/selectors'

export const UserData = ({ styles, onclick, objectId, filter }) => {
  const user = useSelector((state) => selectObjectById(state, { id: objectId }));

  const { IDSRV, AMOUNT, CITY, NAME, PHONE, DT, ENDDT, STARTDT } = user;

  const getDiffDates = () => {
    const diff =
      new Date(
        new Date(ENDDT.substr(0, ENDDT.indexOf("T")))
      ) -
      new Date(STARTDT.substr(0, STARTDT.indexOf("T")));
    const days = diff / 86400000;
    let months = Math.floor(days / 30);
    return months
  }
  const getStyleByLeftMonths = () => {
    if (getDiffDates() < 1) {
      return styles.cell_num_red
    }
    if (getDiffDates() === 1) {
      return styles.cell_num_yellow
    }
    if (getDiffDates() > 1) {
      return styles.cell_num_green
    }
  }

  return (NAME.toLowerCase().includes(filter.toLowerCase()) ?
    <tr className={styles.row} onDoubleClick={() => onclick(IDSRV)}>
      <td key={nanoid()} className={getStyleByLeftMonths()}>
        {IDSRV}
      </td>
      <td key={nanoid()} className={styles.cell}>
        {NAME}
      </td>
      <td key={nanoid()} className={styles.cell}>
        {CITY}
      </td>
      <td key={nanoid()} className={styles.cell_num}>
        {PHONE}
      </td>
      <td key={nanoid()} className={styles.cell_num}>
        {DT.substr(0, DT.indexOf("T"))}
      </td>
      <td key={nanoid()} className={styles.cell}>
        {"UM System Group"}
      </td>
      <td key={nanoid()} className={styles.cell_num}>
        <div className={styles.cell__balance}>{AMOUNT}</div>
      </td>
    </tr> :
    null
  );
};
