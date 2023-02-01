import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
// import { selectCartOptionCount } from "../../store/Cart/selectors";
import styles from "./styles.module.css";

export const InputCountedOption = ({ required, label, value, increment, decrement }) => {

  return (
    <div
      className={classNames(styles.input_container, {
        [styles.input_requered]: required,
        [styles.input_notRequered]: !required,
        [styles.input_active]: value && !required,
      })}>
      <h4 className={styles.title}>{label}</h4>
      <div className={styles.count_container}>
        <button
          type="button"
          onClick={decrement}
          className={classNames(styles.button, styles.decrement)}
        />
        {value || 0}
        <button
          type="button"
          onClick={increment}
          className={classNames(styles.button, styles.increment)}
        />
      </div>
    </div>
  );
};

export const MemoInputCountedOption = React.memo(InputCountedOption)
