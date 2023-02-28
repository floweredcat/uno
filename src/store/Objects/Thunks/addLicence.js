export const addLicence = ({ params }) => {
  const { idorg, iditem, klv, dtstart, dtend, price, amount, items } = params;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      idorg,
      iditem,
      klv,
      dtstart,
      dtend,
      price,
      amount,
      items,
    }),
  };
  console.log(options.body);

  const url = new URL("https://wsuno.xyz/api/addlicense");

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data.OK) {
        throw Error(data.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
