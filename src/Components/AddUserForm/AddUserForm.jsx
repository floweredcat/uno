import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/Users/Thunks/addUser";
import { FormElem } from "../FormElem/FormElem";
import { InputText } from "../../UI/InputText/InputText.tsx";
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
import { nanoid } from "nanoid";

export const AddUserForm = ({ togglePopup }) => {
  const cityFranIds = useSelector((state) => selectCityFranshisesIds(state));
  const cityFran = useSelector((state) => selectCityFranshises(state));
  const { userId, userIdAccess } = localStorage;
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    city: [],
    pass: "",
    role: ROLES[0].id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const initialValidate = {
    validate: undefined,
    errorMessage: " ",
  };

  const availableCities = cityFranIds.filter((el) => !form.city.includes(el));

  const [validate, setValidate] = useState(initialValidate);
  useEffect(() => {
    dispatch(getCityFransheses({ userId }));
  }, [userId]);
  useEffect(() => {
    if (validate.errorMessage.length < 5 && form.phone.length > 8) {
      const cities = Object.values(cityFran)
        .filter((el) => form.city.includes(el.NAME))
        .map((el) => el.ID);
      dispatch(addUser({ ...form, userId, cities }));
      togglePopup();
    }
  }, [validate.errorMessage]);

  return (
    <FormElem
      title={"Добавление пользователя"}
      onSubmit={(e) => onSubmit(e, setValidate, form)}
    >
      <InputText
        value={form.name}
        name={"name"}
        label={"Наименование"}
        setValue={handleChange}
      />
      <InputText
        value={form.email}
        name={"email"}
        label={"email"}
        setValue={handleChange}
      />
      <InputPhone
        name={"phone"}
        value={form.phone}
        label={"Телефон"}
        setValue={handleChange}
      />
      <div className={styles.input_wrapper}>
        <InputDataSelect
          city={form.city}
          cityFranIds={cityFranIds}
          setForm={(e) => setForm({ ...form, city: e })}
          label={"Город"}
          availableCities={availableCities}
        />
      </div>
      <InputPass
        value={form.pass}
        name={"pass"}
        label={"Пароль"}
        setValue={handleChange}
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
                  checked={form.role === id}
                  setValue={() => setForm({ ...form, role: id })}
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
        className={classNames(styles.button, styles.form_submit)}
      >
        Добавить ползователя
      </button>
    </FormElem>
  );
};
