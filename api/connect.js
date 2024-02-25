const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 30,
  host: "localhost",
  user: "root",
  password: "secret",
  database: "site_manager"
});

module.exports = pool;
