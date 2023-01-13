import { authSliceActions } from "..";

export const authUserIfUserExist = (userData) => (dispatch) => {
  const { email, password } = userData;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      getAuth: `select id,name,idaccess,balance from peoples where upper(email)=upper('${email}')and pass = hash(cast('${password}' as varchar(50)));`,
    }),
  };
  dispatch(authSliceActions.startLoadingUser());

  fetch("http://localhost:4000/authUser", options)
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        dispatch(authSliceActions.errorLoading({err: 'Пользователя не существует'}))
      } else {
        dispatch(authSliceActions.login(data[0]));
      }
    })
    .catch((err) => {
      dispatch(authSliceActions.errorLoading({err}))
    });
};
