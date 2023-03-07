export const handleChange = ({ newValue, namу }) => {
  setForm((prevState) => ({
    ...prevState,
    [name]: {
      ...prevState[name],
      klv: newValue,
    },
  }));
};
