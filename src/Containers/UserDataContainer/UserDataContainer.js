import { useSelector } from "react-redux";
import { UserData } from "../../Components/UserData/UserData";
import styles from "./styles.module.css";
import classNames from "classnames";
import { selectUserDataById } from "../../store/Users/selectors";

export const UserDataContainer = ({ onclick, id, filter, selectedRow }) => {
  const user = useSelector((state) => selectUserDataById(state, { id }));
  const data = [
    user.ID,
    user.NAME,
    user.EMAIL,
    user.PHONE,
    user.ROLENAME,
    "FRAN_NAME",
    user.BALANCE
      ? user.BALANCE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : 0,
  ];

  

  return (
    <tr
      className={classNames(styles.table_row, {
        [styles.table_row__selected]: selectedRow ? selectedRow === id : false,
      })}
      onClick={() => onclick(id)}
    >
      <UserData data={data} selectedRow={selectedRow} />
    </tr>
  );
};
