import { loadUsers } from "./loadUsers";

export const addUser = ({ userId, email, role, name, phone, pass }) => (dispatch) => {
  console.log(123)

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        user: `insert into peoples(pid,name,email,phone,pass,idaccess) values(${userId},'${name}','${email}','${phone}','${pass}',${role});`,
      }),
    };

    fetch("http://localhost:4000/addUser", options)
      .then((res) => res.text())
      .then((data) => dispatch(loadUsers({ userId: localStorage.userId/1 })))
      .catch((err) => console.log(err));
};
