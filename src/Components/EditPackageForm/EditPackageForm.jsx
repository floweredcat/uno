import classNames from "classnames";
import { InputCountedContainer } from "../../Containers/InputCountedContainer/InputCountedContainer";
import { FormElem } from "../FormElem/FormElem";
import { Toggle } from "../Toggle/Toggle";
import styles from "./styles.module.css";

export const EditPackageForm = ({ togglePopup, form, setForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <FormElem onSubmit={handleSubmit} title={"Смена тарифа"}>
      <div className={styles.options_container}>
        <InputCountedContainer
          label={"Станция"}
          required={true}
          value={form.stantion}
          setValue={(val) => {
            setForm({ ...form, stantion: val });
          }}
        />
        <InputCountedContainer label={"Склад"} value={form.storage}>
          <Toggle
            checked={form.storage}
            setValue={() => {
              setForm({ ...form, storage: !form.storage });
            }}
          />
        </InputCountedContainer>
        <InputCountedContainer label={"Калькуляция"} value={form.calculation}>
          <Toggle
            checked={form.calculation}
            setValue={() => {
              setForm({ ...form, calculation: !form.calculation });
            }}
          />
        </InputCountedContainer>
        <InputCountedContainer label={"Тарификация"} value={form.tarifiation}>
          <Toggle
            checked={form.tarifiation}
            setValue={() => {
              setForm({ ...form, tarifiation: !form.tarifiation });
            }}
          />
        </InputCountedContainer>
        <div
          className={classNames(styles.exestintion_container, {
            [styles.exestintion_container__disable]: form.waiter === 0,
          })}
        >
          <InputCountedContainer
            label={"Мобильный официант"}
            value={form.waiter}
            setValue={(val) => {
              setForm({ ...form, waiter: val });
            }}
          />
          {form.waiter > 0 && (
            <div className={styles.exestintion}>
              <h4 className={styles.subtitle}>Период оплаты</h4>
              <button
                className={classNames(styles.button_period, {
                  [styles.button_period__active]: true,
                })}
              >
                Месяц
              </button>
              <button
                className={classNames(styles.button_period, {
                  [styles.button_period__active]: false,
                })}
              >
                Год
              </button>
            </div>
          )}
        </div>
        <InputCountedContainer
          label={"QR Меню"}
          value={form.qr}
          step={10}
          setValue={(val) => {
            setForm({ ...form, qr: val });
          }}
        />
      </div>
    </FormElem>
  );
};
