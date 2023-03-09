import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PERIOD_VALUES } from "../../assets/constants/Fixtires";
import { InputCountedContainer } from "../../Containers/InputCountedContainer/InputCountedContainer";
import { addMonths } from "../../helpers/addMonth";
import { formatDate } from "../../helpers/formatDate";
import { useCalculateAmount } from "../../hooks/useCalculateAmount";
import { selectObjectPricePackages } from "../../store/ObjectPrices/selectors";
import { selectObjectById } from "../../store/Objects/selectors";
import { addLicence } from "../../store/Objects/Thunks/addLicence";
import { Button } from "../../UI/Button/Button";
import { InputSelect } from "../../UI/InputSelect/InputSelect";
import { FormElem } from "../FormElem/FormElem";
import { Toggle } from "../Toggle/Toggle";
import { useAddFormState } from "./hooks/useAddFormState";
import styles from "./styles.module.css";

export const AddPackageForm = ({ togglePopup }) => {
  const { id } = useParams();

  const [form, setForm] = useAddFormState();
  const objectPrices = useSelector((state) => selectObjectPricePackages(state));
  const amount = useSelector((state) => selectObjectById(state, { id }).AMOUNT);
  const formatData = () => {
    const dtend = formatDate(addMonths(new Date(), form.period));

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
    const dtend = formatDate(addMonths(new Date(), form.period));
    e.preventDefault();
    addLicence({
      params: {
        idorg: id,
        iditem: 1,
        price: 72000,
        amount: amount - bill,
        klv: 1,
        dtstart: formatDate(form.date),
        dtend,
        items: formatData(),
      },
    });

    togglePopup();
  };

  const bill = Math.round(useCalculateAmount(form));
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
          <Button type="submit" label={"Активировать тариф"} />
        </div>
      </div>
    </FormElem>
  );
};
