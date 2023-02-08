import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  selectObjectsIds,
  selectObjectsIsLoading,
} from "../../../src/store/Objects/selectors";
import { Table } from "../../Components/Table/Table";
import { TableHeader } from "../../Components/TableHeader/TableHeader";
import { ObjectDataContainer } from "../../Containers/ObjectDataContainer/ObjectDataContainer";
import { ButtonBar } from "../../Components/ButtonsBar/ButtonsBar";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { AddObjectForm } from "../../Components/AddObjectForm/AddObjectForm";
import { useSingleEffect } from "../../hooks/UseSingleEffect";
import { getObjects } from "../../store/Objects/Thunks/getObjects";
import { getPackagePrices } from "../../store/ObjectPrices/Thunks/getPackagePrices";
import { getFransheses } from "../../store/Franshises/Thunks/getFransheses";

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
  const [filter, setFilter] = useState({ name: "", city: "" });
  const setName = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.objects_wrapper}>
      <>
        <Table>
          <TableHeader headers={OBJECT_HEADERS}
              handleSearch={setName} filter={filter.name}/>
          {objectsIds?.map((id) => (
            <ObjectDataContainer
              key={id}
              id={id}
              filter={filter}
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
