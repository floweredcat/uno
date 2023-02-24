import classNames from "classnames";
import React from "react";
import styles from "./styles.module.css";

export const InputCountedOption = ({
  required,
  label,
  value,
  increment,
  decrement,
  children,
}) => {
  return (
    <div
      className={classNames(styles.input_container, {
        [styles.input_requered]: required,
        [styles.input_notRequered]: !required,
        [styles.input_active]: value && !required,
      })}
    >
      <h4 className={styles.title}>{label}</h4>
      {!children && (
        <div className={styles.count_container}>
          {increment && (
            <button
              type="button"
              onClick={decrement}
              className={classNames(styles.button, styles.decrement)}
            />
          )}
          {value}
          {decrement && (
            <button
              type="button"
              onClick={increment}
              className={classNames(styles.button, styles.increment)}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export const MemoInputCountedOption = React.memo(InputCountedOption);
