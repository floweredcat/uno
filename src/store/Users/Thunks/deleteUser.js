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

      fetch("https://wsuno.xyz/api/deleteUser", options)
      .then((res) => res.json())
      .then(data => {
        if (!data.OK) {
          throw Error('Ошибка запроса на сервер')
        }
        dispatch(loadUsers({userId: localStorage.userId/1}))
      })
      .catch(err => console.log(err))
}