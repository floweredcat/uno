import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./styles.module.css";
import { Option } from "../../UI/Option/Option";
import { SelectedCity } from "../SelectedCities/SelectedCities";

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
    if (cityFranIds.includes(e)) {
      const newValue = city.concat(e);
      setForm(newValue);
    }
  };

  function deleteCity(item) {
    const newCityValue = city.filter((el) => el !== item);
    setForm(newCityValue);
  }

  return (
    <div className={styles.input_container}>
      <div
        onClick={() => toggleIsOpen()}
        onChange={handleChange}
        className={styles.form_input}
      >
        {city.map((id) => (
          <SelectedCity id={id} key={nanoid()} onclick={deleteCity} />
        ))}
      </div>
      {isOpen && (
        <ul id={label} className={styles.optionContainer}>
          {availableCities?.map((el) => {
            return (
              <li
                key={nanoid()}
                onClick={() => handleChange(el)}
                className={styles.option}
              >
                {el}
              </li>
            );
          })}
        </ul>
      )}{" "}
      <label htmlFor={label} className={styles.form_label__select}>
        {label}
      </label>
    </div>
  );
};
