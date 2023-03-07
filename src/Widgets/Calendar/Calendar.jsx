import { Calendar } from "react-calendar";
import styles from "./styles.module.css";
import "react-calendar/dist/Calendar.css";

export function CustomCalendar({
  setDate,
  date,
  selectRange = true,
  minDate,
  view = "month",
}) {
  return (
    <div className={styles.calendar_wrapper}>
      <Calendar
        className={styles.calendar}
        defaultView={view}
        minDate={minDate}
        onChange={setDate}
        value={date || null}
        selectRange={selectRange}
      />
    </div>
  );
}
