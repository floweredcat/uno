import { objectsSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";

export const getObjects =
  ({ userId }) =>
  (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: userId,
      }),
    };
    dispatch(objectsSliceActions.startLoading());

    const url = new URL("http://wsuno.xyz:8111/getObjects");

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error)
        }
        dispatch(
          objectsSliceActions.successLoading(normolizeEntities(data.result, "IDSRV"))
        );
      })
      .catch((err) => {
        dispatch(objectsSliceActions.failLoading(err));
      });
  };
