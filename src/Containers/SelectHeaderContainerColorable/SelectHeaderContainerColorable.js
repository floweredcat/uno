import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onjectFilterSliceActions } from "../../store/ObjectFilter";
import { InputSelectTableColorable } from "../../UI/InputSelectTableColorable/InputSelectTableColorable";

export const SelectHeaderContainerColorable = ({
  availableValues,
  label,
  name,
}) => {
  const mapValues = [{ value: "", label: "" }].concat(availableValues);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const setFilter = useCallback(
    (value) => dispatch(onjectFilterSliceActions.setFilter([value, name]))[name]
  );

  useEffect(() => {
    setFilter(value);
  }, [value]);

  return (
    <InputSelectTableColorable
      mapValues={mapValues}
      label={label}
      value={value}
      setForm={setValue}
    />
  );
};
