import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFranshises } from "../../store/Franshises/selectors";
import { addObject } from "../../store/Objects/Thunks/addObject";
import { FormElem } from "../FormElem/FormElem";
import styles from "./styles.module.css";
import { isEmpty, isMobilePhone } from "validator";
import { InputText } from "../../UI/InputText/InputText.tsx";
import { InputSelect } from "../../UI/InputSelect/InputSelect";
import { InputPhone } from "../../UI/InputPhone/InputPhone";
import { useSingleEffect } from "../../hooks/UseSingleEffect";
import { getFransheses } from "../../store/Franshises/Thunks/getFransheses";
import { InputDate } from "../../UI/InputDate/InputDate";

export const AddObjectForm = ({ togglePopup }) => {
  const userId = localStorage.userId;
  const dispatch = useDispatch();
  const initialValidate = {
    validate: undefined,
    errorMessage: " ",
  };
  const franshises = useSelector((state) => selectFranshises(state));
  const [validate, setValidate] = useState(initialValidate);
  useSingleEffect(() => {
    dispatch(getFransheses({ userId }));
  }, [userId]);
  useEffect(() => {
    if (validate.errorMessage.length < 5 && form.phone.length > 7) {
      dispatch(addObject({ ...form, dt: formatDate(form.dt), userId }));
      togglePopup();
    }
  }, [validate.errorMessage]);

  const franshisesMap = Object.values(franshises).map((el) => {
    return {
      value: el.ID.toString(),
      label: el.CITY,
    };
  });

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  };

  const [form, setForm] = useState({
    name: "",
    idFran: franshisesMap[0]?.value || " ",
    orgOwner: "",
    phone: "",
    worker: "",
    dt: new Date(),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleValidate = () => {
    if (Object.values(form).some((el) => isEmpty(el.toString()))) {
      setValidate({
        errorMessage: "Необходимо заполнить все поля",
        isValid: false,
      });
    } else if (!isMobilePhone(form.phone) || form.phone.length < 10) {
      setValidate({
        errorMessage: "Неверный формат номера телефона",
        isValid: false,
      });
    } else setValidate({ isValid: true, errorMessage: "   " });
    return validate.isValid;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleValidate();
  };
  return (
    <FormElem title={"Добавление объекта"} onSubmit={onSubmit}>
      <button
        type="button"
        className={classNames(styles.button, styles.popup_closeButton)}
        onClick={() => togglePopup()}
      />
      <InputText
        name={"name"}
        value={form.name}
        label={"Наименование"}
        setValue={handleChange}
      />
      <InputSelect
        name={"idFran"}
        mapValues={franshisesMap}
        setForm={handleChange}
        label={"Франшиза"}
        value={form.idFran}
      />
      <InputText
        name={"orgOwner"}
        value={form.orgOwner}
        label={"Имя владельца"}
        setValue={handleChange}
      />
      <InputPhone
        name={"phone"}
        label={"Телефон"}
        value={form.phone}
        setValue={handleChange}
      />
      <InputText
        name={"worker"}
        label={"Специалист"}
        value={form.worker}
        setValue={handleChange}
      />
      <InputDate
        date={form.dt}
        setDate={(e) => setForm({ ...form, dt: e })}
        label={"Дата создания"}
      />
      <span className={styles.errorMessage}>{validate.errorMessage}</span>
      <button
        type="submit"
        className={classNames(styles.button, styles.form_submit)}
      >
        Добавить объект
      </button>
    </FormElem>
  );
};
