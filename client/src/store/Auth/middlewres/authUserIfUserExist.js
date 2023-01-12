import { authSliceActions } from "..";

export const authUserIfUserExist = (userData) => (dispatch) => {
    const {email, password} = userData;
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          getAuth: `select id,name,idaccess,balance from peoples where upper(email)=upper('${email}')and pass = hash(cast('${password}' as varchar(50)));`,
        }),
      };

    fetch('http://localhost:4000/authUser', options)
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            console.log('handleErrorMessage')
        }
        else {
            dispatch(authSliceActions.login(data[0]))
        }
    })
    .catch(err => {
        console.log(err)
    })
}