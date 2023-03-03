import classNames from "classnames";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../helpers/formatDate.ts";
import { onjectFilterSliceActions } from "../../store/ObjectFilter";
import { selectObjectFilters } from "../../store/ObjectFilter/selectors";
import { CustomCalendar } from "../../Widgets/Calendar/Calendar";
import styles from "./styles.module.css";

export const FilterDateSelectContainer = () => {
  const dispatch = useDispatch();
  const filterDate = useSelector((state) => selectObjectFilters(state).DT);
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState("");
  const ref = useRef(null);

  const getDateString = date
    ? date.length > 0
      ? formatDate(date[0]) + " - " + formatDate(date[1])
      : formatDate(date)
    : null;

  useEffect(() => {
    dispatch(onjectFilterSliceActions.setFilter([date, "DT"]));
    if (date.length > 0) {
      setIsOpen(false);
    }
  }, [getDateString]);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutSide, true);
    return () =>
      document.removeEventListener("click", handleClickOutSide, true);
  }, [setDate]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={styles.toggleButton}
      >
        {filterDate.length > 0 ? getDateString : "Дата создания"}
      </button>
      {
        <div
          className={classNames(styles.calendar_wrapper, {
            [styles.calendar_wrapper__hide]: !isOpen,
          })}
          ref={ref}
        >
          <CustomCalendar setDate={setDate} date={date} />
        </div>
      }
    </>
  );
};
