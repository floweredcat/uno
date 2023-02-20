import { useSelector } from "react-redux";
import { cityFranshisesSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";
import { selectCityFranshisesIds } from "../selectors";

export const getCityFransheses =
  ({ userId }) =>
  (dispatch, getState) => {
    if (selectCityFranshisesIds(getState())?.length > 0) {
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: userId,
      }),
    };
    dispatch(cityFranshisesSliceActions.startLoading());

    fetch("https://wsuno.xyz/api/getcityfran", options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        dispatch(
          cityFranshisesSliceActions.successLoading(
            normolizeEntities(data.result, 'NAME')
          )
        );
      })
      .catch((err) => {
        dispatch(cityFranshisesSliceActions.failLoading(err));
      });
  };
