import { useSelector } from "react-redux";
import { UserData } from "../../Components/UserData/UserData";
import styles from "./styles.module.css";
import classNames from "classnames";
import { selectUserDataById } from "../../store/Users/selectors";
import { separateAmount } from "../../helpers/separateAmount.ts";

export const UserDataContainer = ({ onclick=()=>{}, onDoubleClick=()=>{}, id, selectedRow }) => {
  const user = useSelector((state) => selectUserDataById(state, { id }));
  const data = [
    user.ID,
    user.NAME,
    user.EMAIL,
    user.PHONE,
    user.ROLENAME,
    user.FRANCH ? user.FRANCH : " - ",
    user.BALANCE
      ? separateAmount(user.BALANCE)
      : 0,
  ];

  const onClickHandler = e => {
      if (e.detail === 1) onclick(id);
      if (e.detail === 2) onDoubleClick();
    }
  

  return (
    <tr
      className={classNames(styles.table_row, {
        [styles.table_row__selected]: selectedRow ? selectedRow === id : false,
      })}
      onClick={onClickHandler}
    >
      <UserData data={data} selectedRow={selectedRow} />
    </tr>
  );
};
