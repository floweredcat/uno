import { useSelector } from "react-redux";
import { UserData } from "../../Components/UserData/UserData";
import styles from "./styles.module.css";
import classNames from "classnames";
import { selectUserDataById } from "../../store/Users/selectors";
import { useUserData } from "./hooks/useUserData";

export const UserDataContainer = ({
  onclick = () => {},
  onDoubleClick = () => {},
  id,
  selectedRow,
}) => {
  const user = useSelector((state) => selectUserDataById(state, { id }));
  const data = Object.values(useUserData(user));
  const onClickHandler = (e) => {
    if (e.detail === 1) onclick(id);
    if (e.detail === 2) onDoubleClick();
  };

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
