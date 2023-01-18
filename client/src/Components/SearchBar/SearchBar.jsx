import styles from './styles.module.css'

export const SearchBar = ({ handleSearch, filter, placeholder }) => {

  return (
    <input
      type="text"
      value={filter}
      placeholder={placeholder}
      autoFocus={true}
      onChange={(e) => {handleSearch(e)}}
      className={styles.search_input}
    />
  );
};
