import { loadUsers } from "./loadUsers";

export const addUser =
  ({ userId, email, role, name, phone, pass }) =>
  (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        userId,
        name,
        email,
        phone,
        pas: pass,
        role,
      }),
    };

    fetch("http://wsuno.xyz:8111/addUser", options)
      .then((res) => res.text())
      .then((data) => {
        if (!data.OK) {
          throw Error('Ошибка запроса на сервер')
        }
        dispatch(loadUsers({userId}))
      })
      .catch((err) => console.log(err));
  };
