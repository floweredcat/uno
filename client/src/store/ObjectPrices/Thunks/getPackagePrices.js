import { objectsSliceActions } from "../../Objects";
import { normolizeEntities } from "../../helpers/normalizeEntites";
import { objectPricesSliceActions } from "..";

export const getPackagePrices = (dispatch) => {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    }
  };
  dispatch(objectPricesSliceActions.startLoading())

  const url = new URL("http://localhost:4000/getObjectsPrices");

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(objectPricesSliceActions.successLoading(normolizeEntities(data, 'NAME')))
    })
    .catch((err) => {
      dispatch(objectPricesSliceActions.failLoading(err))
    });
};