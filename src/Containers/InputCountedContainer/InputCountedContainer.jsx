import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputCountedOption } from "../../Components/InputCountedOption/InputCountedOption";

export const InputCountedContainer = ({ label, setValue, value, ...props }) => {
  const increment = () => {
    let newValue = value+1;
    setValue(newValue)
  }
  const decrement = () => {
    let newValue = value-1;
    setValue(newValue)
  }

  return (
    <InputCountedOption
      increment={increment}
      decrement={decrement}
      label={label}
      value={value}
      setValue={setValue}
      {...props}
    />
  );
};
