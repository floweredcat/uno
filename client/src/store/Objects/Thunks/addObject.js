import { objectsSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";

export const addObject =
  ({ userId, idFran, name, worker, phone, orgOwner }) =>
  (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ userId, idFran, name, worker, phone, orgOwner }),
    };

    const url = new URL("http://localhost:4000/addObject");

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
