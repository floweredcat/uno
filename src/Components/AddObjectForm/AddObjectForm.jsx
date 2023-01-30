import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFranshisesIds } from "../../store/Franshises/selectors";
import { addObject } from "../../store/Objects/Thunks/addObject";
import { FormElem } from "../FormElem/FormElem";
import { InputPhone } from "../InputPhone/InputPhone";
import { InputText } from "../InputText/InputText";
import { Option } from "../Option/Option";
import styles from "./styles.module.css";

export const AddObjectForm = ({ togglePopup }) => {
  const dispatch = useDispatch();
  const initialValidate = {
    validate: undefined,
    errorMessage: " ",
  };
  const franshisesIds = useSelector((state) => selectFranshisesIds(state));
  const [validate, setValidate] = useState(initialValidate);
  useEffect(() => {
    if (validate.errorMessage.length < 5 && form.phone.length > 7) {
      dispatch(addObject({ ...form, userId }));
      togglePopup();
    }
  }, [validate.errorMessage]);
  const [form, setForm] = useState({
    name: "",
    idFran: "",
    orgOwner: "",
    phone: "",
    worker: "",
  });

  const userId = localStorage.userId;
  const handleValidate = () => {
    if (
      !form.name.length ||
      !form.idFran ||
      !form.orgOwner.length ||
      !form.phone.length ||
      !form.worker.length
    ) {
      setValidate({ errorMessage: "error message", isValid: false });
    } else setValidate({ isValid: true, errorMessage: "   " });
    return validate.isValid;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleValidate();
  };

  return (
      <FormElem
        title={"Добавление объекта"}
        onSubmit={onSubmit}>
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
        <div className={styles.input_container}>
          <select
            size={1}
            defaultValue={1}
            id="idFran"
            className={styles.form_input}
            required
            placeholder=" "
            onChange={(event) =>
              setForm({ ...form, idFran: event.target.value })
            }>
            {franshisesIds.map((id) => (
              <Option
                key={id}
                idFran={id}
                form={form}
                setForm={setForm}
              />
            ))}
          </select>
          <label
            htmlFor="idFran"
            className={styles.form_label__select}>
            Франшиза
          </label>
        </div>
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
        <button
          type="submit"
          className={classNames(styles.button, styles.form_submit)}>
          Добавить объект
        </button>
      </FormElem>
  );
};
