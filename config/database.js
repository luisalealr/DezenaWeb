var mysql = require("mysql");
var express = require("express");
var app = express();
require("dotenv").config();

async function run() {
  app.listen(3306, function () {
    console.log("Example app listening on port 3306!");
  });

  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  });
  connection.connect();
  connection.query(
    "SELECT * FROM PROFESORES",
    function (error, results, fields) {
      if (error) throw error;
      console.log("The solution is: ", results[0].nombre);
    }
  );
  connection.end();
}

run();
