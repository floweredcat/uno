import classNames from "classnames";
import styles from "./styles.module.css";
import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";
import { useSelector } from "react-redux";
import { selectObjectTarifById } from "../../store/Objects/selectors";
import { nanoid } from "nanoid";

export const TariffShowingContainer = ({ id }) => {
  const tarif = useSelector((state) => selectObjectTarifById(state, { id }));
  return (
    <div className={classNames(styles.object_info, styles.objects_element)}>
      {tarif.map((el, idx) => (
        <InputCountedOption
          label={el.NAME}
          value={el.KLV}
          required={idx == 0}
          key={nanoid()}
        />
      ))}
    </div>
  );
};
