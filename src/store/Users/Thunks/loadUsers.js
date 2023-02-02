import { usersSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";

export const loadUsers =
  ({ userId }) =>
  (dispatch) => {
    console.log("UserId: " + userId)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: userId,
      }),
    };

    dispatch(usersSliceActions.startLoading());

    const url = new URL("https://wsuno.xyz/api/getUsers");

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from server: ", data)
        if (data.OK) {
          dispatch(
            usersSliceActions.successLoading(normolizeEntities(data.result))
          );
        }
        else throw Error(data.error)
      })
      .catch((err) => {
        console.log(err)
        dispatch(usersSliceActions.failLoading(err));
      });
  };
