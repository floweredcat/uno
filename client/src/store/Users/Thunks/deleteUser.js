import { loadUsers } from "./loadUsers";

export const loadDeleteUser = ({id}) => (dispatch) => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          id,
        }),
      };

      fetch("http://localhost:4000/deleteUser", options)
      .then((res) => res.text())
      .then(data => {
        dispatch(loadUsers({userId: localStorage.userId/1}))
      })
      .catch(err => console.log(err))
}