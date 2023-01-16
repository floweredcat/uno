import { usersSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";

export const loadUsers = ({userId}) => (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      getCity: `select p.id,p.pid,p.name,p.phone,p.email,p.phone,p.pass,p.idaccess,decode(p.idaccess,1,'admin',2,'master franchises',3,'user')as rolename, (select list(c.name,', ') from franchisee f join tbcity c on f.idcity=c.id where f.idpeople=p.id)as franch, balance, bdel from peoples p where coalesce(p.bdel, false) = false and coalesce(pid,0) = decode((select idaccess from peoples where id=${userId}),1,coalesce(pid,0),2,(select id from peoples where id=${userId}))`,
    }),
  };

  dispatch(usersSliceActions.startLoading());

  const url = new URL("http://localhost:4000/getUsers");

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(usersSliceActions.successLoading(normolizeEntities(data)));
    })
    .catch((err) => {
      console.log(err);
      dispatch(usersSliceActions.failLoading());
    })
};
