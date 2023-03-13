import { isEmpty, isEmail, isMobilePhone } from "validator";

const handleValidate = (form, setValidate) => {
  const { email, name, phone, pass } = form;
  if (isEmpty(email) || isEmpty(phone) || isEmpty(pass) || isEmpty(name)) {
    setValidate({
      isValid: false,
      errorMessage: "Пожалуйста, заполните все поля",
    });
  } else if (!isEmail(email)) {
    setValidate({
      isValid: false,
      errorMessage: "Неверный формат почты",
    });
  } else if (!isMobilePhone(phone) || phone.length < 10 || phone.length > 14) {
    setValidate({
      isValid: false,
      errorMessage: "Неверный номер телефона",
    });
  } else setValidate({ isValid: true, errorMessage: "   " });
};

export const onSubmit = (event, setValidate, form) => {
  event.preventDefault();
  handleValidate(form, setValidate);
};
