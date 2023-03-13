import { normolizeEntities } from "../../helpers/normalizeEntites";
import { objectHistorySliceActions } from "..";
import { selectObjectHistory } from "../selectors";

export const getHistoryObjectIfNotExist =
  ({ id }) =>
  (dispatch, getState) => {
    if (selectObjectHistory(getState())[id]) {
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id,
      }),
    };
    dispatch(objectHistorySliceActions.startLoading());

    const url = new URL("https://wsuno.xyz/api/gethistoryorg");

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        const { entities, ids } = normolizeEntities(data.result, "IDPEOPLE");
        dispatch(
          objectHistorySliceActions.successLoading({ entities, ids, id })
        );
      })
      .catch((err) => {
        dispatch(objectHistorySliceActions.failLoading(err));
      });
  };
