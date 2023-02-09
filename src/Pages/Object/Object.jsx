import classNames from "classnames";
import { useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { selectObjectById } from "../../store/Objects/selectors";
import geoIcon from "../../assets/images/geo.svg";
import partnerIcon from "../../assets/images/partner.svg";
import phoneIcon from "../../assets/images/phone.svg";
import timerIcon from "../../assets/images/timer.svg";
import endtimerIcon from "../../assets/images/endtimer.svg";
import { getLeftMonth } from "../../helpers/getLeftMonth.ts";
import { EditPackageForm } from "../../Components/EditPackageForm/EditPackageForm";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { separateAmount } from "../../helpers/separateAmount.ts";
import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";
import { Table } from "../../Components/Table/Table";
import { TableHeader } from "../../Components/TableHeader/TableHeader";
import { UserData } from "../../Components/UserData/UserData";
import { ObjectInfoContainer } from "../../Containers/ObjectInfoContainer/ObjectInfoContainer";
import { ObjectInfoElement } from "../../Components/ObjectInfoElement/ObjectDataElement";
import { useNavigate, useParams } from "react-router-dom";

export const Object = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const objectData = useSelector((state) => selectObjectById(state, { id }));
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

  const { months, daysLeft } = objectData
    ? getLeftMonth({ start: objectData?.STARTDT, end: objectData?.ENDDT })
    : null;

  const packageTimeLeft = months ? months : "" + daysLeft ? " " + daysLeft : "";
  const infoEntities = [
    [
      {
        img: null,
        title: "Название",
        content: objectData?.NAME,
      },
      {
        img: null,
        title: "Дата создания",
        content: objectData?.DT,
      },
      {
        img: null,
        title: "Специалист",
        content: objectData.WORKER,
      },
    ],
    [
      {
        img: geoIcon,
        title: "Город/Страна",
        content: objectData?.CITY,
      },
      {
        img: partnerIcon,
        title: "Партнер",
        content: "UM System Group",
      },
      {
        img: phoneIcon,
        title: "Телефон",
        content: objectData?.PHONE,
      },
    ],
    [
      {
        img: timerIcon,
        title: "Начало",
        content: objectData.STARTDT || "Пакет не активен",
      },
      {
        img: endtimerIcon,
        title: "Конец",
        content: objectData.ENDDT || "Пакет не активен",
      },
      {
        img: timerIcon,
        title: "Осталось",
        content: packageTimeLeft,
      },
    ],
  ];
  if (!objectData) {
    return null;
  }

  return (
    <div className={styles.objects}>
      <ObjectInfoContainer>
        {infoEntities[0].map(el => {
          return <ObjectInfoElement objectData={el} />
        })}
      </ObjectInfoContainer>
      <ObjectInfoContainer>
        {infoEntities[1].map(el => {
          return <ObjectInfoElement objectData={el} />
        })}
      </ObjectInfoContainer>
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
      <ObjectInfoContainer>
        {infoEntities[2].map(el => {
          return <ObjectInfoElement objectData={el} />
        })}
      </ObjectInfoContainer>
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
        onClick={() => navigate('/objects')}>
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
        <UserData
          data={[
            "Дата операции",
            "Пользователь",
            "Номер операции",
            "Поступило",
            "Списано",
          ]}
        />
      </Table>
    </div>
  );
};
