import classNames from "classnames";
import { useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { selectObjectById } from "../../store/Objects/selectors";
import geoIcon from "./images/geo.svg";
import partnerIcon from "./images/partner.svg";
import phoneIcon from "./images/phone.svg";
import timerIcon from "./images/timer.svg";
import endtimerIcon from "./images/endtimer.svg";
import { getLeftMonth } from "../../helpers/getLeftMonth";
import { EditPackageForm } from "../EditPackageForm/EditPackageForm";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { separateAmount } from "../../helpers/separateAmount";
import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";

export const Object = ({ toggleObject, id }) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const objectData = useSelector((state) => selectObjectById(state, { id }));
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const [form, setForm] = useState({
    stantion: 1,
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

  if (!objectData) {
    return null;
  }

  return (
    <div className={styles.objects}>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.object_name}>{objectData?.NAME}</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Дата создания</h2>
          <p className={styles.content}>{objectData.DT}</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Специалист</h2>
          <p className={styles.content}>{objectData.WORKER}</p>
        </div>
      </div>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <img
            src={geoIcon}
            alt={geoIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Город/Страна</h2>
          <p className={styles.content}>{objectData?.CITY}</p>
        </div>
        <div className={styles.info_element}>
          <img
            src={partnerIcon}
            alt={partnerIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Партнер</h2>
          <p className={styles.content}>UM System Group</p>
        </div>
        <div className={styles.info_element}>
          <img
            src={phoneIcon}
            alt={phoneIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Телефон</h2>
          <p className={styles.content}>{objectData?.PHONE}</p>
        </div>
      </div>
      <div className={classNames(styles.object_info, styles.objects_element)}>
        <InputCountedOption
          label={"Станция"}
          value={form.stantion}
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
      <div
        className={classNames(
          styles.object_info,
          styles.info,
          styles.objects_element
        )}>
        <div className={styles.info_element}>
          <img
            src={timerIcon}
            alt={timerIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Начало</h2>
          <p className={styles.content}>
            {objectData.STARTDT || "Пакет не активен"}
          </p>
        </div>
        <div className={styles.info_element}>
          <img
            src={endtimerIcon}
            alt={endtimerIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Конец</h2>
          <p className={styles.content}>
            {objectData.ENDDT || "Пакет не активен"}
          </p>
        </div>
        <div className={styles.info_element}>
          <img
            src={timerIcon}
            alt={timerIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Осталось</h2>
          <p className={styles.content}>{packageTimeLeft}</p>
        </div>
      </div>
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
        onClick={() => toggleObject()}>
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
    </div>
  );
};
