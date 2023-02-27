import classNames from "classnames";
import styles from "./styles.module.css";
import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";

export const TariffShowingContainer = ({ form }) => {
  const { storage, calculation, station, tarifiation, waiter, qr } = form;
  const labels = {
    storage: "Склад",
    qr: "QR меню",
    waiter: "Мобильный официант",
    calculation: "Калькуляция",
    station: "Станция",
    tarifiation: "Тарификация",
  };
  return (
    <div className={classNames(styles.object_info, styles.objects_element)}>
      <InputCountedOption
        label={labels.station}
        value={station}
        required={true}
      />
      {storage && <InputCountedOption label={labels.storage} value={storage} />}
      {calculation && (
        <InputCountedOption label={labels.calculation} value={calculation} />
      )}
      {tarifiation && (
        <InputCountedOption label={labels.tarifiation} value={tarifiation} />
      )}
      {waiter !== 0 && (
        <InputCountedOption label={labels.waiter} value={waiter} />
      )}
      {qr !== 0 && <InputCountedOption label={labels.qr} value={qr} />}
    </div>
  );
};
