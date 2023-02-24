import { Calendar } from "react-calendar";
import styles from "./styles.module.css";
import "react-calendar/dist/Calendar.css";

export function CustomCalendar({ setDate, date }) {
  return (
    <div className={styles.calendar_wrapper}>
      <Calendar onChange={setDate} value={date || null} selectRange={true} />
    </div>
  );
}
