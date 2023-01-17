import classNames from "classnames";
import { useState } from "react";
import styles from "./styles.module.css";
const packs = {
  start: "Start",
  max: "Max",
  base: "Base",
};

export const EditPackagePopup = ({ togglePopup }) => {
  const [pack, setPack] = useState(packs.start);
  const [packagePeriod, setPackagePeriod] = useState();
  const [officePeriod, setOfficePeriod] = useState();
  const [office, setOffice] = useState(false);
  const [qr, setQr] = useState(false);
  const [tarification, setTarification] = useState(false);
  const toggleOffice = () => {
    setOffice(!office);
  };
  return (
    <div className={styles.popup_wrapper}>
      <div className={styles.radios_container}>
        <button
          className={classNames(styles.button, styles.popup_closeButton)}
          type="button"
          onClick={() => togglePopup()}
        />
        <div
          className={classNames(styles.radio_container, {
            [styles.radio_container__aective]: pack === packs.start,
          })}
          onClick={() => setPack(packs.start)}
        >
          {packs.start}
        </div>
        <div
          className={classNames(styles.radio_container, {
            [styles.radio_container__aective]: pack === packs.base,
          })}
          onClick={() => setPack(packs.base)}
        >
          {packs.base}
        </div>
        <div
          className={classNames(styles.radio_container, {
            [styles.radio_container__aective]: pack === packs.max,
          })}
          onClick={() => setPack(packs.max)}
        >
          {packs.max}
        </div>
      </div>
      <div
        className={classNames(styles.popup, {
          [styles.popup__base]: pack === packs.base,
          [styles.popup__max]: pack === packs.max,
        })}
      >
        <div className={styles.container}>
          <div className={styles.date_container}>
            <input type="date" id="dateStart" className={styles.date}></input>
            <label htmlFor="dateStart" className={styles.label}>
              Дата начала
            </label>
          </div>
          <div className={styles.date_container}>
            <input type="number" id="office" className={styles.count}></input>
            <label
              htmlFor="office"
              className={classNames(styles.count_label, styles.label)}
            >
              Количество Front-office
            </label>
          </div>
        </div>
        <div className={styles.period_container}>
          <h3 className={styles.period_title}>Период</h3>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: packagePeriod === 1,
            })}
            onClick={() => setPackagePeriod(1)}
          >
            1 Месяц
          </button>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: packagePeriod === 3,
            })}
            onClick={() => setPackagePeriod(3)}
          >
            3 Месяца
          </button>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: packagePeriod === 12,
            })}
            onClick={() => setPackagePeriod(12)}
          >
            1 Год
          </button>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: packagePeriod === 24,
            })}
            onClick={() => setPackagePeriod(24)}
          >
            2 Года
          </button>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: packagePeriod === 36,
            })}
            onClick={() => setPackagePeriod(36)}
          >
            3 Года
          </button>
        </div>
        <label
          htmlFor="switchTar"
          className={classNames(styles.switch, {
            [styles.switch__active]: tarification,
          })}
        >
          Тарификация
          <input
            type="checkbox"
            onChange={() => setTarification(!tarification)}
            checked={tarification}
            id="switchTar"
            className={styles.toggle}
          ></input>
        </label>
        <label
          htmlFor="switchQr"
          className={classNames(styles.switch, {
            [styles.switch__active]: qr,
          })}
        >
          QR Меню
          <input
            type="checkbox"
            onChange={() => setQr(!qr)}
            checked={qr}
            id="switchQr"
            className={styles.toggle}
          ></input>
        </label>
        <label
          htmlFor="switch"
          className={classNames(styles.switch, {
            [styles.switch__active]: office,
          })}
        >
          Мобильный официант
          <input
            type="checkbox"
            onChange={() => toggleOffice()}
            checked={office}
            id="switch"
            className={styles.toggle}
          ></input>
        </label>
        {office && (
          <>
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
                <input
                  type="number"
                  id="office"
                  className={styles.count}
                ></input>
                <label
                  htmlFor="office"
                  className={classNames(styles.count_label, styles.label)}
                >
                  Количество Front-office
                </label>
              </div>
            </div>
            <div className={styles.period_container}>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: officePeriod === 1,
                })}
                onClick={() => setOfficePeriod(1)}
              >
                1 Месяц
              </button>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: officePeriod === 3,
                })}
                onClick={() => setOfficePeriod(3)}
              >
                3 Месяца
              </button>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: officePeriod === 12,
                })}
                onClick={() => setOfficePeriod(12)}
              >
                1 Год
              </button>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: officePeriod === 24,
                })}
                onClick={() => setOfficePeriod(24)}
              >
                2 Года
              </button>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: officePeriod === 36,
                })}
                onClick={() => setOfficePeriod(36)}
              >
                3 Года
              </button>
            </div>
          </>
        )}
          
        <div
          className={classNames(styles.amount, {
            [styles.amount__base]: pack === packs.base,
            [styles.amount__max]: pack === packs.max,
          })}
        >
          120,000
        </div>
      </div>
    </div>
  );
};
