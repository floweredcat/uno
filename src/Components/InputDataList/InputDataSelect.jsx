import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./styles.module.css";
import { Option } from "../../UI/Option/Option";

export const InputDataSelect = ({
  setForm,
  label,
  availableCities,
  cityFranIds,
  city,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }
  const handleChange = (e) => {
    const target = e.target.value;

    if (cityFranIds.includes(target)) {
      const newValue = city.concat(target);
      setForm(newValue);
    }
  };

  return (
    <div className={styles.input_container}>
      <div
        onClick={() => toggleIsOpen()}
        onChange={handleChange}
        className={styles.form_input}>
        {label}
      </div>
      {isOpen && (
        <div
          id={label}
          className={styles.optionContainer}>
          {availableCities?.map((el) => {
            return (
              <Option
                value={el}
                label={el}
                key={nanoid()}
                onClick={handleChange}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
