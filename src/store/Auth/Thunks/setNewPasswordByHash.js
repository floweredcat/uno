export const setNewPassword =
  ({ hash }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        hash,
        newpass: newPass,
      }),
    };

    fetch("https://wsuno.xyz/api/setNewPassword", options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error('Неверный текущий пароль')
        }
        dispatch(authSliceActions.successChangePass('Пароль изменен успешно'))
      })
      .catch((err) => {
        console.log(err)
      });
  };