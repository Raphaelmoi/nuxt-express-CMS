const { Router } = require("express");
const sharp = require("sharp");
// const mkdirp = require('mkdirp');
const pool = require("../connect");
const fs = require("fs");

const router = Router();

function removeAllButLast(string, token) {
  var parts = string.split(token);
  return parts.slice(0, -1).join("") + token + parts.slice(-1);
}

//upload  image and add it to db
router.post("/uploadImage", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("no files were uploaded. ");
  }
  const uploadTimestamp = new Date().getTime();
  const sampleFile = req.files.sampleFile;
  sampleFile.name = sampleFile.name
    .normalize("NFD")
    .replace(/[&\/\\#,+()$~%'":*?<>{}]/g, "")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
  sampleFile.name = removeAllButLast(sampleFile.name, ".");

  let static_path;
  let folder_path;

  const client_path = req.body.filePath || "upload/";
  if (process.env.NODE_ENV === "development") {
    // static_path = process.cwd() + '/static/' + client_path + uploadTimestamp + '/'
    folder_path = process.cwd() + "/static/" + client_path;
  } else {
    // static_path = __dirname + '/../' + client_path + uploadTimestamp + '/'
    folder_path = __dirname + "/../" + client_path;
  }
  static_path = folder_path + uploadTimestamp + "/";
  const dynamic_path = "/" + client_path + uploadTimestamp + "/";
  const uploadPath = static_path + sampleFile.name;

  if (!fs.existsSync(folder_path)) {
    fs.mkdirSync(folder_path);
  }
  // dossier timestamp
  if (!fs.existsSync(static_path)) {
    fs.mkdirSync(static_path);
  }

  sampleFile.mv(uploadPath, function(err) {
    if (err) return res.status(500).send(err);
    let theVignette = dynamic_path + sampleFile.name;

    let theimg = sharp(uploadPath)
      .metadata()
      .then(metadata => {
        if (metadata.format == "svg") {
          return metadata;
        }
        if (metadata.format == "tiff") {
          theimg.toFormat("jpeg").jpeg({
            mozjpeg: true,
            force: true // <----- add this parameter
          });
        }
        return metadata;
      })

      .then(data => {
        delete data.exif;
        delete data.xmp;
        delete data.icc;
        delete data.iptc;
        pool.getConnection((err, connection) => {
          if (err) throw err; //not connected
          connection.query(
            "INSERT INTO db_images SET ?",
            {
              vignette: theVignette,
              // images: images_string,
              // metadata: data,
              metadata: JSON.stringify(data),
              time: uploadTimestamp,
              name: sampleFile.name
            },
            function(err, result, fields) {
              connection.release();
              if (!err) {
                return res.status(200).send("" + result.insertId);
              } else {
                console.log(err);
                return res.status(200).send("" + -1);
              }
            }
          );
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("probleme");
      });
  });

  // )
});

module.exports = router;
