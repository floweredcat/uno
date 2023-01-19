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

    fetch("http://localhost:4000/editUser", options)
      .then((res) => res.text())
      .then((data) => {
        dispatch(loadUsers({ userId: localStorage.userId / 1 }));
      })
      .catch((err) => console.log(err));
  };
