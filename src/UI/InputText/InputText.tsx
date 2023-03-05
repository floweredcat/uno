import styles from "./styles.module.css";

type InputProps = {
  label: string;
  value: string;
  setValue: (event) => void;
  name: string;
};

export const InputText = ({ label, value, setValue, name }: InputProps) => (
  <div className={styles.input_container}>
    <input
      name={name}
      autoComplete="new-password"
      id={label}
      type="text"
      className={styles.form_input}
      placeholder=" "
      value={value}
      onChange={setValue}
    />
    <label htmlFor={label} className={styles.form_label}>
      {label}
    </label>
  </div>
);
