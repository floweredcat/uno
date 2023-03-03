import { InputCountedOption } from "../../UI/InputCountedOption/InputCountedOption";

export const InputCountedContainer = ({
  children,
  label,
  setValue,
  value,
  step = 1,
  required,
  ...props
}) => {
  const increment = () => {
    let newValue = value + step;
    setValue(newValue);
  };
  const decrement = () => {
    let newValue = value - step;
    if (newValue >= (required ? 1 : 0)) {
      setValue(newValue);
    }
  };

  return (
    <InputCountedOption
      increment={increment}
      decrement={decrement}
      label={label}
      value={value}
      required={required}
      {...props}
    >
      {children}
    </InputCountedOption>
  );
};
