import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../helpers/formatDate";
import { onjectFilterSliceActions } from "../../store/ObjectFilter";
import { selectObjectFilters } from "../../store/ObjectFilter/selectors";
import { CustomCalendar } from "../../Widgets/Calendar/Calendar";
import styles from "./styles.module.css";

export const FilterDateSelectContainer = () => {
  const dispatch = useDispatch();
  const filterDate = useSelector((state) => selectObjectFilters(state).DT);
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState("");

  const getDateString = date
    ? date.length > 0
      ? formatDate(date[0]) + " - " + formatDate(date[1])
      : formatDate(date)
    : null;

  useEffect(() => {
    dispatch(onjectFilterSliceActions.setFilter([date, "DT"]));
  }, [getDateString]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onChange = (e) => {
    if (date.length > 0) {
      toggleOpen();
    }
    setDate(e);
  };

  return (
    <>
      <button
        onClick={() => toggleOpen()}
        type="button"
        className={styles.toggleButton}>
        {filterDate.length > 0 ? getDateString : ''}
      </button>
      {isOpen && (
        <div className={styles.calendar_wrapper}>
          <CustomCalendar setDate={onChange} date={date} />
        </div>
      )}
    </>
  );
};
