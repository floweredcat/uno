import classNames from "classnames";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { loadDeleteUser } from "../../store/Users/Thunks/deleteUser";

export const DeletePopup = ({ id, toggleDeletePopup, resetSelectedRow }) => {
  const dispatch = useDispatch();
  const deleteUser = () => {
    dispatch(loadDeleteUser({ id }));
    toggleDeletePopup();
    resetSelectedRow();
  };
  return (
    <div className={styles.popup_wrapper}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Удалить пользователя?</h2>
        <div className={styles.buttons_wrapper}>
          <button
            type="button"
            className={classNames(styles.button, styles.submit)}
            onClick={deleteUser}
          >
            Да
          </button>
          <button
            type="button"
            className={classNames(styles.button, styles.cancel)}
            onClick={() => {
              toggleDeletePopup();
              resetSelectedRow();
            }}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};
