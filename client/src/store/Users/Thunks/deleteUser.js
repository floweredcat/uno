import { loadUsers } from "./loadUsers";

export const loadDeleteUser = ({id}) => (dispatch) => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          deleteUser: `delete from peoples where id = ${id};`,
          hideUser: `update peoples set bdel = true where id = ${id}`,
        }),
      };

      fetch("http://localhost:4000/deleteUser", options)
      .then((res) => res.text())
      .then(data => {
        dispatch(loadUsers({userId: localStorage.userId}))
      })
      .catch(err => console.log(err))
}