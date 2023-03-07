import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InputCountedContainer } from "../../Containers/InputCountedContainer/InputCountedContainer";
import { useCalculateAmount } from "../../hooks/useCalculateAmount";
import { selectObjectTarifById } from "../../store/Objects/selectors";
import { editLicence } from "../../store/Objects/Thunks/editLicence";
import { Button } from "../../UI/Button/Button";
import { CustomCalendar } from "../../Widgets/Calendar/Calendar";
import { FormElem } from "../FormElem/FormElem";
import { Toggle } from "../Toggle/Toggle";
import styles from "./styles.module.css";

export const EditPackageForm = ({ togglePopup, idlic }) => {
  const { id } = useParams();
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  };
  const minDate = new Date(
    useSelector((state) => selectObjectTarifById(state, { id })[0]?.DTEND)
  );
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
  const handleSubmit = (e) => {
    e.preventDefault();
    editLicence({
      params: {
        id: idlic,
        items: formatData(),
      },
    });

    togglePopup();
  };

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
    <FormElem onSubmit={handleSubmit} title={"Смена тарифа"}>
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
        {/* <div
          className={classNames(styles.exestintion_container, {
            [styles.exestintion_container__disable]: form.waiter.klv === 0,
          })}
        > */}
        <InputCountedContainer
          label={"Мобильный официант"}
          value={form.waiter.klv}
          name={"waiter"}
          setValue={handleChange}
        />
        {/* {form.waiter.klv > 0 && (
            <div className={styles.exestintion}>
              <h4 className={styles.subtitle}>Период оплаты</h4>
              <button
                type="button"
                onClick={() =>
                  setForm({ ...form, waiter: { ...form.waiter, period: 1 } })
                }
                className={classNames(styles.button_period, {
                  [styles.button_period__active]: form.waiter.period === 1,
                })}
              >
                Месяц
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm({ ...form, waiter: { ...form.waiter, period: 2 } })
                }
                className={classNames(styles.button_period, {
                  [styles.button_period__active]: form.waiter.period === 2,
                })}
              >
                Год
              </button>
            </div>
          )}
        </div> */}
        <InputCountedContainer
          label={"QR Меню"}
          value={form.qr.klv}
          name={"qr"}
          step={10}
          setValue={handleChange}
        />
        <CustomCalendar
          view={"year"}
          minDate={minDate}
          date={form.date}
          setDate={(e) => {
            setForm({ ...form, date: e });
          }}
          selectRange={true}
        />
        <div className={styles.submit__container}>
          <div className={styles.amount}>{amount}</div>
          <Button type="submit" label={"Применить изменения"} />
        </div>
      </div>
    </FormElem>
  );
};
