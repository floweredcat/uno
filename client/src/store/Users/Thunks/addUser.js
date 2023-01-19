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
        pass,
        role,
      }),
    };

    fetch("http://localhost:4000/addUser", options)
      .then((res) => res.text())
      .then((data) => dispatch(loadUsers({ userId})))
      .catch((err) => console.log(err));
  };
