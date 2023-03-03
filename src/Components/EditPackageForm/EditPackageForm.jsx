import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { InputCountedContainer } from "../../Containers/InputCountedContainer/InputCountedContainer";
import { selectObjectPricePackages } from "../../store/ObjectPrices/selectors";
import { editLicence } from "../../store/Objects/Thunks/editLicence";
import { CustomCalendar } from "../../Widgets/Calendar/Calendar";
import { FormElem } from "../FormElem/FormElem";
import { Toggle } from "../Toggle/Toggle";
import { calculateBill } from "./helpers/calculateBill";
import styles from "./styles.module.css";

export const EditPackageForm = ({ togglePopup, idlic }) => {
  const packagePrices = useSelector((state) =>
    selectObjectPricePackages(state)
  );
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  };
  const formatData = async function () {
    return Object.values(form)
      .slice(0, -1)
      .map((el) => ({
        iditem: el.ID,
        klv: el.klv,
        price: 10000,
        dtstart: formatDate(form.date[0]),
        dtend: formatDate(form.date[1]),
      }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formatData().then((res) => {
      editLicence({
        params: {
          id: idlic,
          items: res,
        },
      });
    });

    togglePopup();
  };

  const [form, setForm] = useState({
    station: { klv: 1, ID: 1 },
    storage: {
      klv: 0,
      ID: 2,
    },
    calculation: {
      klv: 0,
      ID: 3,
    },
    tarifiation: {
      klv: 0,
      ID: 4,
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
  return (
    <FormElem onSubmit={handleSubmit} title={"Смена тарифа"}>
      <div className={styles.options_container}>
        <InputCountedContainer
          label={"Станция"}
          required={true}
          value={form.station.klv}
          setValue={(val) => {
            setForm({ ...form, station: { klv: val } });
          }}
        />
        <InputCountedContainer label={"Склад"} value={form.storage.klv}>
          <Toggle
            checked={form.storage.klv}
            setValue={() => {
              setForm({ ...form, storage: { klv: !form.storage.klv } });
            }}
          />
        </InputCountedContainer>
        <InputCountedContainer
          label={"Калькуляция"}
          value={form.calculation.klv}
        >
          <Toggle
            checked={form.calculation.klv}
            setValue={() => {
              setForm({ ...form, calculation: { klv: !form.calculation.klv } });
            }}
          />
        </InputCountedContainer>
        <InputCountedContainer
          label={"Тарификация"}
          value={form.tarifiation.klv}
        >
          <Toggle
            checked={form.tarifiation.klv}
            setValue={() => {
              setForm({ ...form, tarifiation: { klv: !form.tarifiation.klv } });
            }}
          />
        </InputCountedContainer>
        <div
          className={classNames(styles.exestintion_container, {
            [styles.exestintion_container__disable]: form.waiter.klv === 0,
          })}
        >
          <InputCountedContainer
            label={"Мобильный официант"}
            value={form.waiter.klv}
            setValue={(val) => {
              setForm({ ...form, waiter: { ...form.waiter, klv: val } });
            }}
          />
          {form.waiter.klv > 0 && (
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
        </div>
        <InputCountedContainer
          label={"QR Меню"}
          value={form.qr.klv}
          step={10}
          setValue={(val) => {
            setForm({ ...form, qr: { klv: val } });
          }}
        />
        <CustomCalendar
          date={form.date}
          setDate={(e) => {
            setForm({ ...form, date: e });
          }}
          selectRange={true}
        />
        <button
          type="submit"
          className={classNames(styles.button, styles.form_submit)}
        >
          Применить изменения
        </button>
      </div>
    </FormElem>
  );
};
