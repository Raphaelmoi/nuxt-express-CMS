// const express = require('express')
const glob = require("glob");

const { Router } = require("express");
const fs = require("fs");
// const path = require('path');

const router = Router();

router.post("/folderManager", (req, res) => {
  let folder_path;
  const client_path = req.body.filePath || "upload/";

  if (process.env.NODE_ENV === "development") {
    folder_path = process.cwd() + "/static/" + client_path;
  } else {
    folder_path = __dirname + "/../" + client_path;
  }

  var getDirectories = function(src, callback) {
    glob(src + "/**/*", callback);
  };
  let my_directories;
  getDirectories(folder_path, function(err2, res2) {
    if (err2) {
      // console.log('Error', err);
      my_directories = "Erreur";
      return res.status(500).send("Erreur");
    } else {
      // console.log(res);
      my_directories = res2;
      return res.status(200).send(my_directories);
    }
  });
});
router.post("/folderManager/create", (req, res) => {
  let folder_path = req.body.filePath || "upload/";
  if (process.env.NODE_ENV === "development") {
    folder_path = process.cwd() + "/static/" + folder_path;
  } else {
    folder_path = __dirname + "/../" + folder_path;
  }
  if (!fs.existsSync(folder_path)) {
    fs.mkdirSync(folder_path);
  }
  console.log("folderManager/create");
  return res.status(200).send("folderManager/create");
});
module.exports = router;
