import { useState } from "react";
import { useParams } from "react-router-dom";
import { InputCountedContainer } from "../../Containers/InputCountedContainer/InputCountedContainer";
import { useCalculateAmount } from "../../hooks/useCalculateAmount";
import { addLicence } from "../../store/Objects/Thunks/addLicence";
import { Button } from "../../UI/Button/Button";
import { InputSelect } from "../../UI/InputSelect/InputSelect";
import { FormElem } from "../FormElem/FormElem";
import { Toggle } from "../Toggle/Toggle";
import styles from "./styles.module.css";

export const AddPackageForm = ({ togglePopup }) => {
  const { id } = useParams();
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  };
  const formatData = () => {
    return Object.values(form)
      .slice(0, -1)
      .map((el) => ({
        iditem: el.ID,
        klv: +el.klv,
        price: 10000,
        dtstart: formatDate(form.date[0]),
        dtend: formatDate(form.date[1]),
      }));
  };
  const dtend = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    addLicence({
      params: {
        idorg: id,
        iditem: 1,
        price: 72000,
        amount,
        klv: 1,
        dtstart: formatDate(form.date[0]),
        dtend: formatDate(form.date[1]),
        items: formatData(),
      },
    });

    togglePopup();
  };
  const periodValues = [
    { label: "1 месяц", value: 1 },
    { label: "3 месяца", value: 3 },
    { label: "6 месяцев", value: 6 },
    { label: "1 год", value: 12 },
    { label: "Навсегда", value: 36 },
  ];

  const [form, setForm] = useState({
    station: { klv: 1, ID: 1 },
    storage: {
      ID: 2,
      klv: 0,
    },
    calculation: {
      ID: 3,
      klv: 0,
    },
    tarifiation: {
      ID: 4,
      klv: 0,
    },
    waiter: {
      klv: 0,
      period: 1,
      ID: 5,
    },
    qr: {
      klv: 0,
      ID: 6,
    },
    date: "",
    period: periodValues[0].label,
  });

  const amount = Math.round(useCalculateAmount(form));
  const handleChange = ({ newValue, name }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        klv: newValue,
      },
    }));
  };
  return (
    <FormElem onSubmit={handleSubmit}>
      <div className={styles.options_container}>
        <InputCountedContainer
          label={"Станция"}
          required={true}
          value={form.station.klv}
          name={"station"}
          setValue={handleChange}
        />
        <InputCountedContainer label={"Склад"} value={form.storage.klv}>
          <Toggle
            checked={form.storage.klv}
            setValue={() =>
              handleChange({ newValue: !form.storage.klv, name: "storage" })
            }
          />
        </InputCountedContainer>
        <InputCountedContainer
          label={"Калькуляция"}
          value={form.calculation.klv}
        >
          <Toggle
            checked={form.calculation.klv}
            setValue={() =>
              handleChange({
                newValue: !form.calculation.klv,
                name: "calculation",
              })
            }
          />
        </InputCountedContainer>
        <InputCountedContainer
          label={"Тарификация"}
          value={form.tarifiation.klv}
          name={"tarifiation"}
        >
          <Toggle
            checked={form.tarifiation.klv}
            setValue={() =>
              handleChange({
                newValue: !form.tarifiation.klv,
                name: "tarifiation",
              })
            }
          />
        </InputCountedContainer>
        <InputCountedContainer
          label={"Мобильный официант"}
          value={form.waiter.klv}
          name={"waiter"}
          setValue={handleChange}
        />
        <InputCountedContainer
          label={"QR Меню"}
          value={form.qr.klv}
          name={"qr"}
          step={10}
          setValue={handleChange}
        />
        <div>{"Дата начала: " + new Date().toLocaleString().slice(0, 10)}</div>
        <InputSelect
          value={form.period}
          mapValues={periodValues}
          setForm={(e) => {
            setForm({ ...form, period: e.target.value });
          }}
          name={"period"}
        />
        <div className={styles.submit__container}>
          <div className={styles.amount}>{amount}</div>
          <Button type="submit" label={"Активировать тариф"} />
        </div>
      </div>
    </FormElem>
  );
};
