import { useSelector } from "react-redux";
import { selectObjectPricePackages } from "../store/ObjectPrices/selectors";

export const useCalculateAmount = (form) => {
  const formData = Object.values(form);
  const objectPrices = useSelector((state) => selectObjectPricePackages(state));
  console.log(objectPrices);
  return (
    formData
      .filter((el) => el.ID)
      .reduce((acc, item) => {
        if (form.period < 12) {
          return acc + item.klv * objectPrices[item.ID].PRICE * form.period;
        } else {
          return (
            acc +
            item.klv * (objectPrices[item.ID].PRICE_YEAR / 12) * form.period
          );
        }
      }, 0) || 0
  );
};
