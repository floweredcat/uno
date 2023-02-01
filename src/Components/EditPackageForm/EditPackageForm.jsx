import classNames from "classnames";
import { useState } from "react";
import { InputCountedContainer } from "../../Containers/InputCountedContainer/InputCountedContainer";
import { FormElem } from "../FormElem/FormElem";
import styles from "./styles.module.css";
import validator from "validator";

export const EditPackageForm = ({ togglePopup }) => {
  const [form, setForm] = useState({
    stantion: 1,
    storage: 0,
    calculation: 0,
    tarifiation: 0,
    waiter: 0,
    qr: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <FormElem
      onSubmit={handleSubmit}
      title={"Смена тарифа"}>
      <div className={styles.options_container}>
        <InputCountedContainer
          label={"Станция"}
          required={true}
          value={form.stantion}
          setValue={(val) => {
            setForm({ ...form, stantion: val });
          }}
        />
        <InputCountedContainer
          label={"Склад"}
          value={form.storage}
          setValue={(val) => {
            setForm({ ...form, storage: val });
          }}
        />
        <InputCountedContainer
          label={"Калькуляция"}
          value={form.calculation}
          setValue={(val) => {
            setForm({ ...form, calculation: val });
          }}
        />
        <InputCountedContainer
          label={"Тарификация"}
          value={form.tarifiation}
          setValue={(val) => {
            setForm({ ...form, tarifiation: val });
          }}
        />
        <div className={classNames(styles.exestintion_container, {
          [styles.exestintion_container__disable]: form.waiter === 0,
        })} >
        <InputCountedContainer
          label={"Мобильный официант"}
          value={form.waiter}
          setValue={(val) => {
            setForm({ ...form, waiter: val });
          }}
        />
        {form.waiter > 0 && <div className={styles.exestintion}>
        <h4 className={styles.subtitle}>Период оплаты</h4>
        <button className={classNames(styles.button_period, {
          [styles.button_period__active]: true,
        })}>Month</button>
        <button className={classNames(styles.button_period, {
          [styles.button_period__active]: false,
        })}>Year</button>
        </div>}
        </div>
        <InputCountedContainer
          label={"QR Меню"}
          value={form.qr}
          setValue={(val) => {
            setForm({ ...form, qr: val });
          }}
        />
      </div>
    </FormElem>
  );
};
