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
      dispatch(addObject({ ...form, userId }));
      togglePopup();
    }
  }, [validate.errorMessage]);

  const franshisesMap = Object.values(franshises).map((el) => {
    return {
      value: el.ID.toString(),
      label: el.CITY,
    };
  });
  const [form, setForm] = useState({
    name: "",
    idFran: franshisesMap[0]?.value || " ",
    orgOwner: "",
    phone: "",
    worker: "",
  });
  const handleValidate = () => {
    if (Object.values(form).some((el) => isEmpty(el))) {
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
        value={form.name}
        label={"Наименование"}
        setValue={(e) => setForm({ ...form, name: e })}
      />
      <InputSelect
        mapValues={franshisesMap}
        setForm={(e) => setForm({ ...form, idFran: e })}
        label={"Франшиза"}
        value={form.idFran}
      />
      <InputText
        value={form.orgOwner}
        label={"Имя владельца"}
        setValue={(e) => setForm({ ...form, orgOwner: e })}
      />
      <InputPhone
        label={"Телефон"}
        value={form.phone}
        setValue={(e) => setForm({ ...form, phone: e })}
      />
      <InputText
        label={"Специалист"}
        value={form.worker}
        setValue={(e) => setForm({ ...form, worker: e })}
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
