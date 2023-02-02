import { useSelector } from "react-redux";
import { UserData } from "../../Components/UserData/UserData";
import styles from "./styles.module.css";
import classNames from "classnames";
import { selectUserDataById } from "../../store/Users/selectors";
import { separateAmount } from "../../helpers/separateAmount";

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
      ? separateAmount(user.BALANCE)
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
