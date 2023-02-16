import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { selectCityFranshisesById } from "../../store/CityFranshises/selectors";

export function SelectedCity({ id, onclick }) {
  const selectedCity = useSelector((state) =>
    selectCityFranshisesById(state, { id })
  );
  const {NAME} = selectedCity

  return (
    <div className={styles.container}>
      {NAME.substr(0, NAME.indexOf("("))}
      <button
        type="button"
        className={styles.delete}
        onClick={() => onclick(NAME)}
      />
    </div>
  );
}
