const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const pool = require("./connect");
const uploadImage = require("./routes/uploadImage");
const folderManager = require("./routes/folderManager");

const app = express();
// const port = process.env.PORT || 5000;

// default option
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(uploadImage);
app.use(folderManager);

app.post("/set", (req, res) => {
  console.log("set");
  console.log(req.body);
  console.log(req.body.to_set);
  const data = req.body;
  // data.to_set = JSON.parse(data.to_set)
  // return res.status(200).send('update method ')

  pool.getConnection((err, connection) => {
    // if (err) throw err; //not connected
    if (err) {
      console.error("SQL NON CONNECTE");
      console.error(err);
      return;
    }
    let querystring = `INSERT INTO ${data.table} SET  ? `;
    console.log(querystring);
    // console.log(queryVals);
    // connection.query(querystring, queryVals, (err, rows) => {
    //     connection.release()
    //     if (!err) {
    //         console.log('image is update on DB');
    //         // res.redirect('/')
    //         return res.status(200).send('files were update. ')

    //     } else console.log(err);
    // })
    // console.log(JSON.parse(data.to_set));

    connection.query(querystring, JSON.parse(data.to_set), function(
      err,
      result,
      fields
    ) {
      console.log(err);
      connection.release();
      if (!err) {
        return res.status(200).send(result);
        // return res.status(200).send('' + result.insertId)
      } else return err;
    });
  });
});

app.post("/update", (req, res) => {
  console.log("update");
  console.log(req.body);
  console.log(req.body.to_update);
  const data = req.body;
  data.to_update = JSON.parse(data.to_update);
  // return res.status(200).send('update method ')

  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected

    let queryChamps = "";
    let queryVals = [];
    for (const key in data.to_update) {
      if (Object.hasOwnProperty.call(data.to_update, key)) {
        if (queryChamps !== "") queryChamps += ", ";
        const element = data.to_update[key];
        queryChamps += key + " = ? ";
        queryVals.push(element);
      }
    }

    let querystring = `UPDATE ${data.table} SET ${queryChamps} WHERE id = ${data.id}`;
    // console.log(querystring);
    // console.log(queryVals);
    connection.query(querystring, queryVals, (err, rows) => {
      connection.release();
      if (!err) {
        console.log("image is update on DB");
        // res.redirect('/')
        return res.status(200).send("files were update. ");
      } else console.log(err);
    });
  });
});

app.post("/delete", (req, res) => {
  // console.log('delete');
  // console.log(req.body);
  const data = req.body;
  // return res.status(200).send('update method ')

  if (data.table === "db_images") {
    console.log("ok");
    let static_path;
    if (process.env.NODE_ENV === "development") {
      static_path = process.cwd() + "/static/upload/" + data.time + "/";
    } else {
      static_path = __dirname + "/../upload/" + data.time + "/";
    }
    console.log(static_path);
    fs.rmdirSync(static_path, { recursive: true });
  }

  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected

    let querystring = `DELETE from ${data.table} WHERE id = ${data.id}`;
    console.log(querystring);
    // console.log(queryVals);
    connection.query(querystring, (err, rows) => {
      connection.release();
      if (!err) {
        console.log("image is deleted from on DB");
        // res.redirect('/')
        return res.status(200).send("files were deleted. ");
      } else console.log(err);
    });
  });
});
// let data = {
//   table: "db_articles",
//   currentpage: this.currentpage,
//   items_by_page: this.items_by_page,
//   reverse: this.date_filter
//   // where: "id='1' AND titre = 't'"
// };
// this.$axios.post("/api/get", data).then((res) => {console.log(res);})
app.post("/get", (req, res) => {
  if (!req.body || req.body == {}) {
    return res.status(400).send("no body");
  }

  const select_db = req.body.select || "*";
  let where_db = "";
  if (req.body.where) where_db = " WHERE " + req.body.where;
  pool.getConnection((err, connection) => {
    let val = {};
    if (err) {
      //  throw err;
      console.error(err);
      console.error("sql non connecté");
      return;
    } //not connected
    // if (!req.body.where) {
    //   return res.status(400).send("no where");
    // }

    // recup la quantite total d'elements
    connection.query(
      `SELECT COUNT (*) AS nbrItems  FROM ${req.body.table} ${where_db}`,
      (err, rows) => {
        connection.release();
        if (!err) {
          val.nbrItems = rows[0].nbrItems;
          const paginationSize = req.body.items_by_page || val.nbrItems;
          const currentPage = req.body.currentpage * paginationSize || 0;
          let querystring =
            "SELECT " + select_db + " FROM " + req.body.table + where_db;
          // par default on veux le + recent en page 1
          if (req.body.reverse && req.body.reverse === "false") {
            querystring += " ORDER BY id DESC";
          }
          querystring += "  LIMIT ? OFFSET ?";

          pool.getConnection((err, connection) => {
            connection.query(
              querystring,
              [+paginationSize, +currentPage],
              (err, rows) => {
                connection.release();
                if (!err) {
                  val.result = rows;
                  return res.status(200).send(val);
                }
              }
            );
          });
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.post("/updateImg", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected

    connection.query(
      'UPDATE db_images SET vignette = ? , images = ?,  WHERE id = "1"',
      [theVignette, images_string],
      (err, rows) => {
        connection.release();
        if (!err) {
          console.log("image is update on DB");
          // res.redirect('/')
          return res.status(200).send("files were update. ");
        } else console.log(err);
      }
    );
  });
});

// app.listen(port, () => console.log(`listening on port ${port}`))

export default {
  path: "/api",
  handler: app
};
