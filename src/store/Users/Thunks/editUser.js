import { loadUsers } from "./loadUsers";

export const editUser =
  ({ id, name, phone, email, idAccess }) =>
  (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id,
        name,
        phone,
        email,
        idAccess,
      }),
    };

    fetch("https://wsuno.xyz/api/editUser", options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error("Ошибка запроса на сервер");
        }
        dispatch(loadUsers({ userId: localStorage.userId / 1 }));
      })
      .catch((err) => console.log(err));
  };
