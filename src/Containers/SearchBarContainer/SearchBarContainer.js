import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../../UI/SearchBar/SearchBar";
import { onjectFilterSliceActions } from "../../store/ObjectFilter";
import { selectObjectFilters } from "../../store/ObjectFilter/selectors";

export const SearchBarContainer = ({ name, placeholder }) => {
  const initialValue = useSelector(state => selectObjectFilters(state)[name]);
  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();

  const setFilter = useCallback(
    (value) => dispatch(onjectFilterSliceActions.setFilter([value, name]))[name]
  );

  useEffect(() => {
    setFilter(value);
  }, [value]);

  const updateState = (e) => {
    setValue(e.target.value);
  };

  return (
    <SearchBar
      value={initialValue}
      updateState={updateState}
      placeholder={placeholder}
    />
  );
};
