import { authSliceActions } from "..";

export const setNewPassword =
  ({ pass, id, newPass }) =>
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
        data ? dispatch(authSliceActions.successChangePass('Пароль изменен успешно')) : authSliceActions.setErrorChangePass('Неверный текущий пароль!')
      })
      .catch((err) => {
        dispatch(
          authSliceActions.setErrorChangePass("Ошибка запроса на сервер")
        );
      });
  };
