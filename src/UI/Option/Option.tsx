import { FunctionComponent } from "react";
import styles from "./styles.module.css";

type Props = {
  value: string,
  label: string
}

export const Option: FunctionComponent<Props> = ({ value, label }):JSX.Element => 
    <option
      className={styles.option}
      value={value}
    >
      {label}
    </option>