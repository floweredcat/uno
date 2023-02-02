import classNames from "classnames";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectObjectsIds,
  selectObjectsIsLoading,
} from "../../store/Objects/selectors";
import { getObjects } from "../../store/Objects/Thunks/getObjects";
import styles from "./styles.module.css";
import { Object } from "../Object/Object";
import { selectUserId } from "../../store/Auth/selectors";
import { getPackagePrices } from "../../store/ObjectPrices/Thunks/getPackagePrices";
import { getFransheses } from "../../store/Franshises/Thunks/getFransheses";
import { ButtonBar } from "../ButtonsBar/ButtonsBar";
import { AddObjectForm } from "../AddObjectForm/AddObjectForm";
import { SearchBar } from "../SearchBar/SearchBar";
import { ObjectDataContainer } from "../../Containers/ObjectDataContainer/ObjectDataContainer";
import { useSingleEffect } from "../../hooks/UseSingleEffect";
import { PopupContainer } from "../../Containers/PopupContainer/PopupContainer";
import { OBJECT_HEADERS } from "../../constants/Fixtires";
import { Table } from "../Table/Table";

export const Objects = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => selectObjectsIsLoading(state));
  const objectsIds = useSelector((state) => selectObjectsIds(state));
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [filter, setFilter] = useState({ name: "", city: "" });
  const setName = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };
  let userId = useSelector((state) => selectUserId(state));
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  useSingleEffect(() => {
    dispatch(getObjects({ userId }));
    dispatch(getPackagePrices);
    dispatch(getFransheses({ userId }));
  }, [dispatch]);
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };
  if (localStorage.userId) {
    userId = localStorage.userId;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.objects_wrapper}>
      {!isRowSelected && (
        <>
          <Table>
            {OBJECT_HEADERS.map((el) => {
              return (
                <th
                  key={nanoid()}
                  className={classNames(
                    styles.table_cell,
                    styles.table_cell__header
                  )}>
                  {el === "Название" ? (
                    <SearchBar
                      filter={filter.name}
                      handleSearch={setName}
                      placeholder={el}
                    />
                  ) : (
                    el
                  )}
                </th>
              );
            })}
            {objectsIds?.map((id) => (
              <ObjectDataContainer
                key={id}
                id={id}
                filter={filter}
                onclick={setIsRowSelected}
              />
            ))}
          </Table>
          <ButtonBar onClicks={[togglePopup]} />
        </>
      )}
      {isRowSelected && (
        <Object
          toggleObject={setIsRowSelected}
          id={isRowSelected}
        />
      )}

      {isPopupOpened && (
        <PopupContainer togglePopup={togglePopup}>
          <AddObjectForm togglePopup={togglePopup} />
        </PopupContainer>
      )}
    </div>
  );
};
