export const editLicence = ({ params }) => {
  const { id, items } = params;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id,
      items,
    }),
  };
  console.log(options.body);

  const url = new URL("https://wsuno.xyz/api/editlicense");

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
