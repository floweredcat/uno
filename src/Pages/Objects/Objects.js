import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  selectObjectsIds,
  selectObjectsIsLoading,
} from "../../../src/store/Objects/selectors";
import { Table } from "../../Components/Table/Table";
import { ObjectDataContainer } from "../../Containers/ObjectDataContainer/ObjectDataContainer";
import { ButtonBar } from "../../Components/ButtonsBar/ButtonsBar";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { AddObjectForm } from "../../Components/AddObjectForm/AddObjectForm";
import { useSingleEffect } from "../../hooks/UseSingleEffect";
import { getObjects } from "../../store/Objects/Thunks/getObjects";
import { getPackagePrices } from "../../store/ObjectPrices/Thunks/getPackagePrices";
import { getFransheses } from "../../store/Franshises/Thunks/getFransheses";
import { TableHeaderFiltered } from "../../Components/TableHeaderFiltered/TableHeaderFiltered";
import { onjectFilterSliceActions } from "../../store/ObjectFilter";

const OBJECT_HEADERS = [
  "ID",
  "Название",
  "Город",
  "Телефон",
  "Дата",
  "Партнер",
  "Баланс",
];

export const Objects = () => {
  const dispatch = useDispatch();
  const userId = localStorage.userId;
  useSingleEffect(() => {
    dispatch(getObjects({ userId }));
    dispatch(getPackagePrices);
    dispatch(getFransheses({ userId }));
  }, []);
  const isLoading = useSelector((state) => selectObjectsIsLoading(state));
  const objectsIds = useSelector((state) => selectObjectsIds(state));
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };
  const resetFilter = () => dispatch(onjectFilterSliceActions.resetFilter());

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.objects_wrapper}>
      <>
        <button
          type="button"
          onClick={resetFilter}
          className={styles.reset}
        >сбросить фильтр</button>
        <Table>
          <TableHeaderFiltered headers={OBJECT_HEADERS} />
          {objectsIds?.map((id) => (
            <ObjectDataContainer
              key={id}
              id={id}
            />
          ))}
        </Table>
        <ButtonBar onClicks={[togglePopup]} />
      </>
      {isPopupOpened && (
        <PopupContainer togglePopup={togglePopup}>
          <AddObjectForm togglePopup={togglePopup} />
        </PopupContainer>
      )}
    </div>
  );
};
