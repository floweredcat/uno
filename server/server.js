const express = require("express");
const cors = require("cors");
const firefird = require("node-firebird");

const app = express();

let options = {};

options.host = "localhost";
options.port = 3050;
options.database = "C:\\Development\\11312\\server\\DB.FDB";
options.user = "SYSDBA";
options.password = "masterkey";
options.lowercase_keys = false;
options.role = null;
options.pageSize = 4096;
options.pageSize = 4096;
options.retryConnectionInterval = 1000;
options.blobAsText = false;

app.use(cors());

app.use(express.json());

app.post("/getUsers", (req, res) => {
  const { userId } = req.body;
  var REQ_PARAM = `select p.id,p.pid,p.name,p.phone,p.email,p.phone,p.pass,p.idaccess,decode(p.idaccess,1,'admin',2,'master franchises',3,'user')as rolename, (select list(c.name,', ') from franchisee f join tbcity c on f.idcity=c.id where f.idpeople=p.id)as franch, balance, bdel from peoples p where coalesce(p.bdel, false) = false and coalesce(pid,0) = decode((select idaccess from peoples where id=${userId}),1,coalesce(pid,0),2,(select id from peoples where id=${userId}))`;

  firefird.attach(options, (err, db) => {
    if (err) {
      res.send(err);
    }
    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/addUser", (req, res) => {
  const { name, role, phone, email, pass, userId } = req.body;
  const REQ_PARAM = `insert into peoples(pid,name,email,phone,pass,idaccess) values(${userId},'${name}','${email}','${phone}','${pass}',${role});`;

  firefird.attach(options, (err, db) => {
    if (err) {
      res.send(err);
    }

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send("User added");
      db.detach();
    });
  });
});

app.post("/authUser", (req, res) => {
  const { email, password } = req.body;
  const REQ_PARAM = `select id,name,idaccess,balance from peoples where upper(email)=upper('${email}')and pass = hash(cast('${password}' as varchar(50)));`;

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/deleteUser", (req, res) => {
  const { id } = req.body;
  const REQ_PARAMS = {
    deleteUser: `delete from peoples where id = ${id};`,
    hideUser: `update peoples set bdel = true where id = ${id}`,
  };

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAMS.deleteUser, (err, result) => {
      if (err) {
        db.query(REQ_PARAMS.hideUser, (err, result) => {
          if (err) throw err;

          res.send(result);
        });
        db.detach();
      } else res.send(result);
      db.detach();
    });
  });
});

app.post("/editUser", (req, res) => {
  const { id, name, phone, email, idAccess } = req.body;
  const REQ_PARAM = `update peoples set name='${name}', email='${email}', phone='${phone}', idaccess=${idAccess} where id=${id};`;

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/getObjects", (req, res) => {
  const { userId } = req.body;
  const REQ_PARAM = `select g.* from (select o.id, o.idsrv, o.name, c.name as city, o.dt, o.org_owner, o.phone, p.name as fran_name, o.worker, (select i.name from tblicense l join tbitems i on l.iditem = i.id where l.idorg = o.id and lastrec = true) as paket, (select klv from tblicense l where l.idorg = o.id and lastrec = true) as klv, (select sum(i.klv) from tblicense l join tblicense_item i on l.id = i.pid where l.idorg = o.id and l.lastrec = true and i.iditem = 4 and current_date between l.dtstart and l.dtend) as mob, coalesce((select sum(i.klv) > 0   from tblicense l   join tblicense_item i on l.id = i.pid   where l.idorg = o.id and   l.lastrec = true and   i.iditem = 5 and   current_date between i.dtstart and i.dtend), false) as tarif, coalesce((select sum(i.klv) > 0      from tblicense l      join tblicense_item i on l.id = i.pid      where l.idorg = o.id and      l.lastrec = true and      i.iditem = 6 and      current_date between i.dtstart and i.dtend), false) as qr, (select min(dtstart) from tblicense where idorg = o.id and lastrec = true) as startdt, (select max(dtend) from tblicense where idorg = o.id and lastrec = true) as enddt, (select sum(amount) from tblicense where idorg = o.id and lastrec = true) as amount, o.tmpcode from tborgs o join franchisee f on o.idfran = f.id join tbcity c on f.idcity = c.id join peoples p on f.idpeople = p.id where coalesce(p.bdel, false) = false and decode((select idaccess from peoples where id = ${userId}), ${userId}, p.id, ${userId}) in (p.pid, p.id)) g;`;

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/getObjectsPrices", (_, res) => {
  const REQ_PARAM = "select id,name,price,price_year from tbitems order by id;";

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/setNewPassword", (req, res) => {
  const { pass, newPass, id } = req.body;
  const REQ_PARAM = {
    changePass: `update peoples set pass = hash('${newPass}') where id = ${id};`,
    checkOldPassIsCorrect: `select count(*) as cnt from peoples where id = ${id} and pass = hash('${pass}');`,
  };

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM.checkOldPassIsCorrect, (err, result) => {
      if (err) throw err;

      if (result[0].CNT == 1) {
        db.query(REQ_PARAM.changePass, (err, result) => {
          if (err) throw err;
          res.send("true");
          db.detach();
        });
        db.detach();
      } else {
        res.send();
      }
    });
  });
});

app.listen(4000, () => {
  console.log("Running on port 4000...");
});
