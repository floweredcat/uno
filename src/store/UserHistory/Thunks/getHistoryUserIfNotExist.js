import { normolizeEntities } from "../../helpers/normalizeEntites";
import { userHistorySliceActions } from "..";
import { selectUserHistory } from "../selectors";

export const getHistoryUserIfNotExist =
  ({ id }) =>
  (dispatch, getState) => {
    if (selectUserHistory(getState())[id]) {
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
    dispatch(userHistorySliceActions.startLoading());

    const url = new URL("https://wsuno.xyz/api/gethistoryusr");

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        const { entities } = normolizeEntities(data.result, "IDORG");
        dispatch(userHistorySliceActions.successLoading({ entities, id }));
      })
      .catch((err) => {
        dispatch(userHistorySliceActions.failLoading(err));
      });
  };
