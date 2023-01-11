import { usersSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";
import { selectUsersIds } from "../selectors";

export const loadUsersIfNotExist = (dispatch, getState) => {
  // if (selectUsersIds(getState())?.length > 0) {
  //     return;
  //   }

  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      getCity: "SELECT * FROM tbcity;",
    }),
  };

  // dispatch(usersSliceActions.startLoading());

  const url = new URL("http://localhost:4000/getUsers");

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
      // dispatch(usersSliceActions.failLoading());
        })
};
