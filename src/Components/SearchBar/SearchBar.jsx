import styles from './styles.module.css'

export const SearchBar = ({ handleSearch, filter, placeholder }) => {

  return (
    <input
      type="text"
      autoFocus={true}
      value={filter}
      placeholder={placeholder}
      onChange={handleSearch}
      className={styles.search_input}
    ></input>
  );
};
 