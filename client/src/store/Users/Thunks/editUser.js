import { loadUsers } from "./loadUsersIfNotExist";

export const editUser = ({id, name, phone, email, userId}) => (dispatch) => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          editedUser: `update peoples set name='${name}', email='${email}', phone='${phone}', idaccess=${userId} where id=${id};`
        }),
      };

      fetch("http://localhost:4000/editUser", options)
      .then((res) => res.text())
      .then(data => {
        dispatch(loadUsers)
      })
      .catch(err => console.log(err))
}