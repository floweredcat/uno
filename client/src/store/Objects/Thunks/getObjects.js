import { objectsSliceActions } from "..";
import { selectUserId } from "../../Auth/selectors";
import { normolizeEntities } from "../../helpers/normalizeEntites";
import { selectObjectsIds } from "../selectors";

export const getObjects = (dispatch, getState) => {
  const userId = selectUserId(getState());
  if (selectObjectsIds(getState())?.lenght > 0 ) {
    console.log('!!')
    return 
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      getObjects: `select g.* from (select o.id, o.idsrv, o.name, c.name as city, o.dt, o.org_owner, o.phone, p.name as fran_name, o.worker, (select i.name from tblicense l join tbitems i on l.iditem = i.id where l.idorg = o.id and lastrec = true) as paket, (select klv from tblicense l where l.idorg = o.id and lastrec = true) as klv, (select sum(i.klv) from tblicense l join tblicense_item i on l.id = i.pid where l.idorg = o.id and l.lastrec = true and i.iditem = 4 and current_date between l.dtstart and l.dtend) as mob, coalesce((select sum(i.klv) > 0   from tblicense l   join tblicense_item i on l.id = i.pid   where l.idorg = o.id and   l.lastrec = true and   i.iditem = 5 and   current_date between i.dtstart and i.dtend), false) as tarif, coalesce((select sum(i.klv) > 0      from tblicense l      join tblicense_item i on l.id = i.pid      where l.idorg = o.id and      l.lastrec = true and      i.iditem = 6 and      current_date between i.dtstart and i.dtend), false) as qr, (select min(dtstart) from tblicense where idorg = o.id and lastrec = true) as startdt, (select max(dtend) from tblicense where idorg = o.id and lastrec = true) as enddt, (select sum(amount) from tblicense where idorg = o.id and lastrec = true) as amount, o.tmpcode from tborgs o join franchisee f on o.idfran = f.id join tbcity c on f.idcity = c.id join peoples p on f.idpeople = p.id where coalesce(p.bdel, false) = false and decode((select idaccess from peoples where id = ${userId}), ${userId}, p.id, ${userId}) in (p.pid, p.id)) g;`,
    }),
  };
  dispatch(objectsSliceActions.startLoading())

  const url = new URL("http://localhost:4000/getObjects");

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(objectsSliceActions.successLoading(normolizeEntities(data, 'IDSRV')))
    })
    .catch((err) => {
      dispatch(objectsSliceActions.failLoading(err))
    });
};
