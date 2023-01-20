import { useSelector } from "react-redux";
import { selectFranshiseById } from "../../store/Franshises/selectors";
import styles from "./styles.module.css";

export const Option = ({ idFran, form }) => {
  const fransise = useSelector((state) =>
    selectFranshiseById(state, { id: idFran })
  );
  return (
    <option
      className={styles.option}
      value={fransise.ID}
      selected={form.idFran === idFran}
    >
      {fransise.COMPANY}
    </option>
  );
};
