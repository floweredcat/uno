import classNames from "classnames";
import styles from "./styles.module.css";

export const EditPackagePopup = ({ togglePopup }) => {
  return (
    <div className={styles.popup_wrapper}>
      <div className={styles.popup}>
        <button
          className={classNames(styles.button, styles.popup_closeButton)}
          type="button"
          onClick={() => togglePopup()}
        />
        <h2 className={styles.title}>Форма покупки лицензии</h2>
        <form className={styles.content}>
          <div className={styles.package}>
            <div className={styles.input_container}>
              <input
                type="radio"
                id="start"
                className={styles.input_radio}
              ></input>
              <label htmlFor="start" className={styles.start}>
                Start
              </label>
            </div>
            <div className={styles.container}>
              <div className={styles.date_container}>
                <input
                  type="date"
                  id="dateStart"
                  className={styles.date}
                ></input>
                <label htmlFor="dateStart" className={styles.label}>
                  Дата начала
                </label>
              </div>
              <div className={styles.date_container}>
                <input type="text" id="dateEnd" className={styles.date}></input>
                <label htmlFor="dateEnd" className={styles.label}>
                  Период
                </label>
              </div>
              <div className={styles.date_container}>
              <input
                type="number"
                id="front-office"
                className={styles.count}
              ></input>
              <label htmlFor="front-office" className={styles.count_label}>
                Количество Front-office
              </label>
              </div>
            </div>
          </div>
          <div className={styles.package}>
            <div className={styles.input_container}>
              <input
                type="radio"
                id="start"
                className={styles.input_radio}
              ></input>
              <label htmlFor="start" className={styles.start}>
                Start
              </label>
            </div>
            <div className={styles.container}>
              <div className={styles.date_container}>
                <input
                  type="date"
                  id="dateStart"
                  className={styles.date}
                ></input>
                <label htmlFor="dateStart" className={styles.label}>
                  Дата начала
                </label>
              </div>
              <div className={styles.date_container}>
                <input type="text" id="dateEnd" className={styles.date}></input>
                <label htmlFor="dateEnd" className={styles.label}>
                  Период
                </label>
              </div>
              <div className={styles.date_container}>
              <input
                type="number"
                id="front-office"
                className={styles.count}
              ></input>
              <label htmlFor="front-office" className={styles.count_label}>
                Количество Front-office
              </label>
              </div>
            </div>
          </div>
          <div className={styles.package}>
            <div className={styles.input_container}>
              <input
                type="radio"
                id="start"
                className={styles.input_radio}
              ></input>
              <label htmlFor="start" className={styles.start}>
                Start
              </label>
            </div>
            <div className={styles.container}>
              <div className={styles.date_container}>
                <input
                  type="date"
                  id="dateStart"
                  className={styles.date}
                ></input>
                <label htmlFor="dateStart" className={styles.label}>
                  Дата начала
                </label>
              </div>
              <div className={styles.date_container}>
                <input type="text" id="dateEnd" className={styles.date}></input>
                <label htmlFor="dateEnd" className={styles.label}>
                  Период
                </label>
              </div>
              <div className={styles.date_container}>
              <input
                type="number"
                id="front-office"
                className={styles.count}
              ></input>
              <label htmlFor="front-office" className={styles.count_label}>
                Количество Front-office
              </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
