export const addUserIfValidate = ({userId, email, role, name, phone, city, pass}) => {
    
  const isDataValid = true;

  if (isDataValid) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        user: `insert into peoples(pid,name,email,pass,idaccess) values(${userId},'${name}','${email}','${pass}',${role});`,
      }),
    };

    fetch("http://localhost:4000/addUser", options)
      .then((res) => res.text())
      .catch((err) => console.log(err));
  }
};
