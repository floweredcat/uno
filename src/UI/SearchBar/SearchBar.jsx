import styles from "./styles.module.css";

export const SearchBar = ({ value, placeholder, updateState }) => {


  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={updateState}
      className={styles.search_input}
    />
  );
};
