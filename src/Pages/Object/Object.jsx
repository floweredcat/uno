import classNames from "classnames";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectObjectById } from "../../store/Objects/selectors";
import { EditPackageForm } from "../../Components/EditPackageForm/EditPackageForm";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { separateAmount } from "../../helpers/separateAmount.ts";
import { Table } from "../../Components/Table/Table";
import { TableHeader } from "../../Components/TableHeader/TableHeader";
import { UserData } from "../../Components/UserData/UserData";
import { ObjectInfoContainer } from "../../Containers/ObjectInfoContainer/ObjectInfoContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useInfoEntities } from "./hooks/useInfoEntities.ts";
import { ROUTES } from "../../assets/constants/Fixtires";
import { getHistoryObjectIfNotExist } from "../../store/ObjectHistory/Thunks/getHistoryObjectIfNotExist";
import { selectObjectHistoryById } from "../../store/ObjectHistory/selectors";
import { nanoid } from "nanoid";
import { ButtonBar } from "../../Components/ButtonsBar/ButtonsBar";
import back from "../../assets/images/back.png";
import edit from "../../assets/images/edit.svg";
import { getObjects } from "../../store/Objects/Thunks/getObjects";
import { MemoTariffShowingContainer } from "../../Containers/TariffShowingContainer/TariffShowingContainer";
import { useToggleState } from "../../hooks/UseToggleState";
import { getPackagePrices } from "../../store/ObjectPrices/Thunks/getPackagePrices";
import { AddPackageForm } from "../../Components/AddPackageForm/AddPackageForm";
import { getMaxDate } from "../../helpers/getMaxDate.ts";
import { getMinDate } from "../../helpers/getMinDate.ts";
const images = [back, edit];
const HISTORY_HEADERS = [
  "Дата операции",
  "Вид операции",
  "Наименование",
  "Вид оплаты",
  "Сумма",
];

export const Object = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPopupOpened, setIsPopupOpened] = useToggleState(false);
  const [isAddPopupOpened, setIsAddPopupOpened] = useToggleState(false);
  const objectData = useSelector((state) => selectObjectById(state, { id }));
  const history = useSelector((state) =>
    selectObjectHistoryById(state, { id })
  );
  const idlic = objectData?.lic[0]?.IDLIC || 0;
  const endDates = objectData?.lic.map((el) => new Date(el.DTEND));
  const startDates = objectData?.lic.map((el) => new Date(el.DTSTART));
  const ENDDT = getMaxDate(endDates);
  const STARTDT = getMinDate(startDates);

  const infoEntities = useInfoEntities({ ...objectData, ENDDT, STARTDT });
  const status = () =>
    objectData?.lic.length > 0
      ? ENDDT > Date.now() && STARTDT < Date.now()
      : false;

  useEffect(() => {
    if (!objectData) {
      dispatch(getObjects({ userId: localStorage.userId / 1 }));
    } else {
      dispatch(getPackagePrices);
      dispatch(getHistoryObjectIfNotExist({ id }));
    }
  }, [id, objectData]);

  const onclicks = [() => navigate(ROUTES.objects), () => setIsPopupOpened()];

  if (!objectData) {
    return null;
  }

  return (
    <div className={styles.object_wrapper}>
      <div className={styles.objects}>
        <ObjectInfoContainer data={infoEntities[0]} />
        <ObjectInfoContainer data={infoEntities[1]} />
        {!status() || (
          <>
            <MemoTariffShowingContainer id={id} />
            <ObjectInfoContainer data={infoEntities[2]} />
          </>
        )}
        <div
          className={classNames(
            styles.object_info,
            styles.status,
            styles.objects_element
          )}
        >
          {status() ? (
            <div className={styles.status_element}>
              <h2 className={styles.title}>Статус</h2>
              <div className={classNames(styles.status_info)}>
                {status() ? "Активен" : "Пакет не активен"}
              </div>
            </div>
          ) : (
            <div className={styles.status_element}>
              <h2 className={styles.title}>{"Начать работу:"}</h2>
              <button
                className={styles.activate_tarif}
                type="button"
                onClick={setIsAddPopupOpened}
              >
                Активировать тариф
              </button>
            </div>
          )}
          <div className={styles.status_element}>
            <h2 className={styles.title}>Сумма</h2>
            <div className={styles.status_info}>
              {separateAmount(objectData.AMOUNT)}
            </div>
          </div>
        </div>
        {isPopupOpened && (
          <PopupContainer togglePopup={setIsPopupOpened}>
            <EditPackageForm togglePopup={setIsPopupOpened} idlic={idlic} />
          </PopupContainer>
        )}
        {isAddPopupOpened && (
          <PopupContainer togglePopup={setIsAddPopupOpened}>
            <AddPackageForm togglePopup={setIsAddPopupOpened} />
          </PopupContainer>
        )}
        {history.length > 0 && (
          <>
            <h2 className={styles.tableTitle}>История точки</h2>
            <Table>
              <TableHeader headers={HISTORY_HEADERS} />
              <tr className={styles.table_row}>
                {history.map((el) => {
                  const { AMOUNT, USR, DT, OPER, PERIOD } = el;
                  return (
                    <UserData
                      data={[DT, OPER, USR, PERIOD, AMOUNT]}
                      key={nanoid()}
                    />
                  );
                })}
              </tr>
            </Table>
          </>
        )}
      </div>
      <ButtonBar
        onClicks={status() ? onclicks : onclicks.slice(0, 1)}
        images={images}
      />
    </div>
  );
};
