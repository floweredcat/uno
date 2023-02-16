import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'

export const SearchBar = ({ handleSearch, filter, placeholder, name }) => {
  const [value, setValue] = useState(filter);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const updateState = (e) => {
    setValue(e.target.value);
    handleSearch(e.target.value, name);
  };

  return (
    <input
      type="text"
      ref={inputRef}
      value={value}
      placeholder={placeholder}
      onChange={updateState}
      className={styles.search_input}
    />
  );
};
 