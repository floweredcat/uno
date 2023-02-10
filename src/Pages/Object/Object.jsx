import classNames from "classnames";
import { useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { selectObjectById } from "../../store/Objects/selectors";
import { EditPackageForm } from "../../Components/EditPackageForm/EditPackageForm";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { separateAmount } from "../../helpers/separateAmount.ts";
import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";
import { Table } from "../../Components/Table/Table";
import { TableHeader } from "../../Components/TableHeader/TableHeader";
import { UserData } from "../../Components/UserData/UserData";
import { ObjectInfoContainer } from "../../Containers/ObjectInfoContainer/ObjectInfoContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useInfoEntities } from "./hooks/useInfoEntities.ts";
import {ROUTES} from "../../assets/constants/Fixtires"

export const Object = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const objectData = useSelector((state) => selectObjectById(state, { id }));
  const infoEntities = useInfoEntities(objectData)
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const [form, setForm] = useState({
    station: 1,
    storage: false,
    calculation: false,
    tarifiation: false,
    waiter: 0,
    qr: 0,
  });

  if (!objectData) {
    return null;
  }

  return (
    <div className={styles.objects}>
      <ObjectInfoContainer data={infoEntities[0]} />
      <ObjectInfoContainer data={infoEntities[1]} />
      <div className={classNames(styles.object_info, styles.objects_element)}>
        <InputCountedOption
          label={"Станция"}
          value={form.station}
          required={true}
        />
        {form.storage && (
          <InputCountedOption
            label={"Склад"}
            value={form.storage}
          />
        )}
        {form.calculation && (
          <InputCountedOption
            label={"Калькуляция"}
            value={form.calculation}
          />
        )}
        {form.tarifiation && (
          <InputCountedOption
            label={"Тарификация"}
            value={form.tarifiation}
          />
        )}
        {form.waiter !== 0 && (
          <InputCountedOption
            label={"Мобильный официант"}
            value={form.waiter}
          />
        )}
        {form.qr !== 0 && (
          <InputCountedOption
            label={"QR меню"}
            value={form.qr}
          />
        )}
      </div>
      <ObjectInfoContainer data={infoEntities[2]} />
      <div
        className={classNames(
          styles.object_info,
          styles.status,
          styles.objects_element
        )}>
        <div className={styles.status_element}>
          <h2 className={styles.title}>Статус</h2>
          <div
            className={classNames(styles.status_info, {
              [styles.status_info__inactive]: objectData.ENDDT <= Date.now(),
            })}>
            {objectData.ENDDT <= Date.now() ? "Пакет не активен" : "Активен"}
          </div>
        </div>
        <div className={styles.status_element}>
          <h2 className={styles.title}>Сумма</h2>
          <div className={styles.status_info}>
            {objectData.AMOUNT ? separateAmount(objectData.AMOUNT) : "0"}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={classNames(styles.button, styles.button_exit)}
        onClick={() => navigate(ROUTES.objects)}>
        Назад
      </button>
      <button
        type="button"
        className={classNames(styles.button, styles.button_edit)}
        onClick={() => togglePopup()}>
        Редактировать пакет
      </button>
      {isPopupOpened && (
        <PopupContainer togglePopup={togglePopup}>
          <EditPackageForm
            togglePopup={togglePopup}
            form={form}
            setForm={setForm}
          />
        </PopupContainer>
      )}
      <h2 className={styles.tableTitle}>История точки</h2>
      <Table>
        <TableHeader
          headers={[
            "Дата операции",
            "Пользователь",
            "Номер операции",
            "Поступило",
            "Списано",
          ]}
        />
        <tr className={styles.table_row}>
          <UserData
            data={[
              "Дата операции",
              "Пользователь",
              "Номер операции",
              "Поступило",
              "Списано",
            ]}
          />
        </tr>
      </Table>
    </div>
  );
};
