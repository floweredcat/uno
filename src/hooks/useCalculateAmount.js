import { useSelector } from "react-redux";
import { selectObjectPricePackages } from "../store/ObjectPrices/selectors";

export const useCalculateAmount = (form) => {
  const formData = Object.values(form);
  const objectPrices = useSelector((state) => selectObjectPricePackages(state));
  return (
    formData
      .filter((el) => el.ID)
      .reduce((acc, item) => {
        return acc + item.klv * objectPrices[item.ID].PRICE * form.period;
      }, 0) || 0
  );
};
