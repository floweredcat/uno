export const sendRecoverEmail = ({ email }) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
    }),
  };

  fetch("https://wsuno.xyz/api/", options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.OK) {
        throw Error("Пользователя не существует");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
