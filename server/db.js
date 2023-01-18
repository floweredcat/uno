const firebird = require("node-firebird");

const options = {
  host: "localhost",
  port: 3050,
  database: "C:\\Development\\11312\\server\\DB.FDB",
  user: "SYSDBA",
  password: "masterkey",
  lowercase_keys: false,
  role: null,
  pageSize: 4096,
  pageSize: 4096,
  retryConnectionInterval: 1000,
  blobAsText: false,
};

export function db ({REQ_PARAM, res}) {
  firebird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
};
