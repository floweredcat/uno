import { getObjects } from "./getObjects";

export const addObject =
  ({ userId, idFran, name, worker, phone, orgOwner, dt }) =>
  (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        userId,
        idFran,
        name,
        worker,
        phone,
        orgOwner,
        dt,
      }),
    };

    const url = new URL("https://wsuno.xyz/api/addObject");
    console.log(options.body);

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.OK) {
          throw Error(data.error);
        }
        dispatch(getObjects({ userId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
