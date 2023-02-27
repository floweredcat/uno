import classNames from "classnames";
import styles from "./styles.module.css";
import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";
import { useSelector } from "react-redux";
import { selectObjectById } from "../../store/Objects/selectors";

export const TariffShowingContainer = ({ id }) => {
  console.log(id);
  const object = useSelector((state) => selectObjectById(state, { id }));
  const { KLV, TARIF, MOB, QR } = object;
  console.log(KLV, TARIF, MOB, QR);
  const labels = {
    storage: "Склад",
    qr: "QR меню",
    waiter: "Мобильный официант",
    calculation: "Калькуляция",
    station: "Станция",
    tarification: "Тарификация",
  };

  const tarification = 1;
  const calculation = 1;
  return (
    <div className={classNames(styles.object_info, styles.objects_element)}>
      <InputCountedOption label={labels.station} value={KLV} required={true} />
      {TARIF && <InputCountedOption label={labels.storage} value={TARIF} />}
      {calculation && (
        <InputCountedOption label={labels.calculation} value={calculation} />
      )}
      {tarification && (
        <InputCountedOption label={labels.tarification} value={tarification} />
      )}
      {!!MOB && <InputCountedOption label={labels.waiter} value={MOB} />}
      {QR && <InputCountedOption label={labels.qr} value={QR} />}
    </div>
  );
};
