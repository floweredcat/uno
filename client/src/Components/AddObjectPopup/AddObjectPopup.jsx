import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFranshisesIds } from "../../store/Franshises/selectors";
import { addObject } from "../../store/Objects/Thunks/addObject";
import { Option } from "../Option/Option";
import styles from "./styles.module.css";

export const AddObjectPopup = ({ togglePopup }) => {
  const dispatch = useDispatch();  
  const initialValidate = {
    validate: undefined,
    errorMessage: ' ',
  }
  const franshisesIds = useSelector(state => selectFranshisesIds(state))
  const [validate, setValidate] = useState(initialValidate)
  useEffect(() => {
    if (validate.errorMessage.length < 5 && form.phone.length > 7) {
      dispatch(addObject({...form, userId}))
      togglePopup()
    }
  }, [validate.errorMessage])
  const [form, setForm] = useState({
    name: '',
    idFran: '',
    orgOwner: '',
    phone: '',
    worker: '',
  })
  
  const userId = localStorage.userId;
  const handleValidate = () => {
    if (!form.name.length || !form.idFran || !form.orgOwner.length || !form.phone.length || !form.worker.length) {
      setValidate({errorMessage: 'error message', isValid: false})
    }
    else setValidate({isValid: true, errorMessage: '   '})
    return validate.isValid
  }
 

  const onSubmit = (event) => {
    event.preventDefault();
    handleValidate();
  };

  return (
    <div className={styles.popup_wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Добавление объекта</h2>
        <button
          type="button"
          className={classNames(styles.button, styles.popup_closeButton)}
          onClick={() => togglePopup()}
        />
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="name"
            type="text"
            className={styles.form_input}
            required
            placeholder=" "
            value={form.name}
            onChange={(event) => setForm({...form, name: event.target.value})}
          />
          <label htmlFor="name" className={styles.form_label}>
            Наименование
          </label>
        </div>
        <div className={styles.input_container}>
          <select
          size={1}
          defaultValue={1}
            id="idFran"
            className={styles.form_input}
            required
            placeholder=" "
            onChange={(event) => setForm({...form, idFran: event.target.value})}
          >
            {franshisesIds.map(id => <Option key={id} idFran={id} form={form} setForm={setForm}/>)}
          </select>
          <label htmlFor="idFran" className={styles.form_label__select}>
            Франшиза
          </label>
        </div>
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="orgOwner"
            type="text"
            className={styles.form_input}
            required
            placeholder=" "
            value={form.orgOwner}
            onChange={(event) => setForm({...form, orgOwner: event.target.value})}
          />
          <label htmlFor="orgOwner" className={styles.form_label}>
            Имя владельца
          </label>
        </div>
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="phone"
            type="text"
            className={styles.form_input}
            required
            placeholder=" "
            value={form.phone}
            onChange={(event) => setForm({...form, phone: event.target.value})}
          />
          <label htmlFor="phone" className={styles.form_label}>
            Телефон
          </label>
        </div>
        <div className={styles.input_container}>
          <input
            autoComplete="new-password"
            id="worker"
            type="text"
            className={styles.form_input}
            required
            placeholder=" "
            value={form.worker}
            onChange={(event) => setForm({...form, worker: event.target.value})}
          />
          <label htmlFor="worker" className={styles.form_label}>
            Специалист
          </label>
        </div>
        <button
          type="submit"
          className={classNames(styles.button, styles.form_submit)}
        >
          Добавить объект
        </button>
      </form>
    </div>
  );
};
