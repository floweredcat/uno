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
    const target = e.target.value;

    if (cityFranIds.includes(target)) {
      const newValue = city.concat(target);
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
        className={styles.form_input}>
        {city.map((id) => (
          <SelectedCity
            id={id}
            key={nanoid()}
            onclick={deleteCity}
          />
        ))}
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
      )}{" "}
      <label
        htmlFor={label}
        className={styles.form_label__select}>
        {label}
      </label>
    </div>
  );
};
