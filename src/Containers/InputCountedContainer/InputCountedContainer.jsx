import { InputCountedOption } from "../../Components/InputCountedOption/InputCountedOption";

export const InputCountedContainer = ({ label, setValue, value, step=1, ...props }) => {
  const increment = () => {
    let newValue = value+step;
    setValue(newValue)
  }
  const decrement = () => {
    let newValue = value-step;
    if (newValue >= 0) {
      setValue(newValue)
    }
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
