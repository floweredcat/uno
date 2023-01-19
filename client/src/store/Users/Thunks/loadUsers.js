import { usersSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";

export const loadUsers = ({userId}) => (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      userId,
    }),
  };

  dispatch(usersSliceActions.startLoading());

  const url = new URL("http://localhost:4000/getUsers");

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(usersSliceActions.successLoading(normolizeEntities(data)));
    })
    .catch((err) => {
      console.log(err);
      dispatch(usersSliceActions.failLoading());
    })
};
