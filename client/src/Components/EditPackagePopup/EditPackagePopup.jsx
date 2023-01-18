import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectObjectPricePackages } from "../../store/ObjectPrices/selectors";
import { getPackagePrices } from "../../store/ObjectPrices/Thunks/getPackagePrices";
import { calculateBull } from "./helpers/calculateBill";
import styles from "./styles.module.css";
const packs = {
  start: "Start",
  max: "Max",
  base: "Base",
};

export const EditPackagePopup = ({ togglePopup }) => {
  const [form, setForm] = useState({
    pack: packs.start,
    packagePeriod: undefined,
    officePeriod: undefined,
    office: false,
    packageDate: undefined,
    qr: false,
    frontOffice: undefined,
    tarification: false,
    mobile: undefined,
    officeCount: undefined,
  });
  const packagesPrices = useSelector(state => selectObjectPricePackages(state))

  const handleSubmit = (e) => {
    e.preventDefault()
    calculateBull({form, packagesPrices})
  }

  return (
    <div className={styles.popup_wrapper}>
      <div className={styles.radios_container}>
        <div
          className={classNames(styles.radio_container, {
            [styles.radio_container__aective]: form.pack === packs.start,
          })}
          onClick={() => setForm({...form, pack: packs.start})}
        >
          {packs.start}
        </div>
        <div
          className={classNames(styles.radio_container, {
            [styles.radio_container__aective]: form.pack === packs.base,
          })}
          onClick={() => setForm({...form, pack: packs.base})}
        >
          {packs.base}
        </div>
        <div
          className={classNames(styles.radio_container, {
            [styles.radio_container__aective]: form.pack === packs.max,
          })}
          onClick={() => setForm({...form, pack: packs.max})}
        >
          {packs.max}
        </div>
      </div>
      <div
        className={classNames(styles.popup, {
          [styles.popup__base]: form.pack === packs.base,
          [styles.popup__max]: form.pack === packs.max,
        })}
      >
      <button
        className={classNames(styles.button, styles.popup_closeButton)}
        type="button"
        onClick={() => togglePopup()}
      />
        <div className={styles.container}>
          <div className={styles.date_container}>
            <input type="date" id="dateStart" value={form.packageDate} onChange={e => setForm({...form, packageDate: e.target.value})} className={styles.date}></input>
            <label htmlFor="dateStart" className={styles.label}>
              Дата начала
            </label>
          </div>
          <div className={styles.date_container}>
            <input type="number" id="office" value={form.frontOffice} onChange={e => setForm({...form, frontOffice: e.target.value}) } className={styles.count}></input>
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
              [styles.period_button__active]: form.packagePeriod === 1,
            })}
            onClick={() => setForm({...form, packagePeriod: 1})}
          >
            1 Месяц
          </button>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: form.packagePeriod === 3,
            })}
            onClick={() => setForm({...form, packagePeriod: 3})}
          >
            3 Месяца
          </button>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: form.packagePeriod === 12,
            })}
            onClick={() => setForm({...form, packagePeriod: 12})}
          >
            1 Год
          </button>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: form.packagePeriod === 24,
            })}
            onClick={() => setForm({...form, packagePeriod: 24})}
          >
            2 Года
          </button>
          <button
            type="button"
            className={classNames(styles.perion_button, {
              [styles.period_button__active]: form.packagePeriod === 36,
            })}
            onClick={() => setForm({...form, packagePeriod: 36})}
          >
            3 Года
          </button>
        </div>
        <label
          htmlFor="switchTar"
          className={classNames(styles.switch, {
            [styles.switch__active]: form.tarification,
          })}
        >
          Тарификация
          <input
            type="checkbox"
            onChange={e => setForm({...form, tarification: !form.tarification})}
            checked={form.tarification}
            id="switchTar"
            className={styles.toggle}
          ></input>
        </label>
        <label
          htmlFor="switchQr"
          className={classNames(styles.switch, {
            [styles.switch__active]: form.qr,
          })}
        >
          QR Меню
          <input
            type="checkbox"
            onChange={e => setForm({...form, qr: !form.qr})}
            checked={form.qr}
            id="switchQr"
            className={styles.toggle}
          ></input>
        </label>
        <label
          htmlFor="switch"
          className={classNames(styles.switch, {
            [styles.switch__active]: form.office,
          })}
        >
          Мобильный официант
          <input
            type="checkbox"
            onChange={e => setForm({...form, office: !form.office})}
            checked={form.office}
            id="switch"
            className={styles.toggle}
          ></input>
        </label>
        {form.office && (
          <>
            <div className={styles.container}>
              <div className={styles.date_container}>
                <input
                  type="date"
                  id="dateStart"
                  className={styles.date}
                  value={form.mobile}
                  onChange={e => setForm({...form, mobile: e.target.value})}
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
                  value={form.officeCount}
                  onChange={e => setForm({...form, officeCount: e.target.value >= 0 ? e.target.value : 0})}
                ></input>
                <label
                  htmlFor="office"
                  className={classNames(styles.count_label, styles.label)}
                >
                  Количество
                </label>
              </div>
            </div>
            <div className={styles.period_container}>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: form.officePeriod === 1,
                })}
                onClick={() => setForm({...form, officePeriod: 1})}
              >
                1 Месяц
              </button>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: form.officePeriod === 3,
                })}
                onClick={() => setForm({...form, officePeriod: 3})}
              >
                3 Месяца
              </button>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: form.officePeriod === 12,
                })}
                onClick={() => setForm({...form, officePeriod: 12})}
              >
                1 Год
              </button>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: form.officePeriod === 24,
                })}
                onClick={() => setForm({...form, officePeriod: 24})}
              >
                2 Года
              </button>
              <button
                type="button"
                className={classNames(styles.perion_button, {
                  [styles.period_button__active]: form.officePeriod === 36,
                })}
                onClick={() => setForm({...form, officePeriod: 36})}
              >
                3 Года
              </button>
            </div>
          </>
        )}
          
        <div
          className={classNames(styles.amount, {
            [styles.amount__base]: form.pack === packs.base,
            [styles.amount__max]: form.pack === packs.max,
          })}
        >
          120,000
          <button type='submit' onClick={(e) => handleSubmit(e)} className={styles.submit}></button>
        </div>
      </div>
    </div>
  );
};
