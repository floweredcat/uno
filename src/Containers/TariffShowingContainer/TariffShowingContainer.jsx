import classNames from "classnames";
import styles from "./styles.module.css";
import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";
import { useSelector } from "react-redux";
import { selectObjectTarifById } from "../../store/Objects/selectors";
import { nanoid } from "nanoid";
import React from "react";

const TariffShowingContainer = ({ id }) => {
  const tarif = useSelector((state) => selectObjectTarifById(state, { id }));
  return (
    <div className={classNames(styles.object_info, styles.objects_element)}>
      {tarif
        .filter((el) => {
          return (
            new Date(el.DTSTART) <= new Date() &&
            new Date(el.DTEND) >= new Date()
          );
        })
        .map(
          (el, idx) =>
            !!el.KLV && (
              <InputCountedOption
                label={el.NAME}
                value={el.KLV}
                required={idx == 0}
                key={nanoid()}
                id={el.ID}
              />
            )
        )}
    </div>
  );
};

export const MemoTariffShowingContainer = React.memo(TariffShowingContainer);
