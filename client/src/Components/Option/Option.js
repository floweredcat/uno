import { useSelector } from "react-redux";
import { selectFranshiseById } from "../../store/Franshises/selectors";
import styles from "./styles.module.css";

export const Option = ({ idFran }) => {
  const fransise = useSelector((state) =>
    selectFranshiseById(state, { id: idFran })
  );
  return (
    <option
      className={styles.option}
      value={fransise.ID}
    >
      {fransise.COMPANY}
    </option>
  );
};
