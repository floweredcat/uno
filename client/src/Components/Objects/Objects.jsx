import classNames from "classnames";
import { useState } from "react";
import { getObjects } from "../../store/Objects/Thunks/getObjectsById";
import { EditPackagePopup } from "../EditPackagePopup/EditPackagePopup";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";

export const Objects = () => {
  const dispatch = useDispatch();

    const [isPopupOpened, setIsPopupOpened] = useState(false)
    const togglePopup = () => {
        setIsPopupOpened(!isPopupOpened)
    }

  dispatch(getObjects)

  return (
    <div className={styles.objects}>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.object_name}>Ресторан “Chica”</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.content}>content</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.content}>content</p>
        </div>
      </div>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.content}>content</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.content}>content</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.content}>content</p>
        </div>
      </div>
      <div className={classNames(styles.object_info, styles.objects_element)}>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Пакет</h2>
          <p className={styles.object_name}>MAX</p>
        </div>
        <div className={styles.object_radios}>
            <div class={styles.object_radio}>
                <h2 className={styles.title}>Front</h2>
                <div className={styles.radio_indicator}>2</div>
            </div>
            <div class={styles.object_radio}>
                <h2 className={styles.title}>Тарификация</h2>
                <div className={styles.radio_indicator}></div>
            </div>
            <div class={styles.object_radio}>
                <h2 className={styles.title}>Мобильный</h2>
                <div className={styles.radio_indicator}></div>
            </div>
            <div class={styles.object_radio}>
                <h2 className={styles.title}>QR</h2>
                <div className={styles.radio_indicator}></div>
            </div>
        </div>
        <button type="button" className={classNames(styles.button, styles.button_edit)} onClick={() => togglePopup()}>Редактировать пакет</button>
      </div>
      <div className={classNames(styles.info, styles.objects_element)}>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.content}>content</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.content}>content</p>
        </div>
        <div className={styles.info_element}>
          <h2 className={styles.title}>Название</h2>
          <p className={styles.content}>content</p>
        </div>
      </div>
      <div className={classNames(styles.status, styles.objects_element)}>
        <div className={styles.status_element}>
            <h2 className={styles.title}>Статус</h2>
            <div className={styles.status_info}>Активен</div>
        </div>
        <div className={styles.status_element}>
            <h2 className={styles.title}>Сумма</h2>
            <div className={styles.status_info}>180,000</div>
        </div>
      </div>
      {isPopupOpened && <EditPackagePopup togglePopup={togglePopup} />}
    </div>
  );
};
