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
        userId,
      }),
    };
    dispatch(objectsSliceActions.startLoading());

    const url = new URL("http://localhost:4000/getObjects");

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          objectsSliceActions.successLoading(normolizeEntities(data, "IDSRV"))
        );
      })
      .catch((err) => {
        dispatch(objectsSliceActions.failLoading(err));
      });
  };
