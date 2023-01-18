import { authSliceActions } from "..";

export const setNewPassword = ({ pass, id, newPass }) =>
  (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        pass,
        newPass,
        id,
      }),
    };

    fetch("http://localhost:4000/setNewPassword", options)
      .then((res) => res.text())
      .then((data) => {
        if (data.length > 3) {
            dispatch(authSliceActions.successChangePass({mess:'Пароль изменен'}))
        }
        else {
            dispatch(authSliceActions.setErrorChangePass(data))
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
