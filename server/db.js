const firebase = require("node-firebird");

const connection = firebase.pool(5, {
  host: "localhost",
  port: 4000,
  user: "SYSDBA",
  password: "masterkey",
  database: "DB.FDB",
});
