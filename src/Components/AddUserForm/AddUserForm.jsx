import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/Users/Thunks/addUser";
import { FormElem } from "../FormElem/FormElem";
import { InputText } from "../../UI/InputText/InputText";
import { InputPhone } from "../../UI/InputPhone/InputPhone";
import { InputPass } from "../../UI/InputPass/InputPass";
import { InputRadio } from "../../UI/InputRadio/InputRadio";
import styles from "./styles.module.css";
import { ROLES } from "../../assets/constants/Fixtires";
import { getCityFransheses } from "../../store/CityFranshises/Thunks/getCityFransheses";
import {
  selectCityFranshises,
  selectCityFranshisesIds,
} from "../../store/CityFranshises/selectors";
import { InputDataSelect } from "../InputDataList/InputDataSelect";
import { onSubmit } from "./helpers/onSubmit";
import { SelectedCity } from "../SelectedCities/SelectedCities";
import { nanoid } from "nanoid";

export const AddUserForm = ({ togglePopup }) => {
  const cityFranIds = useSelector((state) => selectCityFranshisesIds(state));
  const cityFran = useSelector((state) => selectCityFranshises(state));
  const { userId, userIdAccess } = localStorage;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState([]);
  const [pass, setPass] = useState("");
  const [role, setRole] = useState(ROLES[0].id);
  const initialValidate = {
    validate: undefined,
    errorMessage: " ",
  };

  const availableCities = cityFranIds.filter(el => !city.includes(el))

  const [validate, setValidate] = useState(initialValidate);
  useEffect(() => {
    dispatch(getCityFransheses({ userId }));
  }, [userId]);
  useEffect(() => {
    if (validate.errorMessage.length < 5 && phone.length > 8) {
      const cities = Object.values(cityFran).filter(el => city.includes(el.NAME)).map(el => el.ID)
      dispatch(addUser({ userId, email, role, name, phone, pass, cities }));
      togglePopup();
      resetForm();
    }
  }, [validate.errorMessage]);

  const resetForm = () => {
    setCity("");
    setEmail("");
    setName("");
    setPass("");
    setPhone("");
    setRole(ROLES[0].id);
  };

  return (
    <FormElem
      title={"Добавление пользователя"}
      onSubmit={(e) =>
        onSubmit(e, setValidate, { phone, email, pass, name, city, role })
      }>
      <InputText
        value={name}
        label={"Наименование"}
        setValue={setName}
      />
      <InputText
        value={email}
        label={"email"}
        setValue={setEmail}
      />
      <InputPhone
        value={phone}
        label={"Телефон"}
        setValue={setPhone}
      />
      {city.map((id) => 
          <SelectedCity
            id={id}
            key={nanoid()}
          />
        )}
      <InputDataSelect
        city={city}
        cityFranIds={cityFranIds}
        setForm={setCity}
        label={"Город"}
        availableCities={availableCities}
      />
      <InputPass
        value={pass}
        label={"Пароль"}
        setValue={setPass}
      />
      {
        <>
          <span className={styles.radios_label}>Выберите роль:</span>
          <div className={styles.radios_container}>
            {ROLES.slice(userIdAccess == 1 ? 0 : userIdAccess).map((el) => {
              const { content, id } = el;
              return (
                <InputRadio
                  label={content}
                  value={id}
                  checked={role === id}
                  setValue={setRole}
                  key={nanoid()}
                />
              );
            })}
          </div>
        </>
      }
      <span className={styles.errorMessage}>{validate.errorMessage}</span>
      <button
        type="submit"
        className={classNames(styles.button, styles.form_submit)}>
        Добавить ползователя
      </button>
    </FormElem>
  );
};
