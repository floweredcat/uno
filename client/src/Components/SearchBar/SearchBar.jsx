import styles from './styles.module.css'

export const SearchBar = ({ handleSearch, filter, placeholder }) => {

  return (
    <input
      type="submit"
      value={filter}
      placeholder={placeholder}
      autoFocus={true}
      onChange={(e) => {handleSearch(e)}}
      className={styles.search_input}
    ></input>
  );
};
