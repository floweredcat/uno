import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PERIOD_VALUES } from "../../assets/constants/Fixtires";
import { InputCountedContainer } from "../../Containers/InputCountedContainer/InputCountedContainer";
import { addDays } from "../../helpers/addDays";
import { addMonths } from "../../helpers/addMonth";
import { formatDate } from "../../helpers/formatDate";
import { useCalculateAmount } from "../../hooks/useCalculateAmount";
import { selectObjectPricePackages } from "../../store/ObjectPrices/selectors";
import { selectObjectTarifById } from "../../store/Objects/selectors";
import { editLicence } from "../../store/Objects/Thunks/editLicence";
import { Button } from "../../UI/Button/Button";
import { InputSelect } from "../../UI/InputSelect/InputSelect";
import { FormElem } from "../FormElem/FormElem";
import { Toggle } from "../Toggle/Toggle";
import { useEditFormState } from "./hooks/useEditFormState";
import styles from "./styles.module.css";

export const EditPackageForm = ({ togglePopup, idlic }) => {
  const { id } = useParams();

  const objectPrices = useSelector((state) => selectObjectPricePackages(state));
  const dtend = new Date(
    useSelector((state) => selectObjectTarifById(state, { id })[0]?.DTEND)
  );
  const minDate = addDays(dtend, 1);
  const formatData = () => {
    const dtend = formatDate(addMonths(minDate, form.period));

    return Object.values(form)
      .filter((el) => el.ID)
      .map((el) => ({
        iditem: el.ID,
        klv: +el.klv,
        price: objectPrices[el.ID].PRICE,
        dtstart: formatDate(form.date),
        dtend,
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

  const [form, setForm] = useEditFormState({ minDate });
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
        <div>{"Дата начала: " + form.date.toLocaleString().slice(0, 10)}</div>
        <InputSelect
          value={form.period}
          mapValues={PERIOD_VALUES}
          setForm={(e) => {
            setForm({ ...form, period: e.target.value });
          }}
          name={"period"}
        />
        <div className={styles.submit__container}>
          <div className={styles.amount}>{amount}</div>
          <Button type="submit" label={"Применить изменения"} />
        </div>
      </div>
    </FormElem>
  );
};
