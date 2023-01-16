import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from './styles.module.css'

export const SearchBar = ({ handleSearch, filter, placeholder }) => {
    const [isFocus, setIsFocus] = useState(false)

  return (
    <input
      type="text"
      value={filter}
      placeholder={placeholder}
      autoFocus={isFocus}
      onChange={(e) => {handleSearch(e)
    setIsFocus(true)}}
      className={styles.search_input}
    />
  );
};
