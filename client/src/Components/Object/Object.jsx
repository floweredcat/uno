import classNames from "classnames";
import { useState } from "react";
import { EditPackagePopup } from "../EditPackagePopup/EditPackagePopup";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { selectObjectById } from "../../store/Objects/selectors";
import geoIcon from './images/geo.svg'
import partnerIcon from './images/partner.svg'
import phoneIcon from './images/phone.svg'
import timerIcon from './images/timer.svg'
import endtimerIcon from './images/endtimer.svg'

export const Object = ({ toggleObject, id }) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const objectData = useSelector(state => selectObjectById(state, {id}))
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const getDiffDates = () => {
   const diff =  new Date(new Date(objectData.ENDDT.substr(0, objectData.ENDDT.indexOf("T")))) - new Date(objectData.STARTDT.substr(0, objectData.STARTDT.indexOf("T")))
    const days = diff / 86400000
    let months = Math.floor(days / 30);
    let leftDays = Math.floor(days / 30 - months)
    if (leftDays[-1] == 1) {
      leftDays += ' День'
    }
    else if (2 <= leftDays[-1] <=4 ) {
      leftDays += ' Дня'
    }

    else {
      leftDays += ' Дней'
    }

    if (months <= 1) {
      months += ' Месяц'
    }

    else if (2 <= months && months <= 4){
      months += ' Месяца'
    }

    else {
      months += ' Месяцев'
    }
    return {months, leftDays}
  }

  const leftTime = getDiffDates()

  return (
    <div className={styles.objects}>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.object_name}>{objectData.NAME}</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Дата создания</h2>
          <p className={styles.content}>{objectData.DT.substr(0, objectData.DT.indexOf("T"))}</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Специалист</h2>
          <p className={styles.content}>{objectData.WORKER}</p>
        </div>
        <button
          type="button"
          className={classNames(styles.button, styles.button_exit)}
          onClick={() => toggleObject()}
        />
      </div>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <img src={geoIcon} alt={geoIcon} className={styles.icon}></img>
          <h2 className={styles.title}>Город/Страна</h2>
          <p className={styles.content}>{objectData.CITY}</p>
        </div>
        <div className={styles.info_element}>
          <img src={partnerIcon} alt={partnerIcon} className={styles.icon}></img>
          <h2 className={styles.title}>Партнер</h2>
          <p className={styles.content}>UM System Group</p>
        </div>
        <div className={styles.info_element}>
        <img src={phoneIcon} alt={phoneIcon} className={styles.icon}></img>
          <h2 className={styles.title}>Телефон</h2>
          <p className={styles.content}>{objectData.PHONE}</p>
        </div>
      </div>
      <div className={classNames(styles.object_info, styles.objects_element)}>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Пакет</h2>
          <p className={styles.object_name}>{objectData.PAKET}</p>
        </div>
        <div className={styles.object_radios}>
          <div class={styles.object_radio}>
            <h2 className={styles.title}>Front</h2>
            <div className={styles.radio_indicator}>2</div>
          </div>
          <div class={styles.object_radio}>
            <h2 className={styles.title}>Тарификация</h2>
            <div className={classNames(styles.radio_indicator, {
              [styles.radio_indicator__active]: objectData.TARIF
            })}></div>
          </div>
          <div class={styles.object_radio}>
            <h2 className={styles.title}>Мобильный</h2>
            <div className={classNames(styles.radio_indicator, {
              [styles.radio_indicator__active]: objectData.MOB
            })}></div>
          </div>
          <div class={styles.object_radio}>
            <h2 className={styles.title}>QR</h2>
            <div className={classNames(styles.radio_indicator, {
              [styles.radio_indicator__active]: objectData.QR
            })}></div>
          </div>
        </div>
        <button
          type="button"
          className={classNames(styles.button, styles.button_edit)}
          disabled
          onClick={() => togglePopup()}>
          Редактировать пакет
        </button>
      </div>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <img src={timerIcon} alt={timerIcon} className={styles.icon}></img>
          <h2 className={styles.title}>Начало</h2>
          <p className={styles.content}>{objectData.STARTDT.substr(0, objectData.STARTDT.indexOf("T"))}</p>
        </div>
        <div className={styles.info_element}>
          <img src={endtimerIcon} alt={endtimerIcon} className={styles.icon}></img>
          <h2 className={styles.title}>Конец</h2>
          <p className={styles.content}>{objectData.ENDDT.substr(0, objectData.ENDDT.indexOf("T"))}</p>
        </div>
        <div className={styles.info_element}>
          <img src={timerIcon} alt={timerIcon} className={styles.icon}></img>
          <h2 className={styles.title}>Осталось</h2>
          <p className={styles.content}>{leftTime.months ? leftTime.months : '' + leftTime.leftDays ? ", " + leftTime.leftDays : ''}</p>
        </div>
      </div>
      <div className={classNames(styles.status, styles.objects_element)}>
        <div className={styles.status_element}>
          <h2 className={styles.title}>Статус</h2>
          <div className={styles.status_info}>Активен</div>
        </div>
        <div className={styles.status_element}>
          <h2 className={styles.title}>Сумма</h2>
          <div className={styles.status_info}>{objectData.AMOUNT}</div>
        </div>
      </div>
      {isPopupOpened && <EditPackagePopup togglePopup={togglePopup} />}
    </div>
  );
};
