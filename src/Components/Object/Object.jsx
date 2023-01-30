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
import { getLeftMonth } from "./helpers/getLeftMonth";
import { EditPackageForm } from "../EditPackageForm/EditPackageForm";
import { PackagePopupContainer } from "../../Containers/PackagePopupContainer/PackagePopupContainer";

export const Object = ({ toggleObject, id }) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const objectData = useSelector((state) => selectObjectById(state, { id }));
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const leftTime = objectData
    ? getLeftMonth({ start: objectData?.STARTDT, end: objectData?.ENDDT })
    : null;

  return (
    <div className={styles.objects}>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.object_name}>{objectData?.NAME}</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Дата создания</h2>
          <p className={styles.content}>
            {objectData?.DT?.substr(0, objectData?.DT.indexOf("T"))}
          </p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Специалист</h2>
          <p className={styles.content}>{objectData?.WORKER}</p>
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
        <div className={styles.info_element}>
          <h2 className={styles.title}>Пакет</h2>
          <p className={styles.object_name}>{objectData?.PAKET}</p>
        </div>
        <div className={styles.object_radios}>
          <div className={styles.object_radio}>
            <h2 className={styles.title}>Front</h2>
            <div className={styles.radio_indicator}>2</div>
          </div>
          <div className={styles.object_radio}>
            <h2 className={styles.title}>Тарификация</h2>
            <div
              className={classNames(styles.radio_indicator, {
                [styles.radio_indicator__active]: objectData?.TARIF,
              })}></div>
          </div>
          <div className={styles.object_radio}>
            <h2 className={styles.title}>Мобильный</h2>
            <div
              className={classNames(styles.radio_indicator, {
                [styles.radio_indicator__active]: objectData?.MOB,
              })}></div>
          </div>
          <div className={styles.object_radio}>
            <h2 className={styles.title}>QR</h2>
            <div
              className={classNames(styles.radio_indicator, {
                [styles.radio_indicator__active]: objectData?.QR,
              })}></div>
          </div>
        </div>
        <button
          type="button"
          className={classNames(styles.button, styles.button_edit)}
          onClick={() => togglePopup()}>
          Редактировать пакет
        </button>
      </div>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <img
            src={timerIcon}
            alt={timerIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Начало</h2>
          <p className={styles.content}>{objectData?.STARTDT}</p>
        </div>
        <div className={styles.info_element}>
          <img
            src={endtimerIcon}
            alt={endtimerIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Конец</h2>
          <p className={styles.content}>{objectData?.ENDDT}</p>
        </div>
        <div className={styles.info_element}>
          <img
            src={timerIcon}
            alt={timerIcon}
            className={styles.icon}></img>
          <h2 className={styles.title}>Осталось</h2>
          <p className={styles.content}>
            {leftTime.months
              ? leftTime.months
              : "" + leftTime.leftDays
              ? " " + leftTime.leftDays
              : ""}
          </p>
        </div>
      </div>
      <div className={classNames(styles.status, styles.objects_element)}>
        <div className={styles.status_element}>
          <h2 className={styles.title}>Статус</h2>
          <div className={styles.status_info}>Активен</div>
        </div>
        <div className={styles.status_element}>
          <h2 className={styles.title}>Сумма</h2>
          <div className={styles.status_info}>
            {objectData?.AMOUNT}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={classNames(styles.button, styles.button_exit)}
        onClick={() => toggleObject()}>
        Назад
      </button>
      {isPopupOpened && (
        <PackagePopupContainer
          togglePopup={togglePopup}
          title={"Добавление объекта"}>
          <EditPackageForm togglePopup={togglePopup} />
        </PackagePopupContainer>
      )}
    </div>
  );
};
