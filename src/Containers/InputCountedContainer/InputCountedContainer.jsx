import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";


export const InputCountedContainer = ({
  children,
  label,
  setValue,
  value,
  step = 1,
  ...props
}) => {
  const increment = () => {
    let newValue = value + step;
    setValue(newValue);
  };
  const decrement = () => {
    let newValue = value - step;
    if (newValue >= 0) {
      setValue(newValue);
    }
  };

  return (
    <InputCountedOption
      increment={increment}
      decrement={decrement}
      label={label}
      value={value}
      {...props}>
        {children}
    </InputCountedOption>
  );
};
