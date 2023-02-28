import { normolizeEntities } from "../../helpers/normalizeEntites";
import { objectPricesSliceActions } from "..";

export const getPackagePrices = (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  dispatch(objectPricesSliceActions.startLoading());

  const url = new URL("https://wsuno.xyz/api/getObjectsPrices");

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.OK) {
        throw Error(data.error);
      }
      dispatch(
        objectPricesSliceActions.successLoading(
          normolizeEntities(data.result, "NAME")
        )
      );
    })
    .catch((err) => {
      dispatch(objectPricesSliceActions.failLoading(err));
    });
};
