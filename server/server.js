const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
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
  var REQ_PARAM = req.body.getCity;

  firefird.attach(options, (err, db) => {
    if (err) throw err;
    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/addUser", (req, res) => {
  var REQ_PARAM = req.body.user;

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send('User added')
      db.detach();
    });
  });
});

app.listen(4000, () => {
  console.log("Running on port 4000...");
});
