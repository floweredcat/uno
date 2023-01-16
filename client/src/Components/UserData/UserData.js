import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import {selectObjectById} from '../../store/Objects/selectors'

export const UserData = ({ styles, onclick, objectId, filter }) => {
  const user = useSelector((state) => selectObjectById(state, { id: objectId }));

  const { IDSRV, AMOUNT, CITY, NAME, PHONE, DT } = user;

  

  return (NAME.toLowerCase().includes(filter.toLowerCase()) ?
    <tr className={styles.row} onClick={() => onclick(IDSRV)}>
      <td key={nanoid()} className={styles.cell_num}>
        {IDSRV}
      </td>
      <td key={nanoid()} className={styles.cell}>
        {NAME}
      </td>
      <td key={nanoid()} className={styles.cell}>
        {CITY}
      </td>
      <td key={nanoid()} className={styles.cell}>
        {PHONE}
      </td>
      <td key={nanoid()} className={styles.cell}>
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
